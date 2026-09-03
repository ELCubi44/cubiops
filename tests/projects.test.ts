import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects';
import { canShowPublicly, canShowRating, getPublishedProjects } from '../src/lib/projects';
import { canonicalUrl, titleTemplate } from '../src/lib/seo';

describe('proyectos públicos', () => {
  it('incluye un ejemplo en borrador para copiar', () => {
    const draft = projects.find((project) => project.id === 'ejemplo-borrador');
    expect(draft).toBeTruthy();
    expect(draft?.status).toBe('draft');
    expect(draft?.permissionToPublish).toBe(false);
  });

  it('publica solo casos autorizados', () => {
    const published = getPublishedProjects(projects);
    expect(published.map((project) => project.id)).toEqual(['reprosonic', 'haf-barber-shop']);
    for (const project of published) {
      expect(canShowPublicly(project)).toBe(true);
      expect(project.logo).toMatch(/^\/projects\//);
      expect(project.works.length).toBeGreaterThan(0);
    }
  });

  it('no publica el borrador', () => {
    const draft = projects.find((project) => project.id === 'ejemplo-borrador');
    expect(draft && canShowPublicly(draft)).toBe(false);
  });

  it('no muestra estrellas sin valoración y testimonio autorizados', () => {
    const draft = projects.find((project) => project.id === 'ejemplo-borrador');
    expect(draft).toBeTruthy();
    expect(canShowRating(draft!)).toBe(false);
    expect(
      canShowRating({
        ...draft!,
        status: 'published',
        permissionToPublish: true,
        rating: 5,
        testimonial: 'Un trabajo claro y directo.',
        reviewerName: 'Persona real',
      }),
    ).toBe(true);
  });
});

describe('seo', () => {
  it('genera URLs canónicas en cubiops.com', () => {
    expect(canonicalUrl('/')).toBe('https://cubiops.com');
    expect(canonicalUrl('/aviso-legal/')).toBe('https://cubiops.com/aviso-legal');
  });

  it('compone títulos sin inventar métricas', () => {
    expect(titleTemplate()).toContain('CubiOps');
    expect(titleTemplate('Aviso legal')).toBe('Aviso legal · CubiOps');
  });
});
