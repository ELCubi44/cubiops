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
if [ -f "$CONTACT_DIR/.env" ]; then
  sed -i 's/hola@cubiops.com/contact@cubiops.com/g' "$CONTACT_DIR/.env"
fi
if [ ! -f "$CONTACT_DIR/.env" ]; then
  umask 077
  cat > "$CONTACT_DIR/.env" <<'ENV'
CONTACT_BIND_HOST=127.0.0.1
CONTACT_BIND_PORT=3017
CONTACT_ALLOWED_ORIGIN=https://cubiops.com
SMTP_HOST=authsmtp.securemail.pro
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@cubiops.com
SMTP_PASS=
SMTP_FROM=CubiOps <contact@cubiops.com>
CONTACT_TO=contact@cubiops.com
ENV
  chown caddy:caddy "$CONTACT_DIR/.env"
  chmod 600 "$CONTACT_DIR/.env"
fi
python3 - "$CONTACT_DIR/.env" "${TMP_DIR}/smtp.env" <<'PY'
from pathlib import Path
import sys

env_path = Path(sys.argv[1])
smtp_path = Path(sys.argv[2])
lines = env_path.read_text().splitlines() if env_path.exists() else []
values = {}
order = []
for line in lines:
    if not line.strip() or line.lstrip().startswith('#') or '=' not in line:
        continue
    key, raw = line.split('=', 1)
    key = key.strip()
    values[key] = raw
    if key not in order:
        order.append(key)

defaults = {
    'CONTACT_BIND_HOST': '127.0.0.1',
    'CONTACT_BIND_PORT': '3017',
    'CONTACT_ALLOWED_ORIGIN': 'https://cubiops.com',
    'SMTP_HOST': 'authsmtp.securemail.pro',
    'SMTP_PORT': '465',
    'SMTP_SECURE': 'true',
    'SMTP_USER': 'contact@cubiops.com',
    'SMTP_FROM': 'CubiOps <contact@cubiops.com>',
    'CONTACT_TO': 'contact@cubiops.com',
}
for key, default in defaults.items():
    current = values.get(key, '').strip()
    if not current:
        values[key] = default
        if key not in order:
            order.append(key)

if smtp_path.exists():
    for line in smtp_path.read_text().splitlines():
        if not line.strip() or line.lstrip().startswith('#') or '=' not in line:
            continue
        key, raw = line.split('=', 1)
        key = key.strip()
        if not raw.strip():
            continue
        values[key] = raw
        if key not in order:
            order.append(key)

text = ''.join(f'{key}={values[key]}\n' for key in order if key in values)
env_path.write_text(text)
print('CONTACT_ENV_UPDATED')
PY
chown caddy:caddy "$CONTACT_DIR/.env"
chmod 600 "$CONTACT_DIR/.env"

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
