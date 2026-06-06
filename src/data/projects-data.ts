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
      es: 'Una plataforma que acerca el turismo auténtico a los rincones menos conocidos de España',
      en: 'A platform that brings authentic tourism to the lesser-known corners of Spain'
    },
    description: {
      es: 'Waykout es una plataforma de turismo colaborativo para descubrir y reservar experiencias locales auténticas en la Región de Murcia. Diseño de producto y MVP por Alex Salmerón.',
      en: 'Waykout is a collaborative tourism platform to discover and book authentic local experiences in the Region of Murcia, Spain. Product design and MVP by Alex Salmerón.'
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
  }
];
