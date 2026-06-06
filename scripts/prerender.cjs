const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');

// Define SEO metadata translations (matching LanguageContext.tsx and Claude's suggestions)
const SEO_DATA = {
  es: {
    home: {
      title: "Alex Salmerón - Diseñador de Producto Senior",
      desc: "Portfolio de Alex Salmerón, diseñador de producto senior en Murcia, especializado en sistemas de diseño y DesignOps. Descubre mis proyectos de diseño y herramientas para Figma."
    },
    about: {
      title: "Sobre mí | Alex Salmerón - Product Designer",
      desc: "Conoce la trayectoria de Alex Salmerón, product designer en Murcia desde 2007, especialista en Design Systems y Figma. Descubre mi biblioteca de diseño y mi pasión por el crossfit y la naturaleza."
    },
    soul: {
      title: "Soul AI | Alex Salmerón - Asistente Personal de Diseño",
      desc: "Interactúa con Soul, mi IA personalizada. Resuelve dudas sobre mi experiencia en Design Systems, metodología de trabajo y proyectos de diseño de producto."
    },
    articles: {
      title: "Artículos | Alex Salmerón - Product Designer",
      desc: "Lee mi opinión y mis últimos artículos sobre sistemas de diseño, flujos de trabajo en Figma y el futuro del diseño de producto."
    },
    projects: {
      waykout: {
        title: "Waykout | Proyecto de Diseño de Producto por Alex Salmerón",
        desc: "Waykout es una plataforma integral diseñada para optimizar la logística y la gestión de vehículos en tiempo real, centrada en la eficiencia operativa y la experiencia del conductor."
      }
    },
    articles_list: {
      'design-systems-scale': {
        title: "Sistemas de Diseño a escala: El caso Xnorb | Alex Salmerón",
        desc: "Cómo construimos un sistema que permite a más de 50 diseñadores trabajar de forma síncrona sin perder la consistencia."
      },
      'figma-variables-workflow': {
        title: "Figma Variables: Un cambio de paradigma | Alex Salmerón",
        desc: "Las variables han cambiado para siempre cómo estructuramos nuestros archivos. Ya no se trata de estilos, sino de lógica de diseño."
      },
      'product-design-future': {
        title: "El futuro del Diseño de Producto en la era de la IA | Alex Salmerón",
        desc: "Reflexiones sobre cómo la inteligencia artificial está redefiniendo nuestro rol como diseñadores y creadores."
      }
    }
  },
  en: {
    home: {
      title: "Alex Salmerón - Senior Product Designer",
      desc: "Portfolio of Alex Salmerón, senior product designer based in Murcia, Spain, specialized in design systems and DesignOps. Discover my design projects and tools for Figma."
    },
    about: {
      title: "About | Alex Salmerón - Product Designer",
      desc: "Explore my professional journey since 2007. Specialist in DesignOps and Figma Camp. Discover my design library and my passion for nature and life with Bronx."
    },
    soul: {
      title: "Soul AI | Alex Salmerón - Personal Design Assistant",
      desc: "Chat with Soul, my custom AI assistant. Get insights into my experience with Design Systems, workflows, and product design projects."
    },
    articles: {
      title: "Articles | Alex Salmerón - Product Designer",
      desc: "Read my latest articles about design systems, Figma workflows, and the future of product design."
    },
    projects: {
      waykout: {
        title: "Waykout | Product Design Project by Alex Salmerón",
        desc: "Waykout is a comprehensive platform designed to optimize logistics and vehicle management in real time, focused on operational efficiency and driver experience."
      }
    },
    articles_list: {
      'design-systems-scale': {
        title: "Design Systems at Scale: The Xnorb Case | Alex Salmerón",
        desc: "How we built a system that allows more than 50 designers to work synchronously without losing consistency."
      },
      'figma-variables-workflow': {
        title: "Figma Variables: A Paradigm Shift | Alex Salmerón",
        desc: "Variables have forever changed how we structure our files. It's no longer about styles, but about design logic."
      },
      'product-design-future': {
        title: "The Future of Product Design in the AI Era | Alex Salmerón",
        desc: "Reflections on how artificial intelligence is redefining our role as designers and creators."
      }
    }
  }
};

