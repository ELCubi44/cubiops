import type { Project } from '../lib/projects';

/**
 * Colección de casos. Solo se muestran en público los que tienen
 * status: "published" y permissionToPublish: true.
 * Copia `ejemplo-borrador` y cambia los campos para añadir un caso real.
 */
export const projects: Project[] = [
  {
    id: 'ejemplo-borrador',
    clientName: '[Nombre del cliente]',
    sector: '[Sector, por ejemplo: clínica, comercio, taller]',
    title: 'Plantilla para un caso de éxito',
    problem:
      '[Describe el problema inicial con hechos: qué se hacía a mano, dónde se perdía tiempo, qué fallaba.]',
    solution:
      '[Describe la solución construida: web, app, reservas, automatizaciones o panel interno.]',
    technologies: ['[Astro]', '[otra tecnología realmente usada]'],
    automations: ['[Ejemplo: recordatorio de cita por correo]', '[Ejemplo: aviso interno de nueva reserva]'],
    result:
      '[Solo un resultado que puedas demostrar. Si no hay cifra verificable, describe el cambio de forma cualitativa y honesta.]',
    image: '/images/case-study-abstract.webp',
    testimonial: '',
    reviewerName: '',
    reviewerRole: '',
    rating: null,
    date: '2026-08-01',
    permissionToPublish: false,
    status: 'draft',
    featured: false,
  },
];
