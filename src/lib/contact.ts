export const PROJECT_TYPES = [
  'Página web',
  'Aplicación móvil',
  'Reservas y clientes',
  'Automatización',
  'Integración o panel interno',
  'Mantenimiento',
  'Aún no lo tengo claro',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface ContactInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  privacy: boolean;
  website: string;
}

export interface ContactSuccess {
  ok: true;
  data: Omit<ContactInput, 'website' | 'privacy'> & { privacy: true };
}

export interface ContactFailure {
  ok: false;
  errors: Partial<Record<keyof ContactInput, string>>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\s.-]{7,20}$/;

function trim(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function isHoneypotFilled(website: unknown): boolean {
  return trim(website).length > 0;
}

export function validateContact(raw: unknown): ContactSuccess | ContactFailure {
  const source = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const input: ContactInput = {
    name: trim(source.name),
    company: trim(source.company),
    email: trim(source.email).toLowerCase(),
    phone: trim(source.phone),
    projectType: trim(source.projectType),
    message: trim(source.message),
    privacy: source.privacy === true || source.privacy === 'on' || source.privacy === 'true',
    website: trim(source.website),
  };

  const errors: ContactFailure['errors'] = {};

  if (input.name.length < 2) {
    errors.name = 'Indica tu nombre.';
  } else if (input.name.length > 80) {
    errors.name = 'El nombre es demasiado largo.';
  }

  if (input.company.length < 2) {
    errors.company = 'Indica el nombre de tu empresa o actividad.';
  } else if (input.company.length > 120) {
    errors.company = 'El nombre de empresa es demasiado largo.';
  }

  if (!EMAIL_RE.test(input.email)) {
    errors.email = 'Indica un correo electrónico válido.';
  }

  if (input.phone && !PHONE_RE.test(input.phone)) {
    errors.phone = 'El teléfono no parece válido. Puedes dejarlo en blanco.';
  }

  if (!PROJECT_TYPES.includes(input.projectType as ProjectType)) {
    errors.projectType = 'Selecciona un tipo de proyecto.';
  }

  if (input.message.length < 20) {
    errors.message = 'Cuéntame un poco más: al menos un par de frases sobre el proceso que quieres mejorar.';
  } else if (input.message.length > 4000) {
    errors.message = 'El mensaje es demasiado largo. Resúmelo un poco, por favor.';
  }

  if (!input.privacy) {
    errors.privacy = 'Necesito tu consentimiento para poder leerte y responderte.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name: input.name,
      company: input.company,
      email: input.email,
      phone: input.phone,
      projectType: input.projectType,
      message: input.message,
      privacy: true,
    },
  };
}

export function buildMailto(input: {
  name: string;
  company: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  to?: string;
}): string {
  const to = input.to ?? 'contacto@cubiops.com';
  const subject = encodeURIComponent(`Presupuesto CubiOps — ${input.company}`);
  const body = encodeURIComponent(
    [
      `Nombre: ${input.name}`,
      `Empresa: ${input.company}`,
      `Correo: ${input.email}`,
      `Teléfono: ${input.phone || '—'}`,
      `Tipo de proyecto: ${input.projectType}`,
      '',
      input.message,
    ].join('\n'),
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
