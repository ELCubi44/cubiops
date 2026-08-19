import { site } from './site';

export function canonicalUrl(path = '/'): string {
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
  return new URL(normalized, site.url).toString().replace(/\/$/, '') || site.url;
}

export function titleTemplate(pageTitle?: string): string {
  if (!pageTitle || pageTitle === site.name) {
    return `${site.name} — ${site.tagline}`;
  }
  return `${pageTitle} · ${site.name}`;
}
