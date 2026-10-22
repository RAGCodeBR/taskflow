"""Install owner-only Mac services without copying data or secrets. No root privileges."""
from pathlib import Path
import json, os, plistlib, shutil, subprocess, sys

source = Path(__file__).resolve().parents[2]
wa = Path(sys.argv[1]).resolve()
install = Path.home() / "Library/Application Support/Taskfloww Chat"
agents = Path.home() / "Library/LaunchAgents"
if not (wa / ".local/active-build").is_file():
    raise SystemExit("Verified local chat installation required")
install.mkdir(parents=True, exist_ok=True)
install.chmod(0o700)
(install / "logs").mkdir(exist_ok=True)
agents.mkdir(parents=True, exist_ok=True)
config = {
    "waRoot": str(wa), "taskflowRoot": str(source), "installRoot": str(install),
    "node": "/usr/local/bin/node", "pgBin": str(Path.home() / ".homebrew/opt/postgresql@16/bin"),
    "path": "/usr/local/bin:" + str(Path.home() / ".homebrew/bin") + ":/usr/bin:/bin:/usr/sbin:/sbin",
    "origin": "https://www.taskfloww.com.br", "publicOrigin": "https://chat.taskfloww.com.br", "gatewayPort": 3041,
}
config_path = install / "runtime.json"
config_path.write_text(json.dumps(config, indent=2) + "\n")
config_path.chmod(0o600)
shutil.copy2(source / "hosting/mac/supervise.py", install / "supervise.py")
shutil.copy2(source / "src/styles/whatsapp-embed.css", install / "whatsapp-embed.css")
shutil.copy2(source / "src/styles/whatsapp-embed.js", install / "whatsapp-embed.js")
build_script = """
const path = require('node:path');
const esbuild = require(path.join(process.argv[1], 'node_modules/esbuild'));
esbuild.buildSync({entryPoints:[process.argv[2]],outfile:process.argv[3],bundle:true,platform:'node',format:'esm',target:'node24'});
"""
subprocess.run([config["node"], "-e", build_script, str(wa), str(source / "hosting/mac/gateway.mts"), str(install / "gateway.mjs")], check=True)

def register(role, arguments):
    label = "com.taskfloww.chat." + role
    plist_path = agents / (label + ".plist")
    if plist_path.exists():
        raise SystemExit("Already installed: " + label + "; inspect before replacing")
    plist = {
        "Label": label, "ProgramArguments": arguments,
        "WorkingDirectory": str(install), "RunAtLoad": True, "KeepAlive": True, "ThrottleInterval": 15,
        "ProcessType": "Background", "Umask": 0o077,
        "StandardOutPath": str(install / "logs" / (role + ".log")),
        "StandardErrorPath": str(install / "logs" / (role + "-error.log")),
        "EnvironmentVariables": {"PATH": config["path"], "PYTHONUNBUFFERED": "1"},
    }
    with plist_path.open("wb") as handle:
        plistlib.dump(plist, handle)
    plist_path.chmod(0o600)
    subprocess.run(["/bin/launchctl", "bootstrap", "gui/" + str(os.getuid()), str(plist_path)], check=True)
    print("Registered " + label)

for role in ("database", "app", "gateway"):
    register(role, [str(Path.home() / ".homebrew/bin/python3"), str(install / "supervise.py"), role, str(config_path)])
register("awake", ["/usr/bin/caffeinate", "-i"])
print("Private services registered. No WhatsApp account was logged out, copied, or sent a test message.")
