"""Register the previously authorized Cloudflare connector; never print its token."""
from pathlib import Path
import json, os, plistlib, subprocess

install = Path.home() / "Library/Application Support/Taskfloww Chat"
config = json.loads((install / "runtime.json").read_text())
token = install / "cloudflared-token"
binary = Path.home() / ".homebrew/bin/cloudflared"
if config["publicOrigin"] != "https://chat.taskfloww.com.br" or config["gatewayPort"] != 3041:
    raise SystemExit("Unexpected private gateway configuration")
if not token.is_file() or token.stat().st_mode & 0o077 or not binary.is_file():
    raise SystemExit("A private connector token and official cloudflared installation are required")
label = "com.taskfloww.chat.tunnel"
target = Path.home() / "Library/LaunchAgents" / (label + ".plist")
if target.exists():
    raise SystemExit("Connector already registered; inspect before replacing")
plist = {
    "Label": label,
    "ProgramArguments": [str(binary), "tunnel", "--no-autoupdate", "run", "--token-file", str(token)],
    "WorkingDirectory": str(install), "RunAtLoad": True, "KeepAlive": True,
    "ThrottleInterval": 15, "ProcessType": "Background", "Umask": 0o077,
    "StandardOutPath": str(install / "logs/tunnel.log"),
    "StandardErrorPath": str(install / "logs/tunnel-error.log"),
    "EnvironmentVariables": {"PATH": config["path"]},
}
with target.open("wb") as handle:
    plistlib.dump(plist, handle)
target.chmod(0o600)
subprocess.run(["/bin/launchctl", "bootstrap", "gui/" + str(os.getuid()), str(target)], check=True)
print("Private Cloudflare connector registered. Token was not displayed.")
