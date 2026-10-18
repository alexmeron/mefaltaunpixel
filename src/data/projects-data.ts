export interface ProjectContent {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  intro: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  blocks: {
    type: 'image' | 'text' | 'image-grid' | 'quote';
    content?: {
      es: string;
      en: string;
    };
    images?: string[];
    title?: {
      es: string;
      en: string;
    };
    subtitle?: {
      es: string;
      en: string;
    };
  }[];
}

export const PROJECTS_DATA: ProjectContent[] = [
  {
    id: 'waykout',
    title: 'Waykout',
    category: 'Product Design / MVP',
    year: '2025',
    role: 'Product Designer',
    intro: {
      es: 'Rediseñando la forma en que los viajeros descubren destinos auténticos en España.',
      en: 'Redesigning the way travelers discover authentic destinations in Spain.'
    },
    description: {
      es: 'Waykout es una plataforma de turismo colaborativo para descubrir y reservar experiencias locales auténticas en la Región de Murcia. Diseño de producto y MVP por Álex Salmerón.',
      en: 'Waykout is a collaborative tourism platform to discover and book authentic local experiences in the Region of Murcia, Spain. Product design and MVP by Álex Salmerón.'
    },
    blocks: [
      {
        type: 'image',
        images: ['placeholder-hero']
      },
      {
        type: 'text',
        title: { es: 'El Contexto', en: 'The Context' },
        content: {
          es: 'En un mercado saturado de herramientas de gestión de flotas complejas y fragmentadas, el cliente necesitaba una solución que centralizara todas las operaciones bajo una experiencia de usuario fluida y coherente.',
          en: 'In a market saturated with complex and fragmented fleet management tools, the client needed a solution that centralized all operations under a smooth and consistent user experience.'
        }
      },
      {
        type: 'image-grid',
        images: ['placeholder-1', 'placeholder-2']
      },
      {
        type: 'text',
        title: { es: 'Investigación y Hallazgos', en: 'Research & Insights' },
        subtitle: { es: 'Entendiendo al usuario final', en: 'Understanding the end user' },
        content: {
          es: 'Realizamos entrevistas con gestores de logística y conductores para identificar puntos de fricción. Descubrimos que el 60% del tiempo se perdía en la interpretación de informes de telemetría poco claros.',
          en: 'We conducted interviews with logistics managers and drivers to identify friction points. We discovered that 60% of time was wasted interpreting unclear telemetry reports.'
        }
      },
      {
        type: 'quote',
        content: {
          es: '"Necesitamos ver el estado de nuestra flota en segundos, no minutos."',
          en: '"We need to see the status of our fleet in seconds, not minutes."'
        }
      },
      {
        type: 'text',
        title: { es: 'Sistemas de Diseño', en: 'Design Systems' },
        subtitle: { es: 'Escalabilidad y consistencia', en: 'Scalability & Consistency' },
        content: {
          es: 'Creamos una biblioteca de componentes robusta en Figma, permitiendo al equipo de desarrollo implementar nuevas funcionalidades con una velocidad un 30% superior, manteniendo siempre la integridad de la marca.',
          en: 'We created a robust component library in Figma, allowing the development team to implement new features 30% faster while maintaining brand integrity.'
        }
      },
      {
        type: 'image',
        images: ['placeholder-ds']
      },
      {
        type: 'text',
        title: { es: 'La Solución Final', en: 'The Final Solution' },
        content: {
          es: 'El resultado es un ecosistema digital que no solo gestiona vehículos, sino que optimiza rutas dinámicamente y ofrece análisis predictivos mediante una interfaz limpia y centrada en los datos críticos.',
          en: 'The result is a digital ecosystem that not only manages vehicles but dynamically optimizes routes and offers predictive analytics through a clean interface focused on critical data.'
        }
      },
      {
        type: 'image-grid',
        images: ['placeholder-final-1', 'placeholder-final-2']
      }
    ]
  },
  {
    id: 'animal-rescue',
    title: 'Ayuda Incendios Madrid y Ávila 2025',
    category: 'Side Project / AI & Product Design',
    year: '2025',
    role: 'Product Designer & Maker',
    intro: {
      es: '¿Cómo conectar rápidamente una necesidad con la ayuda disponible en una situación de emergencia?',
      en: 'How to quickly connect an urgent need with available help during an emergency?'
    },
    description: {
      es: 'Este proyecto transformó una red de mensajes dispersos en una plataforma que facilitaba el encuentro entre quienes ofrecen y quienes necesitan ayuda para los animales afectados por los incendios de Madrid y Ávila.',
      en: 'This project transformed a scattered network of messages into a platform that facilitated connections between those offering and those needing help for animals affected by the Madrid and Ávila wildfires.'
    },
    blocks: [
      {
        type: 'text',
        title: { es: 'El origen: conectar la ayuda', en: 'The origin: connecting help' },
        content: {
          es: 'Ante la voracidad de los incendios de Madrid y Ávila, la ayuda a los animales se coordinaba principalmente a través de grupos de WhatsApp. Allí se compartían anuncios de personas que ofrecían o necesitaban comida, traslados urgentes, rescates o acogidas para animales domésticos, salvajes y de granja. Encontrar ayuda dependía de que alguien del grupo pudiera responder a una petición o conectar manualmente una oferta con una necesidad cercana.\n\nPara agilizar este proceso, un voluntario creó en pocas horas una web donde publicar estos anuncios (incendio.sepv.es). Un día después, me sumé a la iniciativa para ayudar a conectar ambas partes y convertir aquel flujo de mensajes dispersos en un sistema más directo: un «Tinder de ayuda».',
          en: 'In the face of the raging wildfires in Madrid and Ávila, animal aid was initially coordinated mainly through WhatsApp groups. People shared posts offering or requesting food, emergency transport, rescues, or temporary shelter for domestic, wild, and farm animals. Finding help depended on someone in the group noticing a request or manually connecting an offer with a nearby need.\n\nTo streamline this process, a volunteer created a website within hours to publish these listings (incendio.sepv.es). A day later, I joined the initiative to help connect both sides and turn that scattered stream of messages into a more direct system: a "Help Tinder".'
        }
      },
      {
        type: 'text',
        title: { es: 'El flujo, la IA y la solidaridad', en: 'The flow, AI & solidarity' },
        subtitle: { es: 'Casi 3.000 anuncios y más de 140 avisos solventados', en: 'Nearly 3,000 aid offers and 140+ cases resolved' },
        content: {
          es: 'Un proyecto sumó al otro. El flujo funcionó, la IA funcionó y la solidaridad de la gente también. El sistema estructuraba los avisos y notificaba al instante ante cada coincidencia con voluntarios cercanos.',
          en: 'One project empowered the other. The flow worked, the AI worked, and community solidarity delivered. The system structured alerts and notified volunteers upon each match.'
        }
      }
    ]
  },
  {
    id: 'gaztelugatxe-tracker',
    title: 'Gaztelugatxe Tickets Tracker',
    category: 'Side Project / Automation & Product Design',
    year: '2025',
    role: 'Product Designer & Developer',
    intro: {
      es: 'Rastreo y automatización de reservas en tiempo real ante cancelaciones en San Juan de Gaztelugatxe.',
      en: 'Real-time ticket tracking and automated booking for San Juan de Gaztelugatxe cancellations.'
    },
    description: {
      es: 'Una aplicación web y servicio automatizado que monitoriza en tiempo real la liberación de plazas por cancelaciones en el sistema oficial de reservas de San Juan de Gaztelugatxe. Dispara alertas sonoras y notificaciones al móvil y, tras la confirmación del usuario, autocompleta el formulario oficial para asegurar las entradas.',
      en: 'A web app and automated service monitoring real-time slot releases caused by cancellations at San Juan de Gaztelugatxe, triggering instant notifications and automating booking upon user confirmation.'
    },
    blocks: [
      {
        type: 'text',
        title: { es: 'El Origen del Proyecto', en: 'How it Started' },
        content: {
          es: 'Durante un viaje al País Vasco, conseguir entradas para visitar San Juan de Gaztelugatxe era prácticamente imposible debido a la alta demanda y al aforo limitado. Al constatar que el sistema oficial liberaba plazas de forma impredecible cuando otros viajeros cancelaban, decidí construir un vigilante automatizado capaz de monitorizar fechas y tramos horarios concretos de forma desatendida.',
          en: 'During a trip to the Basque Country, booking tickets for San Juan de Gaztelugatxe was virtually impossible due to limited capacity and high demand. Discovering that the booking engine released slots randomly whenever cancellations occurred, I built an automated watcher to monitor specific dates and time windows unattended.'
        }
      },
      {
        type: 'text',
        title: { es: 'La Solución Técnica y de Experiencia', en: 'Technical & UX Solution' },
        subtitle: { es: 'De la alerta a la reserva en cuestión de segundos', en: 'From notification to confirmed pass in seconds' },
        content: {
          es: 'El sistema consulta periódicamente el endpoint de reservas respetando las políticas de uso, emite alertas sonoras y notificaciones push al móvil vía ntfy en el milisegundo en que se abre un cupo, y permite al usuario confirmar la reserva en un solo clic, inyectando los datos de los visitantes y enviando la solicitud antes de que las plazas se agoten de nuevo.',
          en: 'The system periodically polls the booking endpoint with polite rate-limiting, emits audio alerts and mobile push notifications via ntfy the moment an opening occurs, and allows single-click user confirmation, injecting visitor credentials and submitting the request before tickets disappear.'
        }
      },
      {
        type: 'quote',
        content: {
          es: '"Conseguí las entradas para mi visita y, tras compartir la historia en LinkedIn, la herramienta ayudó a otras personas a conseguir sus pases para visitar el islote."',
          en: '"I secured my tickets, and after sharing the journey on LinkedIn, the tool helped several other travelers secure their passes as well."'
        }
      }
    ]
  }
];

