import http from 'node:http';
import { isHoneypotFilled, validateContact } from '../src/lib/contact.ts';
import { buildProposalMail } from '../src/lib/proposal-mail.ts';
import nodemailer from 'nodemailer';

const host = process.env.CONTACT_BIND_HOST || '127.0.0.1';
const port = Number(process.env.CONTACT_BIND_PORT || 3017);
const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN || 'https://cubiops.com';

const hits = new Map<string, { count: number; reset: number }>();

function json(res: http.ServerResponse, status: number, body: Record<string, unknown>) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(JSON.stringify(body));
}

function clientIp(req: http.IncomingMessage): string {
  return req.socket.remoteAddress || 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || current.reset < now) {
    hits.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 8;
}

function smtpReady(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO);
}

function originAllowed(req: http.IncomingMessage): boolean {
  const origin = req.headers.origin;
  if (!origin) return true;
  return origin === allowedOrigin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');
}

async function readBody(req: http.IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    if (chunks.reduce((sum, part) => sum + part.length, 0) > 32_000) {
      throw new Error('payload_too_large');
    }
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  return JSON.parse(raw) as unknown;
}

async function sendMail(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}) {
  const mail = buildProposalMail(data);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `CubiOps <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    messageId: mail.messageId,
    headers: {
      'Auto-Submitted': 'auto-generated',
      'Content-Language': 'es-ES',
      'X-Entity-Ref-ID': mail.messageId,
    },
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (!originAllowed(req)) {
      json(res, 403, { ok: false, message: 'Origen no permitido.' });
      return;
    }

    const url = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`);
    if (url.pathname !== '/api/contact' && url.pathname !== '/') {
      json(res, 404, { ok: false, message: 'No encontrado.' });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/') {
      json(res, 200, { ok: true, service: 'cubiops-contact', smtp: smtpReady() });
      return;
    }

    if (req.method !== 'POST') {
      json(res, 405, { ok: false, message: 'Método no permitido.' });
      return;
    }

    if (rateLimited(clientIp(req))) {
      json(res, 429, { ok: false, message: 'Has enviado demasiadas consultas. Prueba más tarde o usa el correo.' });
      return;
    }

    const payload = await readBody(req);
    if (isHoneypotFilled((payload as { website?: unknown }).website)) {
      json(res, 400, { ok: false, message: 'No se ha podido enviar el formulario.' });
      return;
    }

    const result = validateContact(payload);
    if (!result.ok) {
      json(res, 400, { ok: false, message: 'Revisa los datos del formulario.', errors: result.errors });
      return;
    }

    if (!smtpReady()) {
      json(res, 503, {
        ok: false,
        code: 'SMTP_NOT_CONFIGURED',
        message: 'El envío automático aún no está configurado. El mensaje no se ha enviado.',
      });
      return;
    }

    await sendMail({
      name: result.data.name,
      company: result.data.company,
      email: result.data.email,
      phone: result.data.phone,
      projectType: result.data.projectType,
      message: result.data.message,
    });

    json(res, 200, { ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'payload_too_large') {
      json(res, 400, { ok: false, message: 'El mensaje es demasiado grande.' });
      return;
    }
    console.error('cubiops-contact: no se pudo enviar la propuesta');
    json(res, 502, { ok: false, message: 'No se ha podido enviar el formulario. Usa el correo de contacto.' });
  }
});

server.listen(port, host, () => {
  console.log(`cubiops-contact listening on ${host}:${port}`);
});
