export const site = {
  name: 'CubiOps',
  legalName: 'Miguel Ángel García Gracia',
  legalId: '26589533S',
  legalCity: 'Soria',
  legalCountry: 'España',
  domain: 'cubiops.com',
  url: 'https://cubiops.com',
  email: 'contact@cubiops.com',
  locale: 'es_ES',
  language: 'es',
  description:
    'CubiOps diseña y desarrolla páginas web, aplicaciones y automatizaciones a medida para autónomos y pequeñas empresas. Presupuesto gratis, sin compromiso.',
  tagline: 'Automatización útil para negocios reales.',
  version: '1.3.0',
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
