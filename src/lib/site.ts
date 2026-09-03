export const site = {
  name: 'CubiOps',
  legalName: 'Miguel Ángel García Gracia',
  legalId: '26589533S',
  legalCity: 'Soria',
  legalCountry: 'España',
  domain: 'cubiops.com',
  url: 'https://cubiops.com',
  email: 'contacto@cubiops.com',
  locale: 'es_ES',
  language: 'es',
  description:
    'CubiOps diseña y desarrolla páginas web, aplicaciones y automatizaciones a medida para autónomos y pequeñas empresas. Presupuesto gratis, sin compromiso.',
  tagline: 'Automatización útil para negocios reales.',
  version: '1.5.7',
} as const;

export const nav = [
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#como-trabajo', label: 'Cómo trabajo' },
  { href: '/#sobre-cubiops', label: 'Sobre CubiOps' },
  { href: '/#contacto', label: 'Contacto' },
] as const;

export const footerNav = [
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#como-trabajo', label: 'Cómo trabajo' },
  { href: '/#sobre-cubiops', label: 'Sobre CubiOps' },
  { href: '/#contacto', label: 'Contacto' },
  { href: '/#faq', label: 'Preguntas frecuentes' },
] as const;

export const legalNav = [
  { href: '/aviso-legal', label: 'Aviso legal' },
  { href: '/privacidad', label: 'Política de privacidad' },
  { href: '/cookies', label: 'Política de cookies' },
] as const;
