export const problems = [
  {
    title: 'Reservas apuntadas a mano',
    problem:
      'Las citas viven en un cuaderno, un WhatsApp o una hoja de cálculo. Hay huecos, dobles reservas y tiempo perdido en confirmar.',
    solution:
      'Una agenda clara, visible para quien tiene que usarla, con confirmaciones y recordatorios automáticos cuando aportan valor.',
  },
  {
    title: 'Los mismos mensajes una y otra vez',
    problem:
      'Responder siempre lo mismo: horarios, precios, “¿habéis recibido mi solicitud?”, documentos que ya enviaste ayer.',
    solution:
      'Respuestas y avisos que salen solos en el momento adecuado, sin sonar a robot ni perder el trato personal.',
  },
  {
    title: 'Datos dispersos',
    problem:
      'Clientes en el correo, pedidos en una carpeta, facturas en otro sitio. Nadie tiene una foto completa.',
    solution:
      'Un lugar de trabajo sencillo donde encaja lo importante, o una conexión entre las herramientas que ya usas.',
  },
  {
    title: 'Formularios y documentos duplicados',
    problem:
      'Se rellena lo mismo varias veces. Se copian PDFs. Se pierden versiones. El trabajo administrativo se come el día.',
    solution:
      'Un formulario bien pensado que rellena lo demás: correo, documento, aviso interno o ficha de cliente.',
  },
  {
    title: 'Seguimientos que se olvidan',
    problem:
      'Un presupuesto sin respuesta, una cita sin confirmar, un cliente al que había que llamar. La memoria no escala.',
    solution:
      'Recordatorios y listas de seguimiento que no dependen de que alguien se acuerde a las diez de la noche.',
  },
  {
    title: 'Todo pasa por una sola persona',
    problem:
      'Si esa persona no está, el proceso se para. El conocimiento está en su cabeza, no en el sistema.',
    solution:
      'Un flujo visible, con pasos claros, para que el negocio no dependa de un chat privado o de un archivo escondido.',
  },
  {
    title: 'Una web antigua o inexistente',
    problem:
      'No hay un sitio claro donde entender qué ofreces, pedir algo o reservar. Llegas tarde o no llegas.',
    solution:
      'Una web rápida, comprensible y útil: que explique, que convierta y, si hace falta, que se pueda instalar en el teléfono.',
  },
] as const;

export const services = [
  {
    id: 'web',
    title: 'Páginas web',
    lead: 'Un sitio claro, rápido y pensado para que te escriban o te compren.',
    body: 'Diseño y desarrollo webs para autónomos y pequeñas empresas: quién eres, qué haces y cuál es el siguiente paso. Sin plantillas recargadas ni páginas que tardan en cargar.',
  },
  {
    id: 'apps',
    title: 'Aplicaciones móviles',
    lead: 'Una app cuando de verdad aporta, no porque quede bien decirlo.',
    body: 'Creo aplicaciones para iPhone y Android, o webs instalables (PWA) cuando cubren el mismo objetivo con menos fricción. El formato lo decide el uso real, no la moda.',
  },
  {
    id: 'reservas',
    title: 'Reservas y clientes',
    lead: 'Agenda, fichas y avisos en un mismo flujo.',
    body: 'Sistemas de citas, formularios y gestión de clientes para dejar de improvisar con mensajes sueltos. Tú decides qué automatizar y qué sigue siendo conversación humana.',
  },
  {
    id: 'automatizacion',
    title: 'Automatizaciones',
    lead: 'Menos copiar, pegar y recordar: más trabajo que importa.',
    body: 'Identificamos tareas repetitivas —correos, documentos, avisos, traspasos de datos— y las convertimos en un proceso fiable. Solo se automatiza lo que ahorra tiempo de verdad.',
  },
  {
    id: 'integraciones',
    title: 'Integraciones y herramientas internas',
    lead: 'Que tus herramientas hablen entre sí, o un panel que sí usas.',
    body: 'Conecto servicios que ya tienes o construyo un panel privado a medida. El objetivo es una operativa sencilla, no un laberinto de aplicaciones.',
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento y evolución',
    lead: 'La solución no se queda huérfana el día del lanzamiento.',
    body: 'Tras publicar, puedo encargarme de correcciones, mejoras y pequeños cambios. Hablas con la misma persona que la construyó, no con un buzón genérico.',
  },
] as const;

export const processSteps = [
  {
    n: '01',
    title: 'Hablamos del problema',
    body: 'Qué se atasca hoy. Sin diagnóstico hinchado.',
  },
  {
    n: '02',
    title: 'Propongo lo justo',
    body: 'Si no aporta, no se construye.',
  },
  {
    n: '03',
    title: 'Lo construyo yo',
    body: 'Diseño, desarrollo y conexión. Sin relevos.',
  },
  {
    n: '04',
    title: 'Lo publicamos',
    body: 'En marcha, y mantenimiento si lo quieres.',
  },
] as const;

export const faqs = [
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'El presupuesto es gratis y sin compromiso. Cada negocio es distinto: cuando entiendo lo que necesitas, te envío una propuesta clara.',
  },
  {
    q: '¿Puedo empezar solo con una web?',
    a: 'Sí. Muchos proyectos empiezan por una web y más adelante añaden reservas o una app.',
  },
  {
    q: '¿Haces aplicaciones para iPhone y Android?',
    a: 'Sí. Si una web instalable cubre mejor el caso, también lo planteo.',
  },
  {
    q: '¿De quién es el dominio y los datos?',
    a: 'Tuyos. Yo no necesito ser titular para diseñar, publicar o mantener la solución.',
  },
] as const;
