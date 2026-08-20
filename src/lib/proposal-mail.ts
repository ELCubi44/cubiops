export interface ProposalMailInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  receivedAt?: Date;
}

export interface ProposalMail {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  messageId: string;
}

const LOGO_URL = 'https://cubiops.com/brand/mark.png';
const SITE_URL = 'https://cubiops.com';

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatWhen(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(date);
}

function formatMessageHtml(message: string): string {
  return escapeHtml(message).replaceAll('\n', '<br />');
}

function randomId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export function buildProposalMail(input: ProposalMailInput): ProposalMail {
  const receivedAt = input.receivedAt ?? new Date();
  const when = formatWhen(receivedAt);
  const phone = input.phone.trim() ? input.phone.trim() : 'No indicado';
  const subject = `Presupuesto CubiOps — ${input.company} · ${input.projectType}`;
  const replyTo = `${input.name} <${input.email}>`;
  const messageId = `<presupuesto-${randomId()}@cubiops.com>`;

  const text = [
    'Nueva solicitud de presupuesto — CubiOps',
    '',
    `Recibida: ${when}`,
    `Nombre: ${input.name}`,
    `Empresa o actividad: ${input.company}`,
    `Correo: ${input.email}`,
    `Teléfono: ${phone}`,
    `Tipo de proyecto: ${input.projectType}`,
    '',
    'Qué proceso quiere mejorar:',
    input.message,
    '',
    `Responde a este correo para hablar con ${input.name}.`,
    SITE_URL,
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;color:#12203c;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d7deea;">
          <tr>
            <td style="background:#0b1739;padding:22px 28px;">
              <img src="${LOGO_URL}" width="44" height="44" alt="CubiOps" style="display:block;border:0;" />
              <p style="margin:14px 0 0;color:#11d9a5;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;">CubiOps</p>
              <h1 style="margin:6px 0 0;color:#f7f9fc;font-size:22px;line-height:1.3;font-weight:700;">Nueva solicitud de presupuesto</h1>
              <p style="margin:8px 0 0;color:#c5d0e3;font-size:14px;">${escapeHtml(when)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 18px;font-size:16px;line-height:1.5;">
                <strong>${escapeHtml(input.name)}</strong> ha pedido presupuesto desde
                <a href="${SITE_URL}/#contacto" style="color:#0b1739;font-weight:600;">cubiops.com</a>.
                Responde a este correo para contestarle directamente.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;color:#5b6b86;width:180px;font-size:13px;">Nombre</td>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;font-size:15px;font-weight:600;">${escapeHtml(input.name)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;color:#5b6b86;font-size:13px;">Empresa o actividad</td>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;font-size:15px;font-weight:600;">${escapeHtml(input.company)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;color:#5b6b86;font-size:13px;">Correo</td>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;font-size:15px;"><a href="mailto:${escapeHtml(input.email)}" style="color:#0b1739;">${escapeHtml(input.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;color:#5b6b86;font-size:13px;">Teléfono</td>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;font-size:15px;">${escapeHtml(phone)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;color:#5b6b86;font-size:13px;">Tipo de proyecto</td>
                  <td style="padding:10px 0;border-top:1px solid #e6ecf4;font-size:15px;font-weight:600;">${escapeHtml(input.projectType)}</td>
                </tr>
              </table>
              <p style="margin:22px 0 8px;color:#5b6b86;font-size:13px;">Qué proceso quiere mejorar</p>
              <p style="margin:0;padding:16px 18px;background:#f4f7fb;border-radius:12px;font-size:15px;line-height:1.6;">${formatMessageHtml(input.message)}</p>
              <p style="margin:24px 0 0;">
                <a href="mailto:${escapeHtml(input.email)}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;background:#11d9a5;color:#082018;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;">Responder a ${escapeHtml(input.name)}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 24px;background:#f7f9fc;color:#5b6b86;font-size:12px;line-height:1.5;">
              Mensaje generado automáticamente por el formulario de CubiOps. No reenvíes este correo a terceros.
              <br /><a href="${SITE_URL}" style="color:#0b1739;">cubiops.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html, replyTo, messageId };
}
