# CubiOps

## Qué es

Web oficial de CubiOps (https://cubiops.com): estudio de páginas web, aplicaciones y automatizaciones para autónomos y pequeñas empresas. GitHub: `ELCubi44/cubiops` (público).

## Arquitectura

- Sitio estático: Astro + TypeScript (`src/`), CSS propio.
- API de contacto en Node: `server/contact-api.ts`, solo `127.0.0.1:3017`.
- Caddy en el VPS (HTTPS). Archivos en `/var/www/cubiops`. Servicio `cubiops-contact.service`.
- Deploy: `scripts/deploy-server.ps1`. Rollback: `scripts/rollback-server.ps1`.

No usa el puerto 8080 ni reinicia `miapi` o `barbershop-haf`.

## Instalar, ejecutar y probar

Ver `docs/DEVELOPMENT.md` y el `README.md`.

## Restricciones importantes

- El formulario no finge un envío si faltan SMTP o `CONTACT_TO`.
- `PUBLIC_PLAUSIBLE_DOMAIN` vacío = sin analítica.
- Casos de éxito: solo datos reales y autorizados (`src/data/projects.ts`).
- No leer ni imprimir `.local/deploy.env` ni `SMTP_PASS`.

## Flujo Git

`/actualizar-proyecto` al empezar. `/cerrar-trabajo` al terminar. Nunca force-push.

## Secretos (nunca subir)

`.env`, `.local/deploy.env` (`SMTP_PASS`), certificados.

## Contexto duradero

Actualiza `docs/CURRENT_STATUS.md` al finalizar trabajo relevante.
