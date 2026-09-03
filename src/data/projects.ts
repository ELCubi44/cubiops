import type { Project } from '../lib/projects';

/**
 * Colección de casos. Solo se muestran en público los que tienen
 * status: "published" y permissionToPublish: true.
 */
export const projects: Project[] = [
  {
    id: 'reprosonic',
    clientName: 'Reprosonic',
    sector: 'Reprogramación de motores',
    title: 'Web de citas, catálogo de reprogramaciones y app de facturas',
    summary: 'Web dinámica para pedir cita y ver el cambio de cada modelo, más una app de facturas.',
    problem:
      'Hacía falta un sitio claro donde el cliente viera las reprogramaciones por modelo y pudiera pedir cita, y un sistema propio para emitir facturas.',
    solution:
      'Construí reprosonic.es: una web dinámica donde se pide cita y se consulta el cambio de cada modelo. En paralelo, una app de facturas para el día a día del taller.',
    technologies: [],
    automations: ['Petición de cita desde la web', 'Consulta de reprogramaciones por modelo', 'Emisión de facturas en la app'],
    result:
      'El negocio tiene web pública con cita y catálogo, y una herramienta interna para facturar sin depender de un proceso a mano.',
    image: '/projects/reprosonic.png',
    logo: '/projects/reprosonic.png',
    logoAlt: 'Logotipo de Reprosonic',
    url: 'https://reprosonic.es',
    works: [
      {
        kind: 'web',
        title: 'Web de citas y reprogramaciones',
        body: 'En reprosonic.es la gente pide cita y consulta el cambio de reprogramación de todos los modelos. La web es dinámica y enlaza directo al servicio.',
        url: 'https://reprosonic.es',
        icon: '/projects/reprosonic.png',
      },
      {
        kind: 'app',
        title: 'App de facturas',
        body: 'Aplicación de facturación para el taller: emitir y gestionar facturas sin improvisar el papeleo.',
        icon: '/projects/reprosonic-facturas.png',
      },
    ],
    testimonial: '',
    reviewerName: '',
    reviewerRole: '',
    rating: null,
    date: '2026-06-01',
    permissionToPublish: true,
    status: 'published',
    featured: true,
  },
  {
    id: 'haf-barber-shop',
    clientName: 'HAF Barber Shop',
    sector: 'Peluquería',
    title: 'Web y app de citas, agenda y productos',
    summary: 'Registro sencillo para pedir cita, y panel para gestionar la agenda y lo que venden.',
    problem:
      'Las citas y la operativa de la barbería no podían depender de mensajes sueltos: hacía falta que el cliente reservara y que el equipo controlara agenda y productos.',
    solution:
      'Web y app con el mismo logotipo de la barbería. Con un registro simple, el cliente pide cita. Ellos gestionan su agenda y los productos que venden.',
    technologies: [],
    automations: ['Registro y reserva de cita', 'Agenda del equipo', 'Gestión de productos'],
    result:
      'Clientes y barberos comparten el mismo flujo: pedir cita desde la web o la app, y llevar agenda y catálogo de productos en un solo sitio.',
    image: '/projects/haf-barbershop.png',
    logo: '/projects/haf-barbershop.png',
    logoAlt: 'Logotipo de HAF Barber Shop',
    url: 'https://hafbarbershop.es',
    works: [
      {
        kind: 'web',
        title: 'Web de la barbería',
        body: 'Sitio en hafbarbershop.es para conocer el negocio y pedir cita con un registro simple.',
        url: 'https://hafbarbershop.es',
        icon: '/projects/haf-barbershop.png',
      },
      {
        kind: 'app',
        title: 'App de citas, agenda y productos',
        body: 'La misma identidad que la empresa. Los clientes reservan; el equipo gestiona la agenda y los productos que venden.',
        icon: '/projects/haf-barbershop.png',
      },
    ],
    testimonial: '',
    reviewerName: '',
    reviewerRole: '',
    rating: null,
    date: '2026-05-01',
    permissionToPublish: true,
    status: 'published',
    featured: true,
  },
  {
    id: 'ejemplo-borrador',
    clientName: '[Nombre del cliente]',
    sector: '[Sector, por ejemplo: clínica, comercio, taller]',
    title: 'Plantilla para un caso de éxito',
    summary: '[Resumen corto para la ficha.]',
    problem:
      '[Describe el problema inicial con hechos: qué se hacía a mano, dónde se perdía tiempo, qué fallaba.]',
    solution:
      '[Describe la solución construida: web, app, reservas, automatizaciones o panel interno.]',
    technologies: ['[Astro]', '[otra tecnología realmente usada]'],
    automations: ['[Ejemplo: recordatorio de cita por correo]', '[Ejemplo: aviso interno de nueva reserva]'],
    result:
      '[Solo un resultado que puedas demostrar. Si no hay cifra verificable, describe el cambio de forma cualitativa y honesta.]',
    image: '/images/case-study-abstract.webp',
    logo: '/brand/mark.png',
    logoAlt: 'Marca CubiOps',
    works: [],
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
