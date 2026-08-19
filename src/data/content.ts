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
    title: 'Analizamos el problema',
    body: 'Hablamos de cómo trabajas hoy. Qué se repite, qué se atasca y qué no hace falta tocar. Sin diagnóstico hinchado.',
  },
  {
    n: '02',
    title: 'Diseñamos una solución sencilla',
    body: 'Propongo el alcance mínimo que resuelve el problema. Si algo no aporta, no se construye.',
  },
  {
    n: '03',
    title: 'La construyo y conecto',
    body: 'Diseño, desarrollo e integro yo. No hay un relevo a otro equipo ni un comercial en medio.',
  },
  {
    n: '04',
    title: 'Probamos con situaciones reales',
    body: 'Revisamos el flujo con casos de tu día a día: un pedido, una cita, un cliente impaciente. Corregimos antes de publicar.',
  },
  {
    n: '05',
    title: 'La publico y mantengo',
    body: 'Lanzamos con calma y, si lo quieres, sigo cerca para ajustar y hacer crecer la solución.',
  },
] as const;

export const faqs = [
  {
    q: '¿Trabajas solo con empresas pequeñas?',
    a: 'Trabajo principalmente con autónomos y pequeñas empresas. Si tu proyecto encaja con un trato directo y una solución a medida, podemos hablarlo. No pretendo cubrir cuentas que necesitan un equipo grande.',
  },
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'Depende del problema, del alcance y de lo que no haga falta construir. No publico precios cerrados: cuando entiendo lo que necesitas, te envío una propuesta personalizada. Así evito tarifas genéricas que no se ajustan.',
  },
  {
    q: '¿Hay que pagar mantenimiento?',
    a: 'No es obligatorio. Después del lanzamiento puedes continuar por tu cuenta. Si prefieres que yo vigile, actualice y evolucione la solución, lo acordamos aparte, con el alcance por escrito.',
  },
  {
    q: '¿Puedo empezar solo con una web?',
    a: 'Sí. Muchos proyectos empiezan por una web clara y, más adelante, añaden reservas, automatizaciones o una aplicación. No hay que hacerlo todo el primer día.',
  },
  {
    q: '¿Desarrollas aplicaciones para iPhone y Android?',
    a: 'Sí. Puedo crear aplicaciones para iOS y Android. Cuando una web instalable cubre mejor el caso, también lo planteo. Te diré cuál tiene más sentido antes de construir.',
  },
  {
    q: '¿Puedes conectar las herramientas que ya utilizo?',
    a: 'Sí, siempre que esas herramientas permitan integrarse de forma razonable. Lo revisamos en el análisis inicial para no prometer un encaje que no existe.',
  },
  {
    q: '¿Qué ocurre después del lanzamiento?',
    a: 'Te dejo la solución funcionando, con los accesos y las indicaciones necesarias. Si lo acordamos, sigo disponible para mantenimiento y cambios. Hablas conmigo, no con una cola de tickets anónima.',
  },
  {
    q: '¿Quién es propietario del dominio y de los datos?',
    a: 'Tú. El dominio, las cuentas y los datos de tu negocio deben estar a tu nombre. Yo no necesito ser titular para diseñar, publicar o mantener la solución. Si en algún momento trato datos de tus clientes, lo dejamos documentado.',
  },
] as const;