// HTML Fallbacks for each page to prevent cloaking penalties and ensure complete crawlability
const HTML_CONTENT = {
  es: {
    home: `
      <header>
        <h1>Alex Salmerón</h1>
        <p>Diseñador de Producto con más de 15 años de experiencia. Especializado en Sistemas de Diseño que permiten a equipos y empresas escalar con velocidad y consistencia.</p>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <section id="projects">
          <h2>Proyectos de Diseño destacados</h2>
          <article>
            <h3>Waykout</h3>
            <p>Un marketplace de experiencias tradicionales y turismo sostenible diseñado para potenciar la economía de las comunidades locales y revitalizar la cultura de la región.</p>
            <p>Lead Product Designer - 2024</p>
            <a href="/es/project/waykout">Ver caso de estudio de Waykout</a>
          </article>
        </section>
        <section id="lab">
          <h2>Un pequeño espacio para experimentar sin restricciones y compartir recursos con la comunidad</h2>
          <ul>
            <li>
              <strong>Variables Timeline (Figma Plugin):</strong> Log de cambios en tiempo real para variables de Figma. Rastrea cada actualización, autor y valor, directamente dentro de tu archivo.
              <br/><a href="https://www.figma.com/community/plugin/1600155199369592947/variables-timeline">Pruébalo en Figma</a>
            </li>
            <li>
              <strong>Documentación de flujos de usuario:</strong> Anotaciones sobre flujos y comportamiento de componentes para evitar dudas en desarrollo.
              <br/><a href="https://www.figma.com/community/file/1643193230719352715/ui-flow-documentation-sample">Pruébalo en Figma</a>
            </li>
            <li>
              <strong>Infinite Variable Modes:</strong> Crea y gestiona modos de variables ilimitados en Figma. Construye sistemas de diseño escalables, flexibles y consistentes, sin límites de plan.
              <br/><a href="https://www.figma.com/community/file/1445434350337332622/infinite-variable-modes">Pruébalo en Figma</a>
            </li>
            <li>
              <strong>Estructura para documentar componentes:</strong> Flujo de trabajo en Figma para crear librerías de componentes comprensibles y mantenibles.
              <br/><a href="https://www.figma.com/community/file/1643181196052145946/component-documentation-sample">Pruébalo en Figma</a>
            </li>
            <li>
              <strong>Components Explorer (Figma Plugin):</strong> Encuentra y gestiona todos tus componentes en un solo lugar. Localiza instancias al instante y mira dónde se están usando en todo tu archivo.
              <br/><a href="https://www.figma.com/community/plugin/1505449538275448157/components-explorer">Pruébalo en Figma</a>
            </li>
            <li>
              <strong>Icon Library con variables:</strong> Controla toda tu librería de iconos con variables. Asegura la consistencia y actualizaciones flexibles en todos tus proyectos.
              <br/><a href="https://www.figma.com/community/file/1445427402991631750">Pruébalo en Figma</a>
            </li>
          </ul>
        </section>
      </main>
    `,
    about: `
      <header>
        <h1>Alex Salmerón — Sobre mí</h1>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <section>
          <h2>Trayectoria Profesional</h2>
          <p>Soy Alex Salmerón, diseñador de producto ubicado en Murcia. Desde 2007 me dedico a ayudar a compañías a crear productos digitales eficientes, accesibles y coherentes. Combinando estrategia, investigación y diseño centrado en el usuario para ofrecer soluciones visuales y funcionales alineadas con los objetivos de negocio y producto.</p>
          <p>Mi trayectoria como diseñador comenzó de forma autodidacta, impulsado por la curiosidad y la práctica constante. Pero además, también he realizado diferentes workshops en Neoland, Instituto Tramontana, Figma Camp y DesignOps Latam (Workshop: DesignOps en acción), buscando especializarme en la creación, mantenimiento y organización de sistemas de diseño.</p>
        </section>
        <section>
          <h2>Vida Personal</h2>
          <p>También me encanta la naturaleza, viajar, descubrir nuevos lugares, practicar CrossFit, disfrutar de un buen concierto de indie o rock, perderme en una maratón de cine… y, sobre todo, compartir momentos con ese pequeño ser que aparece en la foto.</p>
          <p>Él es Bronx, mi compañero de vida y una de mis mayores fuentes de inspiración desde hace más de 15 años. En todo este tiempo hemos vivido aventuras recorriendo miles de kilómetros y explorando rincones increíbles. Esta es la parte más personal de la historia… y poder disfrutar de todo esto, lo llamo suerte.</p>
        </section>
        <section>
          <h3>Biblioteca de diseño</h3>
          <table>
            <thead>
              <tr>
                <th>Libro</th>
                <th>Autor</th>
                <th>Tema</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>The design of everyday things</td><td>Don Norman</td><td>UX / Psicología</td></tr>
              <tr><td>Experiencia de usuario: Principios y métodos</td><td>Yusef Hassan Montero</td><td>UX</td></tr>
              <tr><td>UX. Una metodología de diseño eficiente</td><td>M. Ferrer, E. Aguirre y R. Méndez</td><td>UX</td></tr>
              <tr><td>Más que diseño de experiencia</td><td>Esther Rizo</td><td>UX / Estrategia</td></tr>
              <tr><td>Diseño desde Marte</td><td>Cris Busquets</td><td>Diseño / UX</td></tr>
              <tr><td>UX Writing</td><td>Marisol Parnofiello</td><td>Contenido</td></tr>
              <tr><td>Manual de DesignOps</td><td>Irene Beitia</td><td>DesignOps</td></tr>
              <tr><td>Idea, producto y negocio</td><td>Justo Hidalgo</td><td>Producto</td></tr>
              <tr><td>El método Lean Startup</td><td>Eric Ries</td><td>Estrategia</td></tr>
              <tr><td>Designpedia</td><td>Juan Gasca y Rafa Zaragoza</td><td>Metodologías</td></tr>
              <tr><td>Psicología del color</td><td>Eva Heller</td><td>Color</td></tr>
            </tbody>
          </table>
        </section>
      </main>
    `,
    soul: `
      <header>
        <h1>Soul AI — Asistente de Diseño de Alex Salmerón</h1>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <p>Interactúa con Soul, mi IA personalizada. Resuelve dudas sobre mi experiencia en Design Systems, metodología de trabajo y proyectos de diseño de producto.</p>
        <p>Preguntas frecuentes que puedes hacerle:</p>
        <ul>
          <li>¿Quién es Alex?</li>
          <li>¿Cuál es su rol actual?</li>
          <li>¿Qué habilidades tiene?</li>
          <li>¿Dónde reside?</li>
          <li>¿Quién es Bronx?</li>
        </ul>
      </main>
    `,
    articles: `
      <header>
        <h1>Artículos de Alex Salmerón</h1>
        <p>Compartiendo pensamientos sobre diseño, tecnología y flujos de trabajo.</p>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <article>
          <h2><a href="/es/articles/design-systems-scale">Sistemas de Diseño a escala: El caso Xnorb</a></h2>
          <p>Cómo construimos un sistema que permite a más de 50 diseñadores trabajar de forma síncrona sin perder la consistencia.</p>
        </article>
        <article>
          <h2><a href="/es/articles/figma-variables-workflow">Figma Variables: Un cambio de paradigma en el flujo de diseño</a></h2>
          <p>Guía completa sobre cómo implementar variables para mejorar el traspaso a desarrollo y la flexibilidad del producto.</p>
        </article>
        <article>
          <h2><a href="/es/articles/product-design-future">El futuro del Diseño de Producto en la era de la IA</a></h2>
          <p>Reflexiones sobre cómo la inteligencia artificial está redefiniendo nuestro rol como diseñadores y creadores.</p>
        </article>
      </main>
    `,
    project_waykout: `
      <header>
        <h1>Waykout — Revolucionando la gestión de flotas y movilidad inteligente</h1>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <p>Waykout es una plataforma integral diseñada para optimizar la logística y la gestión de vehículos en tiempo real, centrada en la eficiencia operativa y la experiencia del conductor.</p>
        <section>
          <h2>El Contexto</h2>
          <p>En un mercado saturado de herramientas de gestión de flotas complejas y fragmentadas, el cliente necesitaba una solución que centralizara todas las operaciones bajo una experiencia de usuario fluida y coherente.</p>
        </section>
        <section>
          <h2>Investigación y Hallazgos</h2>
          <p>Realizamos entrevistas con gestores de logística y conductores para identificar puntos de fricción. Descubrimos que el 60% del tiempo se perdía en la interpretación de informes de telemetría poco claros.</p>
        </section>
        <section>
          <h2>Sistemas de Diseño</h2>
          <p>Creamos una biblioteca de componentes robusta en Figma, permitiendo al equipo de desarrollo implementar nuevas funcionalidades con una velocidad un 30% superior, manteniendo siempre la integridad de la marca.</p>
        </section>
        <section>
          <h2>La Solución Final</h2>
          <p>El resultado es un ecosistema digital que no solo gestiona vehículos, sino que optimiza rutas dinámicamente y ofrece análisis predictivos mediante una interfaz limpia y centrada en los datos críticos.</p>
        </section>
      </main>
    `,
    article_ds: `
      <header>
        <h1>Sistemas de Diseño a escala: El caso Xnorb</h1>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <p>Los sistemas de diseño no son solo bibliotecas de componentes; son el lenguaje vivo de un producto. En Xnorb, nos enfrentamos al reto de escalar nuestra visión de diseño a través de múltiples equipos y geografías.</p>
        <h2>El Problema del Crecimiento</h2>
        <p>Cuando el equipo creció más allá de los 50 diseñadores, la consistencia empezó a fragmentarse. Cada equipo interpretaba las guías de estilo de manera diferente, creando silos de diseño que afectaban directamente a la experiencia del usuario final.</p>
        <blockquote>"Un sistema de diseño de éxito es aquel que se vuelve invisible."</blockquote>
        <h2>La Solución: Figma Variables</h2>
        <p>Implementamos un sistema basado íntegramente en variables de Figma, permitiendo el cambio instantáneo entre temas (Light/Dark) y densidades. Esto redujo el tiempo de traspaso a desarrollo en un 40%.</p>
        <p>En este artículo exploraremos cómo la automatización y la documentación integrada fueron las claves para que el sistema de diseño Xnorb fuera adoptado por toda la organización.</p>
      </main>
    `,
    article_variables: `
      <header>
        <h1>Figma Variables: Un cambio de paradigma en el flujo de diseño</h1>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <p>Las variables han cambiado para siempre cómo estructuramos nuestros archivos. Ya no se trata de estilos, sino de lógica de diseño.</p>
      </main>
    `,
    article_ai: `
      <header>
        <h1>El futuro del Diseño de Producto en la era de la IA</h1>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <p>Reflexiones sobre cómo la inteligencia artificial está redefiniendo nuestro rol como diseñadores y creadores.</p>
      </main>
    `
  },
  en: {
    home: `
      <header>
        <h1>Alex Salmerón</h1>
        <p>Product Designer with over +15 years of experience. Specialized in Design Systems that allow teams and companies to scale with speed and consistency.</p>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <section id="projects">
          <h2>Featured Design Projects</h2>
          <article>
            <h3>Waykout</h3>
            <p>A marketplace for traditional experiences and sustainable tourism designed to boost the local community economy and revitalize the region's culture.</p>
            <p>Lead Product Designer - 2024</p>
            <a href="/en/project/waykout">View Waykout Case Study</a>
          </article>
        </section>
        <section id="lab">
          <h2>A small space to experiment without constraints and share resources with the community</h2>
          <ul>
            <li>
              <strong>Variables Timeline (Figma Plugin):</strong> Real-time change log for Figma variables. Track every update, author, and value—right inside your file.
              <br/><a href="https://www.figma.com/community/plugin/1600155199369592947/variables-timeline">Try it on Figma</a>
            </li>
            <li>
              <strong>UI Flow Documentation:</strong> Annotations on user flows and component behavior to reduce design-to-development gaps.
              <br/><a href="https://www.figma.com/community/file/1643193230719352715/ui-flow-documentation-sample">Try it on Figma</a>
            </li>
            <li>
              <strong>Infinite Variable Modes:</strong> Create and manage unlimited variable modes in Figma. Build scalable, flexible, and consistent design systems—without plan limits.
              <br/><a href="https://www.figma.com/community/file/1445434350337332622/infinite-variable-modes">Try it on Figma</a>
            </li>
            <li>
              <strong>Component documentation structure:</strong> Figma workflow structure to build understandable and maintainable component libraries.
              <br/><a href="https://www.figma.com/community/file/1643181196052145946/component-documentation-sample">Try it on Figma</a>
            </li>
            <li>
              <strong>Components Explorer (Figma Plugin):</strong> Find and manage all your components in one place. Instantly locate instances and see where they’re used across your file.
              <br/><a href="https://www.figma.com/community/plugin/1505449538275448157/components-explorer">Try it on Figma</a>
            </li>
            <li>
              <strong>Icon Library with variables:</strong> Control your entire icon library with variables. Ensure consistency and flexible updates across projects.
              <br/><a href="https://www.figma.com/community/file/1445427402991631750">Try it on Figma</a>
            </li>
          </ul>
        </section>
      </main>
    `,
    about: `
      <header>
        <h1>Alex Salmerón — About me</h1>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <section>
          <h2>Professional Journey</h2>
          <p>I am Alex Salmerón, a Product Designer based in Murcia. Since 2007, I have been dedicated to helping companies create efficient, accessible, and consistent digital products. By combining strategy, research, and user-centered design, I deliver visual and functional solutions aligned with both business and product objectives.</p>
          <p>My journey as a designer began as a self-taught pursuit, driven by curiosity and constant practice. Additionally, I have completed various workshops at Neoland, Instituto Tramontana, Figma Camp, and DesignOps Latam (Workshop: DesignOps in Action), specializing in the creation, maintenance, and organization of design systems.</p>
        </section>
        <section>
          <h2>Personal Life</h2>
          <p>I also love nature, traveling, discovering new places, practicing CrossFit, enjoying a good indie or rock concert, getting lost in a movie marathon... and, above all, sharing moments with that little being that appears in the photo.</p>
          <p>He is Bronx, my life companion and one of my greatest sources of inspiration for over 15 years. In all this time, we have lived adventures traveling thousands of kilometers and exploring incredible corners. This is the most personal part of the story... and being able to enjoy all this, I call luck.</p>
        </section>
        <section>
          <h3>Design Library</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Topic</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>The design of everyday things</td><td>Don Norman</td><td>UX / Psychology</td></tr>
              <tr><td>Experiencia de usuario: Principios y métodos</td><td>Yusef Hassan Montero</td><td>UX</td></tr>
              <tr><td>UX. Una metodología de diseño eficiente</td><td>M. Ferrer, E. Aguirre and R. Méndez</td><td>UX</td></tr>
              <tr><td>Más que diseño de experiencia</td><td>Esther Rizo</td><td>UX / Strategy</td></tr>
              <tr><td>Diseño desde Marte</td><td>Cris Busquets</td><td>Design / UX</td></tr>
              <tr><td>UX Writing</td><td>Marisol Parnofiello</td><td>Content</td></tr>
              <tr><td>Manual de DesignOps</td><td>Irene Beitia</td><td>DesignOps</td></tr>
              <tr><td>Idea, producto y negocio</td><td>Justo Hidalgo</td><td>Product</td></tr>
              <tr><td>The Lean Startup</td><td>Eric Ries</td><td>Strategy</td></tr>
              <tr><td>Designpedia</td><td>Juan Gasca and Rafa Zaragoza</td><td>Methodology</td></tr>
              <tr><td>Color Psychology</td><td>Eva Heller</td><td>Theory</td></tr>
            </tbody>
          </table>
        </section>
      </main>
    `,
    soul: `
      <header>
        <h1>Soul AI — Alex Salmerón's Design Assistant</h1>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <p>Chat with Soul, my custom AI assistant. Get insights into my experience with Design Systems, workflows, and product design projects.</p>
        <p>Suggested questions to ask:</p>
        <ul>
          <li>About Alex</li>
          <li>Current role</li>
          <li>Main skills</li>
          <li>Location</li>
          <li>Who is Bronx?</li>
        </ul>
      </main>
    `,
    articles: `
      <header>
        <h1>Articles by Alex Salmerón</h1>
        <p>Sharing thoughts on design, technology, and workflows.</p>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <article>
          <h2><a href="/en/articles/design-systems-scale">Design Systems at Scale: The Xnorb Case</a></h2>
          <p>How we built a system that allows more than 50 designers to work synchronously without losing consistency.</p>
        </article>
        <article>
          <h2><a href="/en/articles/figma-variables-workflow">Figma Variables: A Paradigm Shift in Design Workflow</a></h2>
          <p>Comprehensive guide on how to implement variables to improve development handoff and product flexibility.</p>
        </article>
        <article>
          <h2><a href="/en/articles/product-design-future">The Future of Product Design in the AI Era</a></h2>
          <p>Reflections on how artificial intelligence is redefining our role as designers and creators.</p>
        </article>
      </main>
    `,
    project_waykout: `
      <header>
        <h1>Waykout — Revolutionizing fleet management and smart mobility</h1>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <p>Waykout is a comprehensive platform designed to optimize logistics and vehicle management in real time, focused on operational efficiency and driver experience.</p>
        <section>
          <h2>The Context</h2>
          <p>In a market saturated with complex and fragmented fleet management tools, the client needed a solution that centralized all operations under a smooth and consistent user experience.</p>
        </section>
        <section>
          <h2>Research & Insights</h2>
          <p>We conducted interviews with logistics managers and drivers to identify friction points. We discovered that 60% of time was wasted interpreting unclear telemetry reports.</p>
        </section>
        <section>
          <h2>Design Systems</h2>
          <p>We created a robust component library in Figma, allowing the development team to implement new features 30% faster while maintaining brand integrity.</p>
        </section>
        <section>
          <h2>The Final Solution</h2>
          <p>The result is an ecosystem digital that not only manages vehicles but dynamically optimizes routes and offers predictive analytics through a clean interface focused on critical data.</p>
        </section>
      </main>
    `,
    article_ds: `
      <header>
        <h1>Design Systems at Scale: The Xnorb Case</h1>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <p>Design systems are not just component libraries; they are the living language of a product. At Xnorb, we faced the challenge of scaling our design vision across multiple teams and geographies.</p>
        <h2>The Growth Problem</h2>
        <p>When the team grew beyond 50 designers, consistency began to fragment. Each team interpreted style guides differently, creating design silos that directly affected the end-user experience.</p>
        <blockquote>"A successful design system is one that becomes invisible."</blockquote>
        <h2>The Solution: Figma Variables</h2>
        <p>We implemented a system based entirely on Figma variables, allowing instant switching between themes (Light/Dark) and densities. This reduced development handoff time by 40%.</p>
        <p>In this article we will explore how automation and integrated documentation were the keys to the Xnorb design system being adopted across the organization.</p>
      </main>
    `,
    article_variables: `
      <header>
        <h1>Figma Variables: A Paradigm Shift in Design Workflow</h1>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <p>Variables have forever changed how we structure our files. It's no longer about styles, but about design logic.</p>
      </main>
    `,
    article_ai: `
      <header>
        <h1>The Future of Product Design in the AI Era</h1>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <p>Reflections on how artificial intelligence is redefining our role as designers and creators.</p>
      </main>
    `
  }
};

