#!/bin/bash
set -euo pipefail

WEB_DIR=/var/www/cubiops
CONTACT_DIR=/opt/cubiops-contact
TMP_DIR="${1:?falta el directorio temporal de subida}"

if [ -d "$WEB_DIR" ]; then
  rm -rf /var/www/cubiops.prev
  mv "$WEB_DIR" /var/www/cubiops.prev
fi
mkdir -p "$WEB_DIR"
tar -xzf "$TMP_DIR/site.tgz" -C "$WEB_DIR"
chown -R caddy:caddy "$WEB_DIR"
find "$WEB_DIR" -type d -exec chmod 755 '{}' \;
find "$WEB_DIR" -type f -exec chmod 644 '{}' \;

install -d -o caddy -g caddy "$CONTACT_DIR"
cp "$TMP_DIR/contact-api.cjs" "$CONTACT_DIR/contact-api.cjs"
chown caddy:caddy "$CONTACT_DIR/contact-api.cjs"
chmod 750 "$CONTACT_DIR/contact-api.cjs"
if [ ! -f "$CONTACT_DIR/.env" ]; then
  umask 077
  cat > "$CONTACT_DIR/.env" <<'ENV'
CONTACT_BIND_HOST=127.0.0.1
CONTACT_BIND_PORT=3017
CONTACT_ALLOWED_ORIGIN=https://cubiops.com
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=CubiOps <hola@cubiops.com>
CONTACT_TO=hola@cubiops.com
ENV
  chown caddy:caddy "$CONTACT_DIR/.env"
  chmod 600 "$CONTACT_DIR/.env"
fi

install -m 644 "$TMP_DIR/cubiops-contact.service" /etc/systemd/system/cubiops-contact.service
systemctl daemon-reload
systemctl enable cubiops-contact
systemctl restart cubiops-contact || echo "AVISO: cubiops-contact no arranco; la web estatica sigue disponible."

python3 - "$TMP_DIR/cubiops.caddy" <<'PY'
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
  echo "Caddyfile invalido; restaurando"
  cp /etc/caddy/Caddyfile.bak.cubiops-live /etc/caddy/Caddyfile
  exit 1
fi
if ! systemctl reload caddy; then
  echo "Reload de Caddy fallo; restaurando"
  cp /etc/caddy/Caddyfile.bak.cubiops-live /etc/caddy/Caddyfile
  systemctl reload caddy
  exit 1
fi
echo DEPLOY_OK
