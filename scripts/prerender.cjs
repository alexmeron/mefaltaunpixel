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
        desc: "Waykout es una plataforma de turismo colaborativo para descubrir y reservar experiencias locales auténticas en la Región de Murcia. Diseño de producto y MVP por Alex Salmerón."
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
        desc: "Waykout is a collaborative tourism platform to discover and book authentic local experiences in the Region of Murcia, Spain. Product design and MVP by Alex Salmerón."
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
        <h1>Waykout — Plataforma de turismo colaborativo</h1>
        <p>Una plataforma que acerca el turismo auténtico a los rincones menos conocidos de España</p>
        <p>Tags: Product Design · UX Research · UI Kit · IA · MVP · 2025</p>
        <nav>
          <a href="/es">Proyectos</a> | <a href="/es/about">Sobre mí</a> | <a href="/es/soul">Soul AI</a> | <a href="/es/articles">Artículos</a>
        </nav>
      </header>
      <main>
        <section>
          <h2>Contexto y problema</h2>
          <p>El turismo en España se concentra en los mismos destinos de siempre. Mientras tanto, regiones como Murcia esconden una riqueza cultural, gastronómica y natural que pasa desapercibida para la mayoría de viajeros, no por falta de interés, sino por falta de visibilidad.</p>
          <p>Waykout nació para cambiar eso. Una plataforma de turismo colaborativo donde anfitriones locales publican sus experiencias y viajeros las descubren y reservan al instante.</p>
          <p>Decidimos arrancar en la Región de Murcia por una razón estratégica: la proximidad nos daba control sobre el feedback y la posibilidad de construir con early adopters reales desde el primer día.</p>
        </section>

        <section>
          <h2>Mi rol</h2>
          <p>Mi trabajo abarcó desde la validación de la idea hasta el diseño completo del producto. Antes de diseñar una sola pantalla, lancé campañas segmentadas en Instagram y Google Ads para medir si había demanda real, definiendo el user persona del viajero y del anfitrión y acotando la inversión a esos perfiles. Los resultados confirmaron el interés y nos dieron datos concretos para priorizar qué construir primero.</p>
          <p>Una vez validada la hipótesis, el ciclo de producto del MVP giró en torno a dos actores: usuarios (viajeros) y anfitriones. Prototipé y validé wireframes e hipótesis con early adopters reales en cada iteración. También creé un UI Kit en Figma que estableció las bases visuales de la plataforma y aceleró el diseño de todos los flujos.</p>
        </section>

        <section>
          <h2>Decisiones de diseño clave</h2>
          <article>
            <h3>Login sin contraseña</h3>
            <p>Una de las primeras fricciones que identificamos fue el registro. Waykout es una plataforma que un usuario puede usar una o dos veces al mes, no todos los días. Pedirle que recuerde una contraseña nueva era garantía de abandono. Rediseñamos el flujo completo de autenticación eliminando la contraseña tradicional e implementando acceso mediante magic link: un enlace enviado al email que autentica al usuario en un clic. Menos fricción, más conversión, y sin que el usuario tenga que gestionar una credencial más.</p>
          </article>
          <article>
            <h3>Publicación de experiencias asistida por IA</h3>
            <p>Durante las primeras semanas detectamos una fricción crítica en el lado del anfitrión: describir bien una actividad es difícil. Muchos anfitriones locales tienen una experiencia única que ofrecer, pero no saben cómo presentarla de forma atractiva. El resultado eran fichas pobres que no convertían, y anfitriones frustrados que abandonaban el proceso a mitad. Diseñamos una interfaz de publicación basada en sugerencias inteligentes: el anfitrión escribe una descripción breve y libre de su actividad, y una IA genera automáticamente la ficha completa de la experiencia, título, descripción, puntos destacados y tono, lista para publicar. El anfitrión revisa, ajusta si quiere y publica. El impacto fue inmediato: más anfitriones completaban el proceso de publicación y la calidad media de las fichas mejoró notablemente, lo que se tradujo directamente en más reservas.</p>
          </article>
          <article>
            <h3>Herramientas para anfitriones</h3>
            <p>Más allá de la publicación, diseñamos herramientas internas para que los anfitriones pudieran gestionar sus reservas recibidas de forma sencilla. Un anfitrión que tiene control sobre su agenda y sus reservas es un anfitrión que sigue publicando, y eso es lo que hace crecer la plataforma. También trabajamos el posicionamiento orgánico de cada ficha de experiencia para generar tráfico sin depender exclusivamente de campañas de pago.</p>
          </article>
        </section>

        <section>
          <h2>UI Kit</h2>
          <p>Para mantener consistencia y velocidad de ejecución desde el primer día, construí un UI Kit en Figma con todos los componentes base de la plataforma. Colores, tipografía, botones, formularios, cards de experiencia y estados de cada elemento. Esto nos permitió escalar el diseño de nuevos flujos sin perder tiempo en decisiones repetitivas ni en inconsistencias visuales.</p>
        </section>

        <section>
          <h2>Resultados</h2>
          <ul>
            <li><strong>+100 usuarios:</strong> el primer mes</li>
            <li><strong>50 anfitriones:</strong> activos</li>
            <li><strong>+50 experiencias:</strong> publicadas</li>
            <li><strong>+120 reservas:</strong> realizadas</li>
          </ul>
          <p>Todo esto en el primer mes tras el lanzamiento del MVP, arrancando únicamente en la Región de Murcia y con una inversión controlada en campañas de validación.</p>
        </section>

        <section>
          <h2>Aprendizajes</h2>
          <p>Arrancar en una región concreta fue la decisión correcta. La proximidad con los primeros anfitriones y usuarios nos permitió iterar rápido y con confianza real, no suposiciones.</p>
          <p>Validar con campañas antes de escribir una línea de código evitó semanas de trabajo en la dirección equivocada.</p>
          <p>El mayor aprendizaje: los anfitriones no necesitaban más campos en un formulario, necesitaban ayuda para contar bien su historia. Cuando les dimos esa ayuda, la plataforma creció sola.</p>
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
        <h1>Waykout — Collaborative tourism platform</h1>
        <p>A platform that brings authentic tourism to the lesser-known corners of Spain</p>
        <p>Tags: Product Design · UX Research · UI Kit · IA · MVP · 2025</p>
        <nav>
          <a href="/en">Work</a> | <a href="/en/about">About</a> | <a href="/en/soul">Soul AI</a> | <a href="/en/articles">Articles</a>
        </nav>
      </header>
      <main>
        <section>
          <h2>Context & problem</h2>
          <p>Tourism in Spain is concentrated in the same old destinations. Meanwhile, regions like Murcia hide a cultural, gastronomic, and natural richness that goes unnoticed by most travelers, not for lack of interest, but for lack of visibility.</p>
          <p>Waykout was born to change that. A collaborative tourism platform where local hosts publish their experiences and travelers discover and book them instantly.</p>
          <p>We decided to start in the Region of Murcia for a strategic reason: proximity gave us control over feedback and the possibility to build with real early adopters from day one.</p>
        </section>

        <section>
          <h2>My role</h2>
          <p>My work spanned from idea validation to the complete product design. Before designing a single screen, I launched targeted campaigns on Instagram and Google Ads to measure if there was real demand, defining the traveler and host user personas and limiting the investment to those profiles. The results confirmed the interest and gave us concrete data to prioritize what to build first.</p>
          <p>Once the hypothesis was validated, the MVP product cycle revolved around two actors: users (travelers) and hosts. I prototyped and validated wireframes and hypotheses with real early adopters in each iteration. I also created a UI Kit in Figma that established the visual foundation of the platform and accelerated the design of all workflows.</p>
        </section>

        <section>
          <h2>Key design decisions</h2>
          <article>
            <h3>Passwordless login</h3>
            <p>One of the first points of friction we identified was registration. Waykout is a platform that a user might use once or twice a month, not every day. Asking them to remember a new password was a guarantee of abandonment. We redesigned the entire authentication flow, eliminating the traditional password and implementing magic link access: a link sent to the email that authenticates the user in one click. Less friction, more conversion, and without the user having to manage another credential.</p>
          </article>
          <article>
            <h3>AI-assisted experience creation</h3>
            <p>During the first few weeks, we detected a critical friction point on the host's side: writing a good description for an activity is hard. Many local hosts have a unique experience to offer but don't know how to present it attractively. The result was poor experience listings that didn't convert, and frustrated hosts who abandoned the process halfway. We designed a publishing interface based on smart suggestions: the host writes a brief and free description of their activity, and an AI automatically generates the complete experience listing, including title, description, highlights, and tone, ready to publish. The host reviews, adjusts if they want, and publishes. The impact was immediate: more hosts completed the creation process and the average quality of the listings improved significantly, translating directly into more bookings.</p>
          </article>
          <article>
            <h3>Tools for hosts</h3>
            <p>Beyond publishing, we designed internal tools so that hosts could easily manage their received bookings. A host who has control over their calendar and bookings is a host who continues to publish, and that is what makes the platform grow. We also worked on the organic search optimization (SEO) of each experience listing to drive traffic without relying exclusively on paid campaigns.</p>
          </article>
        </section>

        <section>
          <h2>UI Kit</h2>
          <p>To maintain consistency and speed of execution from day one, I built a UI Kit in Figma with all the base components of the platform. Colors, typography, buttons, forms, experience cards, and states for each element. This allowed us to scale the design of new flows without wasting time on repetitive decisions or visual inconsistencies.</p>
        </section>

        <section>
          <h2>Results</h2>
          <ul>
            <li><strong>+100 users:</strong> the first month</li>
            <li><strong>50 hosts:</strong> active</li>
            <li><strong>+50 experiences:</strong> published</li>
            <li><strong>+120 bookings:</strong> completed</li>
          </ul>
          <p>All this in the first month following the MVP launch, starting exclusively in the Region of Murcia and with a controlled investment in validation campaigns.</p>
        </section>

        <section>
          <h2>Key Takeaways</h2>
          <p>Starting in a specific region was the right decision. Proximity to our first hosts and users allowed us to iterate quickly and with real confidence, not assumptions.</p>
          <p>Validating with campaigns before writing a single line of code saved us weeks of work in the wrong direction.</p>
          <p>The biggest takeaway: hosts didn't need more fields in a form, they needed help to tell their story well. When we gave them that help, the platform grew on its own.</p>
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
    { path: 'soul', priority: '0.7', changefreq: 'weekly' }
  ];

  // Dynamic projects list
  const dynamicPages = [
    { path: 'project/waykout', priority: '0.8', changefreq: 'monthly' }
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
