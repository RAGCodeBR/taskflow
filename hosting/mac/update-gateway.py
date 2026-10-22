"""Update the installed private chat gateway after reviewing the Taskfloww checkout.

Run without arguments to inspect. Pass --apply to replace its presentation files
and restart only the gateway; the WhatsApp app and database remain running.
"""

from pathlib import Path
import json
import os
import shutil
import signal
import subprocess
import sys
import tempfile
import time
import urllib.request


source = Path(__file__).resolve().parents[2]
install = Path.home() / "Library/Application Support/Taskfloww Chat"
config_path = install / "runtime.json"
config = json.loads(config_path.read_text())
if Path(config["installRoot"]).resolve() != install.resolve():
    raise SystemExit("Unexpected gateway installation path. No files were changed.")
runtime_checkout = Path(config["taskflowRoot"]).resolve()
if not (runtime_checkout / ".env.local").is_file():
    raise SystemExit("The installed chat configuration is missing. No files were changed.")
def origin(checkout: Path) -> str:
    remote = subprocess.run(
        ["git", "-C", str(checkout), "remote", "get-url", "origin"],
        capture_output=True, text=True, check=True,
    ).stdout.strip().removesuffix(".git")
    return remote
if origin(source) != "https://github.com/RAGCodeBR/taskflow" or origin(runtime_checkout) != origin(source):
    raise SystemExit("The source and installed configuration are from different repositories.")
if config["origin"] != "https://www.taskfloww.com.br" or config["publicOrigin"] != "https://chat.taskfloww.com.br" or config["gatewayPort"] != 3041:
    raise SystemExit("Unexpected gateway configuration. No files were changed.")
if not (Path.home() / "Library/LaunchAgents/com.taskfloww.chat.gateway.plist").is_file():
    raise SystemExit("The gateway supervisor is not installed. No files were changed.")

print("Source:", source)
print("Installed gateway:", install)
print("Configuration checkout (kept unchanged):", runtime_checkout)
print("Files: gateway.mjs, whatsapp-embed.css, whatsapp-embed.js")
if sys.argv[1:] != ["--apply"]:
    print("Inspection only. Run this script with --apply to install and restart the gateway.")
    raise SystemExit(0 if not sys.argv[1:] else 2)

result = subprocess.run(
    ["/usr/sbin/lsof", "-nP", "-iTCP:3041", "-sTCP:LISTEN", "-t"],
    capture_output=True, text=True, check=True,
)
pids = set(result.stdout.split())
if len(pids) != 1:
    raise SystemExit("Expected exactly one running gateway. No files were changed.")
pid = int(next(iter(pids)))
cwd = subprocess.run(
    ["/usr/sbin/lsof", "-a", "-p", str(pid), "-d", "cwd", "-Fn"],
    capture_output=True, text=True, check=True,
)
if f"n{install}\n" not in cwd.stdout:
    raise SystemExit("Port 3041 belongs to another process. No files were changed.")

wa = Path(config["waRoot"])
if not (wa / "node_modules/esbuild").is_dir():
    raise SystemExit("The chat installation lacks esbuild. No files were changed.")
build_script = """
const path = require('node:path');
const esbuild = require(path.join(process.argv[1], 'node_modules/esbuild'));
esbuild.buildSync({entryPoints:[process.argv[2]],outfile:process.argv[3],bundle:true,platform:'node',format:'esm',target:'node24'});
"""
with tempfile.TemporaryDirectory(dir=install) as staging:
    stage = Path(staging)
    subprocess.run(
        [config["node"], "-e", build_script, str(wa), str(source / "hosting/mac/gateway.mts"), str(stage / "gateway.mjs")],
        check=True,
    )
    shutil.copy2(source / "src/styles/whatsapp-embed.css", stage / "whatsapp-embed.css")
    shutil.copy2(source / "src/styles/whatsapp-embed.js", stage / "whatsapp-embed.js")
    for name in ("gateway.mjs", "whatsapp-embed.css", "whatsapp-embed.js"):
        target = install / name
        if target.exists():
            shutil.copy2(target, install / (name + ".previous"))
        os.chmod(stage / name, 0o600)
        os.replace(stage / name, target)

# The supervisor detects this gateway exit and starts the updated build.
# The upstream WhatsApp process and PostgreSQL are not touched.
os.kill(pid, signal.SIGTERM)
for _ in range(30):
    time.sleep(1)
    try:
        with urllib.request.urlopen("http://127.0.0.1:3041/healthz", timeout=2) as response:
            if response.status == 200:
                print("Updated gateway is healthy.")
                break
    except Exception:
        pass
else:
    raise SystemExit("Gateway did not recover within 30 seconds. Previous files are kept as *.previous.")
