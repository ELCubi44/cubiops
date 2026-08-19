# CubiOps

Web oficial de [CubiOps](https://cubiops.com): estudio independiente de páginas web, aplicaciones y automatizaciones para autónomos y pequeñas empresas.

## Stack

- **Astro + TypeScript** (sitio estático, HTML rápido, poco JavaScript)
- **CSS propio** con variables de marca
- **API de contacto** en Node, solo en `127.0.0.1:3017`
- **Caddy** en el VPS para HTTPS y redirecciones

Se eligió Astro porque la web es de captación, no un panel: se sirve como archivos estáticos, no compite con el puerto `8080` ni con otros servicios, y el JavaScript se limita al menú y al formulario.

## Comandos

```sh
npm install
npm run assets      # fuentes, favicon, OG y WebP/AVIF
npm run dev         # sitio en http://localhost:4321
npm run dev:contact # API de contacto en 127.0.0.1:3017
npm run lint
npm run check
npm run test
npm run build
npm run preview
```

Despliegue (Windows, con `.local/deploy.env`):

```powershell
powershell -File scripts/deploy-server.ps1
```

## Añadir un caso de éxito

1. Copia el objeto `ejemplo-borrador` en `src/data/projects.ts`.
2. Rellena solo datos reales y autorizados.
3. Pon `status: 'published'` y `permissionToPublish: true`.
4. Las estrellas solo se muestran si hay `rating` (1–5), testimonio y nombre de quien valora.
5. Si falta alguno de esos campos, el caso puede publicarse sin valoración.

Mientras no haya casos publicados, la sección pública muestra el estado vacío. El ejemplo en borrador **no** aparece en la web.

## Variables de entorno

Copia `.env.example`. El SMTP no está en Git. Si faltan `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` o `CONTACT_TO`, el formulario **no** finge un envío correcto.

`PUBLIC_PLAUSIBLE_DOMAIN` vacío = sin analítica.

## Servidor

- Archivos: `/var/www/cubiops`
- API contacto: `/opt/cubiops-contact` (systemd `cubiops-contact.service`, puerto **3017**)
- Caddyfile: bloque `# BEGIN CUBIOPS` … `# END CUBIOPS`
- Copias de seguridad: `/var/backups/cubiops/`
- Rollback web: `rm -rf /var/www/cubiops && mv /var/www/cubiops.prev /var/www/cubiops && systemctl reload caddy`

No se usa el puerto 8080. No se reinicia `miapi` ni `barbershop-haf`.

## DNS

Ver el informe de lanzamiento. No crear registros AAAA hasta tener IPv6 público. Conservar MX/SPF de Nominalia.
