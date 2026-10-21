"""Build an allowlisted, secret-free upload directory from the local customized source."""
from pathlib import Path
import shutil, json, sys

wa = Path(sys.argv[1]).resolve()
target = Path(sys.argv[2]).resolve()
taskflow = Path(__file__).resolve().parents[2]
if target.exists():
    raise SystemExit("Refusing to overwrite an existing staging directory.")
target.mkdir(parents=True)
for name in ("package.json", "package-lock.json", "next.config.ts", "postcss.config.mjs", "next-env.d.ts"):
    source = wa / name
    if source.exists():
        shutil.copy2(source, target / name)
shutil.copytree(wa / "src", target / "src", ignore=shutil.ignore_patterns("__tests__", "*.test.*"))
shutil.copytree(wa / "prisma", target / "prisma")
if (wa / "docs/API_DOCUMENTATION.md").exists():
    (target / "docs").mkdir()
    shutil.copy2(wa / "docs/API_DOCUMENTATION.md", target / "docs")
(target / "public").mkdir()
for source in (wa / "public").glob("*.svg"):
    shutil.copy2(source, target / "public" / source.name)
config = json.loads((wa / "tsconfig.json").read_text())
config["include"] = ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", ".next/types/**/*.ts"]
config["exclude"] = ["node_modules", "deployment"]
(target / "tsconfig.json").write_text(json.dumps(config, indent=2) + "\n")
deployment = target / "deployment"
(deployment / "bridge/scripts").mkdir(parents=True)
(deployment / "bridge/src/lib").mkdir(parents=True)
shutil.copy2(taskflow / "scripts/whatsapp-local-server.ts", deployment / "bridge/scripts")
shutil.copy2(taskflow / "scripts/whatsapp-notification-client.ts", deployment / "bridge/scripts")
shutil.copy2(taskflow / "src/lib/whatsapp-local-access.ts", deployment / "bridge/src/lib")
shutil.copy2(taskflow / "src/styles/whatsapp-embed.css", deployment)
shutil.copy2(Path(__file__).parent / "start.mts", deployment)
for name in ("Dockerfile",):
    shutil.copy2(Path(__file__).parent / name, target / name)
exclude = ".env*\n.git\n.railway\nnode_modules\n.next\n.local\ndata\n*.log\n*.sql\n*.dump\n*.backup\n"
(target / ".dockerignore").write_text(exclude)
(target / ".gitignore").write_text(exclude)
files = [p for p in target.rglob("*") if p.is_file()]
assert not any(p.name.startswith(".env") or p.suffix in (".sql", ".dump", ".log") for p in files)
print(json.dumps({"files": len(files), "bytes": sum(p.stat().st_size for p in files), "private_data_copied": False}))
