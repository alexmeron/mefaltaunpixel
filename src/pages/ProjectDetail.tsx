import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects-data';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { ProjectLightbox, type LightboxScreen } from '../components/ProjectLightbox';

interface CaseStudyScreen {
  number: string;
  tag: { es: string; en: string };
  title: { es: string; en: string };
  desc: { es: string; en: string };
  url: string;
  src: string;
  alt: string;
}

interface CaseStudyMetric {
  numEs: string;
  numEn: string;
  lblEs: string;
  lblEn: string;
}

interface CaseStudyData {
  id: string;
  seoTitle: string;
  seoDesc: string;
  title: string;
  logoNode?: React.ReactNode;
  lead: { es: string; en: string };
  body: { es: string; en: string };
  meta: {
    category: string;
    year: string;
    role: string;
    externalLink?: {
      href: string;
      label: { es: string; en: string };
    };
  };
  twoCol: Array<{
    heading: { es: string; en: string };
    text: { es: string; en: string };
  }>;
  showcaseScreens: CaseStudyScreen[];
  results?: {
    heading: { es: string; en: string };
    body: { es: string; en: string };
    metrics: CaseStudyMetric[];
  };
}

const CASE_STUDIES: Record<string, CaseStudyData> = {
  waykout: {
    id: 'waykout',
    seoTitle: 'Waykout | Product Design Project by Álex Salmerón',
    seoDesc: 'Waykout is a collaborative tourism platform to discover and book authentic local experiences in the Region of Murcia, Spain. Product design and MVP by Álex Salmerón.',
    title: 'Waykout',
    logoNode: (
      <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="waykout-logo">
        <rect width="512" height="512" fill="#F6085A"/>
        <path d="M219.959 354.244H288.509C310.302 354.244 327.97 371.912 327.97 393.704V400.562L327.957 401.58C327.417 422.903 309.962 440.02 288.509 440.02H219.959C198.166 440.02 180.498 422.355 180.498 400.562V393.704L180.511 392.69C181.042 371.704 197.955 354.79 218.939 354.257L219.959 354.244ZM219.167 378.348C211.043 378.761 204.583 385.478 204.583 393.704V400.562L204.602 401.353C205.015 409.48 211.732 415.938 219.959 415.938H288.509C297.001 415.938 303.887 409.056 303.889 400.562V393.704L303.869 392.913C303.456 384.788 296.736 378.329 288.509 378.329H219.959L219.167 378.348Z" fill="white"/>
        <path d="M255.588 85.9156C325.174 85.9156 380.739 140.165 380.739 206.06C380.738 271.955 325.174 326.205 255.588 326.205C186.002 326.205 130.438 271.955 130.438 206.06C130.438 140.165 186.002 85.9156 255.588 85.9156Z" stroke="white" strokeWidth="26.6988"/>
        <path d="M255.588 90.9218C270.063 90.922 284.934 101.612 296.667 122.789C308.241 143.678 315.661 173.103 315.661 206.06C315.661 239.017 308.241 268.441 296.667 289.331C284.934 310.508 270.063 321.198 255.588 321.198C241.113 321.198 226.242 310.508 214.509 289.331C202.935 268.441 195.516 239.017 195.516 206.06C195.516 173.103 202.935 143.678 214.509 122.789C226.242 101.612 241.113 90.9218 255.588 90.9218Z" stroke="white" strokeWidth="16.6867"/>
      </svg>
    ),
    lead: {
      es: 'Rediseñando la forma en que los viajeros descubren destinos auténticos en España',
      en: 'Redesigning the way travelers discover authentic destinations in Spain',
    },
    body: {
      es: 'Waykout es una plataforma de turismo colaborativo diseñada para conectar a viajeros que buscan descubrir la España real con anfitriones locales que ofrecen experiencias culturales, gastronómicas y de naturaleza auténticas.',
      en: 'Waykout is a collaborative tourism platform designed to connect travelers looking to discover the real Spain with local hosts offering authentic cultural, gastronomic, and nature experiences.',
    },
    meta: {
      category: 'Product Design / MVP',
      year: '2025',
      role: 'Product Designer',
      externalLink: {
        href: 'https://www.waykout.com',
        label: { es: 'Visitar waykout.com', en: 'Visit waykout.com' },
      },
    },
    twoCol: [
      {
        heading: { es: 'Mi rol', en: 'My role' },
        text: {
          es: 'Waykout es mi side-project. Como cofundador, mi trabajo abarcó desde la validación inicial de la idea hasta el diseño completo del producto final. Lanzamos campañas en Instagram y Google Ads para medir demanda real antes de escribir código. Con los datos obtenidos prototipé y testé wireframes en ciclos iterativos con early adopters reales en la Región de Murcia. Diseñé los flujos principales y las herramientas internas para anfitriones, y desarrollé el sistema visual completo y el UI Kit.',
          en: 'Waykout is my side-project. As co-founder, my work spanned from initial idea validation to the complete design of the final product. We launched campaigns on Instagram and Google Ads to measure real demand before writing code. I prototyped and tested wireframes in iterative cycles with real early adopters in the Region of Murcia. I designed the main user flows, internal host tools, the full visual system, and UI Kit.',
        },
      },
      {
        heading: { es: 'El diseño', en: 'The design' },
        text: {
          es: 'El diseño de Waykout se centró en eliminar barreras de entrada en un sector poco digitalizado. Eliminamos la contraseña tradicional sustituyéndola por magic links para reducir el abandono. Para los anfitriones, una interfaz asistida por IA genera automáticamente títulos y descripciones optimizadas a partir de una breve descripción. El UI Kit en Figma garantiza consistencia visual en tarjetas, estados y componentes esenciales.',
          en: "Waykout's design focused on removing barriers in a low-digitized sector. We replaced traditional passwords with magic links to reduce drop-off. For hosts, an AI-assisted interface automatically generates optimized titles and descriptions from a brief input. The Figma UI Kit ensures visual consistency across cards, states, and essential components.",
        },
      },
    ],
    showcaseScreens: [
      {
        number: '01',
        tag: { es: 'Marketplace · Home', en: 'Marketplace · Home' },
        title: {
          es: 'Descubrimiento y catálogo principal de experiencias',
          en: 'Discovery and primary experience catalog',
        },
        desc: {
          es: 'Diseño de la experiencia de aterrizaje orientada a conectar a viajeros con actividades locales auténticas. Buscador por destino, propuestas recomendadas y navegación clara por categorías.',
          en: 'Landing experience designed to connect travelers with authentic local activities. Features destination search, recommended picks, and intuitive category browsing.',
        },
        url: 'waykout.com',
        src: '/wayk-mages/5.png',
        alt: 'Waykout Marketplace Homepage',
      },
      {
        number: '02',
        tag: { es: 'Búsqueda y Exploración', en: 'Search & Filtering' },
        title: {
          es: 'Catálogo de resultados y filtros temáticos',
          en: 'Experience catalog and thematic filtering',
        },
        desc: {
          es: 'Visualización en cuadrícula con tarjetas de alto impacto visual, información esencial a primera vista (precios, duración, valoraciones verificadas) y filtros ágiles de selección.',
          en: 'High-impact grid view with essential details at a glance (prices, duration, verified ratings) and responsive faceted filtering.',
        },
        url: 'waykout.com/experiencias/murcia',
        src: '/wayk-mages/2.png',
        alt: 'Waykout Catalog and Filters',
      },
      {
        number: '03',
        tag: { es: 'Conversión · Ficha de Producto', en: 'Conversion · Product Detail' },
        title: {
          es: 'Ficha de experiencia y reserva directa',
          en: 'Experience detail and direct reservation',
        },
        desc: {
          es: 'Arquitectura centrada en despejar dudas y generar confianza: galería fotográfica inmersiva, desglose claro del itinerario, perfil del anfitrión verificado, mapa interactivo y módulo de reserva con cálculo de precio en tiempo real.',
          en: 'Conversion-centered architecture built on trust: rich photo gallery, transparent itinerary breakdown, verified host profile, map integration, and instant booking module with real-time pricing.',
        },
        url: 'waykout.com/experiencia/senderismo-moratalla',
        src: '/wayk-mages/3.png',
        alt: 'Waykout Experience Detail',
      },
      {
        number: '04',
        tag: { es: 'Cuenta de Usuario · Gestión', en: 'User Account · Management' },
        title: {
          es: 'Gestión de perfil y reservas del usuario',
          en: 'User profile and bookings management',
        },
        desc: {
          es: 'Área personal intuitiva para consultar reservas activas, historial de actividades realizadas, datos de facturación y preferencias de contacto.',
          en: 'Intuitive user hub to manage active bookings, past experiences, verified credentials, and communication preferences.',
        },
        url: 'waykout.com/cuenta/perfil',
        src: '/wayk-mages/7.png',
        alt: 'Waykout User Profile',
      },
      {
        number: '05',
        tag: { es: 'Captación · Anfitriones', en: 'Host Portal · Supply Side' },
        title: {
          es: 'Portal de anfitriones y proceso de publicación',
          en: 'Host portal and guided listing flow',
        },
        desc: {
          es: 'Proceso de alta guiado pensado para anfitriones tradicionales no familiarizados con herramientas digitales. Incluye propuesta de valor clara, calculadora de ingresos y soporte asistido para publicar experiencias.',
          en: 'Guided onboarding designed for non-digital native hosts. Features transparent value propositions, earnings guidance, and step-by-step publishing assistance.',
        },
        url: 'waykout.com/publica-experiencia',
        src: '/wayk-mages/4.png',
        alt: 'Waykout Host Portal',
      },
      {
        number: '06',
        tag: { es: 'User Flow · Autenticación', en: 'User Flow · Authentication' },
        title: {
          es: 'Onboarding sin contraseñas: Flujo Magic Links',
          en: 'Passwordless onboarding: Magic Links Flow',
        },
        desc: {
          es: 'Para evitar el abandono en el checkout, rediseñamos el registro tradicional eliminando la fricción de recordar contraseñas. Un flujo de Magic Link y login social en pocos pasos garantiza una entrada limpia y segura.',
          en: 'To eliminate drop-off at checkout, we removed traditional passwords. A streamlined Magic Link and OAuth flow enables quick, frictionless signups and instant access.',
        },
        url: 'waykout.com/auth/flow',
        src: '/wayk-mages/1.png',
        alt: 'Waykout User Flow and Auth',
      },
      {
        number: '07',
        tag: { es: 'Design System · Tokens', en: 'Design System · UI Tokens' },
        title: {
          es: 'Sistema de diseño y tokens semánticos',
          en: 'Design system and semantic tokens',
        },
        desc: {
          es: 'Biblioteca modular en Figma estructurada con tokens semánticos para feedback, estados del sistema, alertas y componentes reutilizables, asegurando paridad visual entre diseño y frontend.',
          en: 'Modular Figma library structured with semantic tokens for system states, feedback alerts, and reusable components, ensuring total visual parity between design and code.',
        },
        url: 'figma.com/@waykout/design-system',
        src: '/wayk-mages/6.png',
        alt: 'Waykout Design System and UI Tokens',
      },
    ],
    results: {
      heading: { es: 'Resultados', en: 'Results' },
      body: {
        es: 'Todo esto en el primer mes tras el lanzamiento del MVP, arrancando únicamente en la Región de Murcia y con una inversión controlada en campañas de validación.',
        en: 'All this in the first month following the MVP launch, starting exclusively in the Region of Murcia with a controlled investment in validation campaigns.',
      },
      metrics: [
        { numEs: '+100 usuarios', numEn: '+100 users', lblEs: 'el primer mes', lblEn: 'the first month' },
        { numEs: '50 anfitriones', numEn: '50 hosts', lblEs: 'activos', lblEn: 'active' },
        { numEs: '+50 experiencias', numEn: '+50 experiences', lblEs: 'publicadas', lblEn: 'published' },
        { numEs: '+120 reservas', numEn: '+120 bookings', lblEs: 'realizadas', lblEn: 'completed' },
      ],
    },
  },

  'gaztelugatxe-tracker': {
    id: 'gaztelugatxe-tracker',
    seoTitle: 'Gaztelugatxe Tickets Tracker | Automation Case Study by Álex Salmerón',
    seoDesc: 'Rastreador y automatizador de reservas para San Juan de Gaztelugatxe ante cancelaciones en tiempo real. Side project por Álex Salmerón.',
    title: 'Gaztelugatxe Tickets Tracker',
    logoNode: (
      <div className="w-14 h-14 rounded-2xl bg-[#4F46E5] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
          <path d="M13 5v2"/>
          <path d="M13 17v2"/>
          <path d="M13 11v2"/>
        </svg>
      </div>
    ),
    lead: {
      es: 'Rastreo y automatización de reservas de entradas ante cancelaciones en San Juan de Gaztelugatxe',
      en: 'Real-time ticket tracking and automated booking for San Juan de Gaztelugatxe cancellations',
    },
    body: {
      es: 'Una aplicación web y bot autónomo diseñado para monitorizar en tiempo real la liberación de plazas por cancelación en el sistema oficial de reservas de San Juan de Gaztelugatxe, disparando alertas sonoras e instantáneas al móvil y autocompletando la reserva en segundos.',
      en: 'A web app and automated assistant designed to monitor real-time ticket releases from cancellations at San Juan de Gaztelugatxe, firing audio and mobile alerts and completing bookings in seconds.',
    },
    meta: {
      category: 'Side Project / Automation & Product Design',
      year: '2025',
      role: 'Product Designer & Developer',
    },
    twoCol: [
      {
        heading: { es: 'El origen de la idea', en: 'The origin' },
        text: {
          es: 'El pasado verano viajé a Euskadi y quería visitar San Juan de Gaztelugatxe, pero me quedé sin entradas por no reservarlas con semanas de antelación. Como me confirmaron que iban liberando entradas puntuales si había cancelaciones de otros viajeros, decidí construir un rastreador en lugar de pasar horas refrescando la página manualmente.',
          en: 'Last summer I traveled to the Basque Country wanting to visit San Juan de Gaztelugatxe, but missed out on passes due to high demand. After learning that tickets were released when other visitors cancelled, I built an automated watcher instead of refreshing the booking page manually for hours.',
        },
      },
      {
        heading: { es: 'La automatización y el flujo', en: 'Automation & UX flow' },
        text: {
          es: 'Construí una solución a la que definí fechas y tramos horarios objetivo. El vigilante consulta periódicamente el sistema de reservas respetando las políticas de acceso y, en cuanto detecta una plaza libre, dispara una alarma sonora y una notificación push al móvil. Con un solo clic de confirmación, autocompleta el formulario oficial con mis datos y envía la reserva en milisegundos.',
          en: 'I built a tool configured with target dates and timeframes. The watcher polls the booking engine responsibly, and as soon as a slot opens, emits audio and mobile push alerts. With a single tap, it populates the official reservation form with my credentials and submits it in milliseconds.',
        },
      },
    ],
    showcaseScreens: [
      {
        number: '01',
        tag: { es: 'Vigilante Web · Monitorización', en: 'Web Watcher · Real-time Polling' },
        title: {
          es: 'Panel local con estado del sistema y logs en vivo',
          en: 'Local dashboard with system status and live logs',
        },
        desc: {
          es: 'Interfaz visual con cuenta atrás de comprobación, selector de fechas deseadas, estado de disponibilidad en tiempo real y registro continuo de consultas.',
          en: 'Visual interface showing polling countdown, desired dates selector, real-time ticket availability, and continuous event log.',
        },
        url: '127.0.0.1:5000/gaztelugatxe',
        src: '/resources-images/gaztelugatxe-monitor.png',
        alt: 'Gaztelugatxe Tickets Tracker Dashboard y Logs',
      },
    ],
    results: {
      heading: { es: 'Resultados y Validación en Comunidad', en: 'Results & Community Validation' },
      body: {
        es: 'Spoiler: Conseguí las entradas para mi visita. Y no solo para mí: tras compartir la experiencia en LinkedIn, varias personas me pidieron ayuda para conseguir tickets para sus viajes y el sistema funcionó a la perfección con todas ellas.',
        en: 'Spoiler: I got the tickets for my visit. And not just for me: after sharing the project on LinkedIn, several travelers reached out asking for help getting passes for their own trips, and the tracker worked flawlessly for them too.',
      },
      metrics: [
        { numEs: '100% éxito', numEn: '100% success', lblEs: 'en reservas conseguidas', lblEn: 'tickets booked' },
        { numEs: 'LinkedIn', numEn: 'LinkedIn', lblEs: 'viralización y peticiones', lblEn: 'shared & requested' },
        { numEs: '< 2 seg', numEn: '< 2 sec', lblEs: 'de detección a reserva', lblEn: 'detection to booking' },
        { numEs: '0 fricción', numEn: '0 friction', lblEs: 'formulario automatizado', lblEn: 'automated checkout' },
      ],
    },
  },

  'animal-rescue': {
    id: 'animal-rescue',
    seoTitle: 'Ayuda Incendios Madrid y Ávila 2025 | Case Study por Álex Salmerón',
    seoDesc: 'Plataforma con IA nacida durante los incendios de Madrid y Ávila 2025 para emparejar casos de rescate animal y personas voluntarias por cercanía y necesidad.',
    title: 'Ayuda Incendios Madrid y Ávila 2025',
    lead: {
      es: '¿Cómo conectar rápidamente una necesidad con la ayuda disponible en una situación de emergencia?',
      en: 'How to quickly connect an urgent need with available help during an emergency?',
    },
    body: {
      es: 'Este proyecto transformó una red de mensajes dispersos en una plataforma que facilitaba el encuentro entre quienes ofrecen y quienes necesitan ayuda para los animales afectados por los incendios de Madrid y Ávila.',
      en: 'This project transformed a scattered network of messages into a platform that facilitated connections between those offering and those needing help for animals affected by the Madrid and Ávila wildfires.',
    },
    meta: {
      category: 'Side Project / AI & Product Design',
      year: '2025',
      role: 'Product Designer & Maker',
    },
    twoCol: [
      {
        heading: { es: 'El origen: conectar la ayuda', en: 'The origin: connecting help' },
        text: {
          es: 'Ante la voracidad de los incendios de Madrid y Ávila, la ayuda a los animales se coordinaba principalmente a través de grupos de WhatsApp. Allí se compartían anuncios de personas que ofrecían o necesitaban comida, traslados urgentes, rescates o acogidas para animales domésticos, salvajes y de granja. Encontrar ayuda dependía de que alguien del grupo pudiera responder a una petición o conectar manualmente una oferta con una necesidad cercana.\n\nPara agilizar este proceso, un voluntario creó en pocas horas una web donde publicar estos anuncios (incendio.sepv.es). Un día después, me sumé a la iniciativa para ayudar a conectar ambas partes y convertir aquel flujo de mensajes dispersos en un sistema más directo: un «Tinder de ayuda».',
          en: 'In the face of the raging wildfires in Madrid and Ávila, animal aid was initially coordinated mainly through WhatsApp groups. People shared posts offering or requesting food, emergency transport, rescues, or temporary shelter for domestic, wild, and farm animals. Finding help depended on someone in the group noticing a request or manually connecting an offer with a nearby need.\n\nTo streamline this process, a volunteer created a website within hours to publish these listings (incendio.sepv.es). A day later, I joined the initiative to help connect both sides and turn that scattered stream of messages into a more direct system: a "Help Tinder".',
        },
      },
      {
        heading: { es: 'El flujo, la IA y la solidaridad', en: 'The flow, AI & solidarity' },
        text: {
          es: 'Un proyecto sumó al otro. El flujo funcionó, la IA funcionó y la solidaridad de la gente también. El sistema procesaba los avisos, identificaba los requisitos clave y calculaba la cercanía con los voluntarios disponibles, disparando una notificación instantánea a ambas partes en cuanto se producía el match para coordinar la ayuda de inmediato.',
          en: 'One project empowered the other. The flow worked, the AI worked, and community solidarity delivered. The system parsed posts, extracted key requirements, and computed distance to available volunteers, firing instant notifications to both parties the second a match occurred.',
        },
      },
    ],
    showcaseScreens: [
      {
        number: '01',
        tag: { es: 'Monitor Global · Filtrado Multiespecie', en: 'Global Monitor · Multi-species Filtering' },
        title: {
          es: 'Listado centralizado de avisos con filtros por urgencia y especie',
          en: 'Centralized alert hub with urgency and species filters',
        },
        desc: {
          es: 'Monitor en vivo para rastrear y clasificar cientos de peticiones de auxilio y ofertas de ayuda (perros, gatos, caballos, ganado, aves, forraje, veterinaria y traslados urgentes).',
          en: 'Live monitor tracking and categorizing hundreds of emergency calls and aid offers (dogs, cats, horses, livestock, birds, feed, veterinary care, and urgent transit).',
        },
        url: 'incendio.sepv.es/monitor',
        src: '/resources-images/animales-incendios-monitor-grid.png',
        alt: 'Ayuda Incendios Madrid y Ávila 2025 - Monitor general y filtros multiespecie',
      },
      {
        number: '02',
        tag: { es: 'Matching Inteligente · Cercanía Geográfica', en: 'Smart Matching · Geographic Proximity' },
        title: {
          es: 'Emparejamiento automático por afinidad y cálculo de distancia real',
          en: 'Automated matching by affinity and real-distance calculation',
        },
        desc: {
          es: 'Algoritmo que calcula la distancia en kilómetros y el porcentaje de coincidencia entre cada necesidad y los voluntarios cercanos disponibles, con botones directos para llamada y WhatsApp.',
          en: 'Algorithm calculating distance in kilometers and match score between each need and available local volunteers, offering direct call and WhatsApp actions.',
        },
        url: 'incendio.sepv.es/match',
        src: '/resources-images/animales-incendios-matching-cards.png',
        alt: 'Ayuda Incendios Madrid y Ávila 2025 - Tarjetas de matching y cercanía en km',
      },
      {
        number: '03',
        tag: { es: 'Cruces de Ayuda · Modal de Afinidad', en: 'Aid Matches · Affinity Modal' },
        title: {
          es: 'Peticiones compatibles ordenadas para cada oferta voluntaria',
          en: 'Ranked compatible requests for each volunteer offer',
        },
        desc: {
          es: 'Ventana de cruces para personas que ofrecían acogida, transporte o alimento, mostrando de forma priorizada qué casos concretos encajaban mejor con su disponibilidad.',
          en: 'Matching view for volunteers offering foster homes, transport, or supplies, displaying ranked cases that matched their availability and location.',
        },
        url: 'incendio.sepv.es/cruces',
        src: '/resources-images/animales-incendios-modal-matching.png',
        alt: 'Ayuda Incendios Madrid y Ávila 2025 - Modal de peticiones compatibles para voluntarios',
      },
      {
        number: '04',
        tag: { es: 'Geolocalización · Mapa Interactivo en Vivo', en: 'Geolocation · Live Interactive Map' },
        title: {
          es: 'Mapa interactivo con capas de incidencias SOS y recursos de apoyo',
          en: 'Interactive map with SOS emergency layers and support resources',
        },
        desc: {
          es: 'Visualización territorial de avisos activos y puntos de ayuda solidaria en Madrid y Ávila, con trazado de cruces, alertas geolocalizadas y filtros temáticos rápidos.',
          en: 'Spatial visualization of active alerts and solidarity hubs across Madrid and Ávila, showing connection vectors, geolocated pins, and instant category filters.',
        },
        url: 'incendio.sepv.es/mapa',
        src: '/resources-images/animales-incendios-mapa-interactivo.png',
        alt: 'Ayuda Incendios Madrid y Ávila 2025 - Mapa interactivo y cruces territoriales',
      },
      {
        number: '05',
        tag: { es: 'Panel de Control · Coordinación de Casos', en: 'Control Panel · Case Coordination' },
        title: {
          es: 'Gestión de anuncios, asignación de seguimiento y resolución en tiempo real',
          en: 'Listing management, follow-up assignment, and real-time resolution',
        },
        desc: {
          es: 'Panel interno para validar notificaciones, asignar coordinadores al seguimiento directo de cada caso y marcar avisos como resueltos para mantener los datos limpios y útiles.',
          en: 'Internal dashboard to verify notifications, assign coordinators to track cases, and mark emergencies as resolved to keep data actionable and fresh.',
        },
        url: 'incendio.sepv.es/admin',
        src: '/resources-images/animales-incendios-admin-gestion.png',
        alt: 'Ayuda Incendios Madrid y Ávila 2025 - Gestor de anuncios y resueltos',
      },
    ],
    results: {
      heading: { es: 'Impacto Real y Solidaridad', en: 'Real-World Impact & Solidarity' },
      body: {
        es: 'Casi 3.000 anuncios ofreciendo ayuda y más de 140 avisos de emergencia solventados. Muchos animales rescatados y mucha ayuda fluyendo... Es bonito. Solo eso :)',
        en: 'Nearly 3,000 aid offers and over 140 emergency cases resolved. Many animals rescued and vital help flowing... Just beautiful. Exactly that :)',
      },
      metrics: [
        { numEs: 'Casi 3.000', numEn: '~3,000', lblEs: 'anuncios de ayuda ofrecida', lblEn: 'aid offers posted' },
        { numEs: '+140', numEn: '+140', lblEs: 'avisos solventados', lblEn: 'emergencies resolved' },
        { numEs: 'Madrid & Ávila', numEn: 'Madrid & Ávila', lblEs: 'cobertura en incendios', lblEn: 'wildfire areas' },
        { numEs: 'Multiespecie', numEn: 'Multi-species', lblEs: 'domésticos, salvajes y granja', lblEn: 'domestic, wild & farm' },
      ],
    },
  },
};

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // If defined in detailed CASE_STUDIES, render the unified full case study format
  const caseStudy = id ? CASE_STUDIES[id] : null;

  // Fallback to PROJECTS_DATA if not in CASE_STUDIES
  const projectFallback = PROJECTS_DATA.find((p) => p.id === id);

  if (!caseStudy && !projectFallback) {
    return (
      <div className="project-not-found page-wrapper">
        <div className="site-container pt-32 text-center">
          <h2 className="text-2xl font-serif text-text-primary">
            {language === 'es' ? 'Proyecto no encontrado' : 'Project not found'}
          </h2>
          <Link to="/projects" className="inline-block mt-6 text-sm text-text-secondary hover:underline">
            {language === 'es' ? '← Volver a proyectos' : '← Back to projects'}
          </Link>
        </div>
      </div>
    );
  }

  // Construct active data (either rich caseStudy or fallback generated data)
  const activeData: CaseStudyData = caseStudy || {
    id: projectFallback!.id,
    seoTitle: `${projectFallback!.title} | Álex Salmerón`,
    seoDesc: projectFallback!.description[language],
    title: projectFallback!.title,
    lead: {
      es: projectFallback!.intro.es,
      en: projectFallback!.intro.en,
    },
    body: {
      es: projectFallback!.description.es,
      en: projectFallback!.description.en,
    },
    meta: {
      category: projectFallback!.category,
      year: projectFallback!.year,
      role: projectFallback!.role,
    },
    twoCol: projectFallback!.blocks
      .filter((b) => b.type === 'text')
      .slice(0, 2)
      .map((b) => ({
        heading: {
          es: b.title?.es || 'Contexto',
          en: b.title?.en || 'Context',
        },
        text: {
          es: b.content?.es || '',
          en: b.content?.en || '',
        },
      })),
    showcaseScreens: [],
  };

  const lightboxScreens: LightboxScreen[] = activeData.showcaseScreens.map((s) => ({
    id: s.number,
    number: s.number,
    tag: s.tag[language],
    title: s.title[language],
    desc: s.desc[language],
    url: s.url,
    src: s.src,
    alt: s.alt,
    ctaHref: activeData.meta.externalLink?.href,
    ctaText: activeData.meta.externalLink?.label[language],
  }));

  return (
    <main className="project-detail-page page-wrapper">
      <SEO title={activeData.seoTitle} description={activeData.seoDesc} />

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="waykout-hero-section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="waykout-hero-inner"
        >
          <Link to="/projects" className="waykout-back-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>{language === 'es' ? 'Volver a proyectos' : 'Back to projects'}</span>
          </Link>

          <div className="waykout-hero-title-row">
            {activeData.logoNode}
            <h1 className="waykout-title">{activeData.title}</h1>
          </div>

          <p className="waykout-lead">{activeData.lead[language]}</p>

          <p className="waykout-body">{activeData.body[language]}</p>

          {/* ── Metadata Strip ──────────────────────────────────────── */}
          <div className="waykout-meta-strip">
            <div className="waykout-meta-group">
              <div className="waykout-meta-item">
                <span className="waykout-meta-label">
                  {language === 'es' ? 'Categoría' : 'Category'}
                </span>
                <span className="waykout-meta-value">{activeData.meta.category}</span>
              </div>
              <div className="waykout-meta-item">
                <span className="waykout-meta-label">
                  {language === 'es' ? 'Año' : 'Year'}
                </span>
                <span className="waykout-meta-value">{activeData.meta.year}</span>
              </div>
              <div className="waykout-meta-item">
                <span className="waykout-meta-label">
                  {language === 'es' ? 'Rol' : 'Role'}
                </span>
                <span className="waykout-meta-value">{activeData.meta.role}</span>
              </div>
            </div>

            {activeData.meta.externalLink && (
              <div className="waykout-meta-cta">
                <a
                  href={activeData.meta.externalLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-project-link"
                >
                  <span>{activeData.meta.externalLink.label[language]}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Context & Insights Two-Column ───────────────────────────── */}
      {activeData.twoCol.length > 0 && (
        <section className="waykout-two-col">
          {activeData.twoCol.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="waykout-col"
            >
              <h3 className="waykout-col-heading">{col.heading[language]}</h3>
              <p className="waykout-col-text whitespace-pre-line">{col.text[language]}</p>
            </motion.div>
          ))}
        </section>
      )}

      {/* ── Showcase Screens ────────────────────────────────────────── */}
      {activeData.showcaseScreens.length > 0 && (
        <section className="waykout-showcase-section">
          {activeData.showcaseScreens.map((item, idx) => (
            <motion.article
              key={item.number}
              className="waykout-showcase-row"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65 }}
            >
              <div className="waykout-showcase-header">
                <div className="waykout-showcase-header-content">
                  <div className="waykout-showcase-meta">
                    <span className="waykout-showcase-num">{item.number}</span>
                    <span className="waykout-showcase-divider">/</span>
                    <span className="waykout-showcase-tag">{item.tag[language]}</span>
                  </div>
                  <h3 className="waykout-showcase-title">{item.title[language]}</h3>
                  <p className="waykout-showcase-desc">{item.desc[language]}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="waykout-view-full-btn"
                  title={language === 'es' ? 'Ver captura completa' : 'View full screenshot'}
                  aria-label={`${language === 'es' ? 'Ver completa' : 'View full'} ${item.number}: ${item.title[language]}`}
                >
                  <ArrowUpRight size={26} strokeWidth={2} />
                </button>
              </div>

              <div
                className="waykout-showcase-grey-box"
                onClick={() => setLightboxIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIndex(idx);
                  }
                }}
                aria-label={`Ampliar captura ${item.number}: ${item.title[language]}`}
              >
                <div className="waykout-showcase-cropped-card">
                  <div className="waykout-browser-bar">
                    <div className="browser-dots">
                      <span className="browser-dot dot-red"></span>
                      <span className="browser-dot dot-yellow"></span>
                      <span className="browser-dot dot-green"></span>
                    </div>
                  </div>
                  <div className="waykout-cropped-viewport">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="waykout-cropped-img"
                      loading={idx < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      )}

      {/* ── Results Section ─────────────────────────────────────────── */}
      {activeData.results && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="waykout-results"
        >
          <h3 className="waykout-results-heading">
            {activeData.results.heading[language]}
          </h3>
          <p className="waykout-results-body">
            {activeData.results.body[language]}
          </p>
          <div className="results-grid">
            {activeData.results.metrics.map((m, idx) => (
              <div key={idx} className="results-card">
                <div className="results-number">{language === 'es' ? m.numEs : m.numEn}</div>
                <div className="results-label">{language === 'es' ? m.lblEs : m.lblEn}</div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── Closing CTA ─────────────────────────────────────────────── */}
      {activeData.meta.externalLink && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="waykout-cta"
        >
          <a
            href={activeData.meta.externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-project-link"
          >
            <span>{activeData.meta.externalLink.label[language]}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </motion.div>
      )}

      <ProjectLightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        screens={lightboxScreens}
        initialIndex={lightboxIndex ?? 0}
      />
    </main>
  );
};