// JSON-LD structured schemas by language (Claude's advice)
const SCHEMA_DATA = {
  es: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alex Salmerón",
    "jobTitle": "Diseñador de Producto Senior",
    "url": "https://mefaltaunpixel.es",
    "sameAs": [
      "https://www.linkedin.com/in/alexsalmeron/",
      "https://www.figma.com/@alexsalmeron"
    ],
    "description": "Diseñador de producto senior especializado en sistemas de diseño y DesignOps en Murcia."
  },
  en: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alex Salmerón",
    "jobTitle": "Senior Product Designer",
    "url": "https://mefaltaunpixel.es",
    "sameAs": [
      "https://www.linkedin.com/in/alexsalmeron/",
      "https://www.figma.com/@alexsalmeron"
    ],
    "description": "Senior Product Designer specialized in Design Systems and DesignOps based in Spain."
  }
};

const ROUTES = [
  { path: 'es', lang: 'es', seoKey: 'home', contentKey: 'home' },
  { path: 'en', lang: 'en', seoKey: 'home', contentKey: 'home' },
  { path: 'es/about', lang: 'es', seoKey: 'about', contentKey: 'about' },
  { path: 'en/about', lang: 'en', seoKey: 'about', contentKey: 'about' },
  { path: 'es/soul', lang: 'es', seoKey: 'soul', contentKey: 'soul' },
  { path: 'en/soul', lang: 'en', seoKey: 'soul', contentKey: 'soul' },
  { path: 'es/articles', lang: 'es', seoKey: 'articles', contentKey: 'articles' },
  { path: 'en/articles', lang: 'en', seoKey: 'articles', contentKey: 'articles' },
  { path: 'es/project/waykout', lang: 'es', seoKey: 'projects.waykout', contentKey: 'project_waykout', isNested: true },
  { path: 'en/project/waykout', lang: 'en', seoKey: 'projects.waykout', contentKey: 'project_waykout', isNested: true },
  { path: 'es/articles/design-systems-scale', lang: 'es', seoKey: 'articles_list.design-systems-scale', contentKey: 'article_ds', isNested: true },
  { path: 'en/articles/design-systems-scale', lang: 'en', seoKey: 'articles_list.design-systems-scale', contentKey: 'article_ds', isNested: true },
  { path: 'es/articles/figma-variables-workflow', lang: 'es', seoKey: 'articles_list.figma-variables-workflow', contentKey: 'article_variables', isNested: true },
  { path: 'en/articles/figma-variables-workflow', lang: 'en', seoKey: 'articles_list.figma-variables-workflow', contentKey: 'article_variables', isNested: true },
  { path: 'es/articles/product-design-future', lang: 'es', seoKey: 'articles_list.product-design-future', contentKey: 'article_ai', isNested: true },
  { path: 'en/articles/product-design-future', lang: 'en', seoKey: 'articles_list.product-design-future', contentKey: 'article_ai', isNested: true }
];

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function prerender() {
  console.log('Starting static pre-rendering...');

  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Build template (dist/index.html) not found. Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  ROUTES.forEach(route => {
    const seo = getNestedValue(SEO_DATA[route.lang], route.seoKey);
    const content = getNestedValue(HTML_CONTENT[route.lang], route.contentKey);
    const schema = SCHEMA_DATA[route.lang];

    if (!seo || !content) {
      console.warn(`Missing SEO or Content for route: ${route.path}`);
      return;
    }

    let html = template;

    // 1. Set html lang attribute
    html = html.replace('<html lang="en">', `<html lang="${route.lang}">`);

    // 2. Set title
    html = html.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`);

    // 3. Set description and meta tags
    html = html.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${seo.desc}" />`
    );
    // Handle fallback if tag syntax varies slightly
    html = html.replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${seo.desc}">`
    );

    // 4. Update Open Graph and Twitter tags
    html = html.replace(
      /<meta property="og:title" content=".*?" \/>/g,
      `<meta property="og:title" content="${seo.title}" />`
    );
    html = html.replace(
      /<meta property="og:description" content=".*?" \/>/g,
      `<meta property="og:description" content="${seo.desc}" />`
    );
    html = html.replace(
      /<meta property="twitter:title" content=".*?" \/>/g,
      `<meta property="twitter:title" content="${seo.title}" />`
    );
    html = html.replace(
      /<meta property="twitter:description" content=".*?" \/>/g,
      `<meta property="twitter:description" content="${seo.desc}" />`
    );

    // 5. Inject language-specific Schema.org markup
    const schemaScript = `
    <script type="application/ld+json">
      ${JSON.stringify(schema, null, 2)}
    </script>`;
    
    // Remove the default schema block in template and insert the localized one
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaScript);

    // 6. Inject faithful HTML fallback inside <div id="root">
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${content}</div>`
    );

    // 7. Save output file
    const outputDir = path.join(DIST_DIR, route.path);
    ensureDirSync(outputDir);
    fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
    console.log(`Pre-rendered: /${route.path}`);
  });

  // 8. Generate dynamic sitemap.xml
  generateSitemap();

  console.log('Pre-rendering finished successfully!');
}

function generateSitemap() {
  console.log('Generating sitemap.xml with alternate links...');
  const baseUrl = 'https://mefaltaunpixel.es';

  // Base list of pages to index in both languages
  const basePages = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: 'about', priority: '0.8', changefreq: 'weekly' },
    { path: 'soul', priority: '0.7', changefreq: 'weekly' },
    { path: 'articles', priority: '0.8', changefreq: 'weekly' }
  ];

  // Dynamic projects & articles list
  const dynamicPages = [
    { path: 'project/waykout', priority: '0.8', changefreq: 'monthly' },
    { path: 'articles/design-systems-scale', priority: '0.7', changefreq: 'monthly' },
    { path: 'articles/figma-variables-workflow', priority: '0.7', changefreq: 'monthly' },
    { path: 'articles/product-design-future', priority: '0.7', changefreq: 'monthly' }
  ];

  const allPages = [...basePages, ...dynamicPages];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Loop through all pages and generate ES & EN blocks with cross links (hreflang)
  allPages.forEach(page => {
    ['es', 'en'].forEach(lang => {
      const pagePath = page.path ? `/${page.path}` : '';
      const currentUrl = `${baseUrl}/${lang}${pagePath}`;
      const alternateEs = `${baseUrl}/es${pagePath}`;
      const alternateEn = `${baseUrl}/en${pagePath}`;

      xml += '  <url>\n';
      xml += `    <loc>${currentUrl}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="es" href="${alternateEs}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${alternateEn}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${alternateEn}"/>\n`;
      if (page.priority) xml += `    <priority>${page.priority}</priority>\n`;
      if (page.changefreq) xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += '  </url>\n';
    });
  });

  xml += '</urlset>\n';

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log('Sitemap.xml written successfully to dist/');
}

prerender();
