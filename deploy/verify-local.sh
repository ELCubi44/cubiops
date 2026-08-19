#!/bin/bash
set -e
python3 - <<'PY'
import json, urllib.request
payload = {
    "name": "Ana Perez",
    "company": "Taller Luz",
    "email": "ana@example.com",
    "phone": "",
    "projectType": "Automatización",
    "message": "Quiero dejar de confirmar las citas una a una por WhatsApp y enviar recordatorios.",
    "privacy": True,
}
req = urllib.request.Request(
    "http://127.0.0.1:3017/api/contact",
    data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json"},
    method="POST",
)
try:
    with urllib.request.urlopen(req) as res:
        print("CONTACT", res.status, res.read().decode())
except Exception as e:
    body = e.read().decode() if hasattr(e, "read") else str(e)
    print("CONTACT", getattr(e, "code", "?"), body)
PY

curl -sSI -H "Host: cubiops.com" http://127.0.0.1/ | sed -n "1,8p"
echo "--- aviso ---"
curl -sSI -H "Host: cubiops.com" "http://127.0.0.1/aviso-legal?x=1" | sed -n "1,8p"
echo "--- es ---"
curl -sSI -H "Host: cubiops.es" "http://127.0.0.1/ruta?x=1" | sed -n "1,8p"
echo "--- www.es ---"
curl -sSI -H "Host: www.cubiops.es" "http://127.0.0.1/ruta?x=1" | sed -n "1,8p"
echo "--- www.com ---"
curl -sSI -H "Host: www.cubiops.com" "http://127.0.0.1/ruta?x=1" | sed -n "1,8p"
