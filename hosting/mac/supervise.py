"""LaunchAgent helper: adopt the existing local process, or start exactly one replacement.

Never terminate an adopted process. Manual stop/logout of a WhatsApp account remains
the responsibility of WA-AKG; the supervisor never edits sessions or auth credentials.
"""
from pathlib import Path
import fcntl, json, os, signal, socket, subprocess, sys, time


def listener_pid(port):
    result = subprocess.run(["/usr/sbin/lsof", "-nP", "-iTCP:" + str(port), "-sTCP:LISTEN", "-t"], capture_output=True, text=True)
    ids = set(result.stdout.split())
    if len(ids) > 1:
        raise RuntimeError("Multiple processes listen on a managed port")
    return int(next(iter(ids))) if ids else None


def process_cwd(pid):
    result = subprocess.run(["/usr/sbin/lsof", "-a", "-p", str(pid), "-d", "cwd", "-Fn"], capture_output=True, text=True)
    return next((line[1:] for line in result.stdout.splitlines() if line.startswith("n")), None)


def alive(pid):
    try:
        os.kill(pid, 0)
        return True
    except ProcessLookupError:
        return False


def main():
    role, config_path = sys.argv[1:]
    config = json.loads(Path(config_path).read_text())
    install = Path(config["installRoot"])
    wa = Path(config["waRoot"])
    pgdata = wa / ".local/postgres"
    lock = (install / (role + ".lock")).open("w")
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        return
    pg = Path(config["pgBin"])
    child = None
    stopping = False

    def stop(_number, _frame):
        nonlocal stopping
        stopping = True
        if child and child.poll() is None:
            if role == "database":
                child.send_signal(signal.SIGINT)  # PostgreSQL fast, transactional shutdown.
            else:
                child.send_signal(signal.SIGTERM)

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    if role in ("database", "app", "gateway"):
        port = {"database": 55439, "app": 3039, "gateway": config["gatewayPort"]}[role]
        pid = listener_pid(port)
        if pid:
            if role == "database":
                pidfile = (pgdata / "postmaster.pid").read_text().splitlines()
                if int(pidfile[0]) != pid or Path(pidfile[1]).resolve() != pgdata.resolve():
                    raise RuntimeError("Port belongs to a different database")
            elif process_cwd(pid) != str(install if role == "gateway" else wa):
                raise RuntimeError("Port belongs to a different application")
            print(role + ": supervising the existing process without restarting it", flush=True)
            while not stopping and alive(pid):
                time.sleep(3)
            if stopping:
                return
    env = dict(os.environ, PATH=config["path"])
    if role == "database":
        command = [str(pg / "postgres"), "-D", str(pgdata)]
        cwd = str(wa)
    elif role == "app":
        while not stopping:
            ready = subprocess.run([str(pg / "pg_isready"), "-h", "127.0.0.1", "-p", "55439", "-d", "wa_akg"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            if ready.returncode == 0:
                break
            time.sleep(3)
        if stopping:
            return
        # A second process may have been started manually while waiting for PostgreSQL.
        if listener_pid(3039):
            raise RuntimeError("Application port was occupied during startup; refusing a duplicate")
        build = (wa / ".local/active-build").read_text().strip()
        resolved = (wa / build).resolve()
        if not resolved.is_relative_to(wa / ".local/builds") or not (resolved / "BUILD_ID").is_file():
            raise RuntimeError("The verified production build was not found")
        env.update(NODE_ENV="production", WA_NEXT_DIST=build, PORT="3039", HOSTNAME="127.0.0.1")
        command = [config["node"], "--import", "tsx", "src/server/index.ts"]
        cwd = str(wa)
    elif role == "gateway":
        command = [config["node"], str(install / "gateway.mjs"), config_path]
        cwd = str(install)
    else:
        raise RuntimeError("Unsupported managed service")
    if stopping:
        return
    print(role + ": starting the local service", flush=True)
    child = subprocess.Popen(command, cwd=cwd, env=env)
    code = child.wait()
    if code and not stopping:
        raise SystemExit(code)


if __name__ == "__main__":
    main()
