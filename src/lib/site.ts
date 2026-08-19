export const site = {
  name: 'CubiOps',
  legalName: 'CubiOps',
  domain: 'cubiops.com',
  url: 'https://cubiops.com',
  email: 'hola@cubiops.com',
  locale: 'es_ES',
  language: 'es',
  description:
    'CubiOps diseña y desarrolla páginas web, aplicaciones y automatizaciones a medida para autónomos y pequeñas empresas.',
  tagline: 'Automatización útil para negocios reales.',
  version: '1.0.0',
} as const;

export const nav = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#como-trabajo', label: 'Cómo trabajo' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#sobre-cubiops', label: 'Sobre CubiOps' },
  { href: '/#contacto', label: 'Contacto' },
] as const;

export const footerNav = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#como-trabajo', label: 'Cómo trabajo' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#sobre-cubiops', label: 'Sobre CubiOps' },
  { href: '/#contacto', label: 'Contacto' },
  { href: '/#faq', label: 'Preguntas frecuentes' },
] as const;

export const legalNav = [
  { href: '/aviso-legal', label: 'Aviso legal' },
  { href: '/privacidad', label: 'Política de privacidad' },
  { href: '/cookies', label: 'Política de cookies' },
] as const;
