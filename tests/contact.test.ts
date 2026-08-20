import { describe, expect, it } from 'vitest';
import { buildMailto, isHoneypotFilled, validateContact } from '../src/lib/contact';
import { site } from '../src/lib/site';

const valid = {
  name: 'Ana Pérez',
  company: 'Taller Luz',
  email: 'ana@example.com',
  phone: '600123123',
  projectType: 'Automatización',
  message: 'Quiero dejar de confirmar las citas una a una por WhatsApp y enviar recordatorios.',
  privacy: true,
  website: '',
};

describe('validateContact', () => {
  it('acepta un mensaje completo y honesto', () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
  });

  it('rechaza un correo inválido', () => {
    const result = validateContact({ ...valid, email: 'no-es-un-correo' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBeTruthy();
  });

  it('exige consentimiento de privacidad', () => {
    const result = validateContact({ ...valid, privacy: false });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.privacy).toBeTruthy();
  });

  it('exige un tipo de proyecto conocido', () => {
    const result = validateContact({ ...valid, projectType: 'Blockchain enterprise' });
    expect(result.ok).toBe(false);
  });

  it('permite teléfono vacío', () => {
    const result = validateContact({ ...valid, phone: '' });
    expect(result.ok).toBe(true);
  });
});

describe('honeypot y mailto', () => {
  it('detecta el honeypot relleno', () => {
    expect(isHoneypotFilled('http://spam.test')).toBe(true);
    expect(isHoneypotFilled('  ')).toBe(false);
  });

  it('usa contacto@cubiops.com como correo público y en el mailto', () => {
    expect(site.email).toBe('contacto@cubiops.com');
    const href = buildMailto(valid);
    expect(href.startsWith('mailto:contacto@cubiops.com')).toBe(true);
    expect(href).toContain('Presupuesto%20CubiOps');
  });
});
