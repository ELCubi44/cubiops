import { describe, expect, it } from 'vitest';
import { buildProposalMail, escapeHtml } from '../src/lib/proposal-mail';

const sample = {
  name: 'Ana Pérez',
  company: 'Taller Luz',
  email: 'ana@example.com',
  phone: '600123123',
  projectType: 'Automatización',
  message: 'Quiero dejar de confirmar las citas una a una por WhatsApp.\nTambién recordatorios.',
  receivedAt: new Date('2026-08-20T16:00:00+02:00'),
};

describe('buildProposalMail', () => {
  it('arma asunto, texto y HTML con los datos de la propuesta', () => {
    const mail = buildProposalMail(sample);
    expect(mail.subject).toBe('Presupuesto CubiOps — Taller Luz · Automatización');
    expect(mail.replyTo).toBe('Ana Pérez <ana@example.com>');
    expect(mail.text).toContain('Nombre: Ana Pérez');
    expect(mail.text).toContain('También recordatorios.');
    expect(mail.html).toContain('Taller Luz');
    expect(mail.html).toContain('Ana Pérez');
    expect(mail.html).toContain('https://cubiops.com/brand/mark.png');
    expect(mail.messageId).toMatch(/^<presupuesto-.+@cubiops.com>$/);
  });

  it('escapa HTML peligroso en el mensaje', () => {
    const mail = buildProposalMail({
      ...sample,
      name: '<script>alert(1)</script>',
      message: 'Hola <img src=x onerror=alert(1)>',
    });
    expect(mail.html).not.toContain('<script>alert(1)</script>');
    expect(mail.html).toContain(escapeHtml('<script>alert(1)</script>'));
    expect(mail.html).toContain('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('indica cuando no hay teléfono', () => {
    const mail = buildProposalMail({ ...sample, phone: '' });
    expect(mail.text).toContain('Teléfono: No indicado');
    expect(mail.html).toContain('No indicado');
  });
});
