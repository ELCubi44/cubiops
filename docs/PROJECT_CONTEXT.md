# Contexto — CubiOps

Web de captación de CubiOps, no un panel.

| Parte | Dónde | Notas |
|---|---|---|
| Sitio | Astro `src/` | Dev en http://localhost:4321 |
| Contacto | `server/contact-api.ts` | Bind 127.0.0.1:3017 |
| VPS web | `/var/www/cubiops` | Caddy |
| VPS API | `/opt/cubiops-contact` | systemd, puerto 3017 |
| Casos | `src/data/projects.ts` | `permissionToPublish` obligatorio para publicar |

DNS: no crear AAAA hasta tener IPv6 público; conservar MX/SPF de Nominalia.
