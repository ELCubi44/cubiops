## 2026-11-24 - Migracion al nuevo VPS

- cubiops.com y cubiops.es (y www via CNAME) apuntan al nuevo VPS. HTTPS y sitio estatico responden correctamente. API de contacto en 127.0.0.1:3017 con usuario caddy y la configuracion existente. No se envio un mensaje de formulario a terceros como prueba.
- Se anadio facturas.cubiops.com para Facturas Reprosonic, con A al nuevo IP y CAA de letsencrypt.org. Certificado emitido y HTTPS verificado. No se modificaron MX ni el correo del dominio.
- Servidor de produccion trasladado de 217.154.184.202 a 194.164.172.200. Se preservaron binarios, dependencias, medios y configuracion privada por SSH. No se sobrescribieron cambios locales del proyecto.
- Antes de abrir el nuevo origen coincidieron todas las tablas de MySQL y las dos SQLite, y despues se comprobaron por checksum los archivos de los runtimes. Los perfiles privados de despliegue de Windows apuntan al nuevo VPS.
- Existe una copia completa de recuperacion del servidor anterior en el nuevo y en Windows con ACL restringida: 5755394641 bytes, SHA256 eed1ee29c3ab32abd12ea497e5f2b4b1c99f7dfd8325da0ca437321a299d607a. Archivo recorrido integramente: 144554 entradas. Nunca subir ese archivo a Git.
- Aplicaciones, bases de datos y archivos de negocio retirados del antiguo tras verificar las copias. Solo conserva OS/SSH y el puente HTTPS temporal al nuevo. No cancelarlo hasta drenar los DNS con TTL previo de 24 horas y actualizar los clientes antiguos de Facturas.
- Copias del conjunto a las 04:15 Europe/Madrid en /var/backups/projects; HAF tiene copia aparte a las 04:00. Retencion de 14 copias completadas por trabajo. Restauration MySQL comprobada en bases temporales (85/32 tablas) e integridad SQLite correcta. Son copias diarias locales al VPS, no envio remoto programado.

# Estado actual — CubiOps

Última actualización: 2026-09-15

## Ahora

- Rama `main`. Web v1.6.0. Logo de Corteya: solo el símbolo, sin texto.
- Home más corta: proyectos al inicio, menos texto explicativo.
- Correo público: `contacto@cubiops.com`.

## Pendiente

- Analítica (Plausible) opcional.
- Más casos solo con permiso real.

## No hacer

- No tocar `miapi` (8080) ni Barber Shop Haf en este deploy.
- No inventar testimonios ni cifras.
