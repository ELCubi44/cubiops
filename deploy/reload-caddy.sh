#!/bin/bash
set -euo pipefail
SRC="${1:?falta cubiops.caddy}"
python3 - "$SRC" <<'PY'
from pathlib import Path
import sys
src = Path(sys.argv[1]).read_text()
begin, end = "# BEGIN CUBIOPS", "# END CUBIOPS"
block = src[src.index(begin):src.index(end) + len(end)] + "\n"
path = Path("/etc/caddy/Caddyfile")
backup = Path("/etc/caddy/Caddyfile.bak.cubiops-live")
backup.write_text(path.read_text())
text = path.read_text()
if begin in text and end in text:
    text = text[:text.index(begin)] + block + text[text.index(end) + len(end):]
else:
    if not text.endswith("\n"):
        text += "\n"
    text += "\n" + block
path.write_text(text)
print("Caddyfile actualizado")
PY
if ! caddy validate --config /etc/caddy/Caddyfile; then
  cp /etc/caddy/Caddyfile.bak.cubiops-live /etc/caddy/Caddyfile
  exit 1
fi
systemctl reload caddy
echo RELOAD_OK
