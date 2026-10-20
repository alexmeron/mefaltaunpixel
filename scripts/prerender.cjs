const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');

// Define SEO metadata
const SEO_DATA = {
  home: {
    title: "Álex Salmerón — Senior Product Designer & Design Systems Specialist",
    desc: "Portfolio of Álex Salmerón, Senior Product Designer based in Murcia, Spain. 15+ years of experience in Visual Design, Design Systems and DesignOps. Helping teams build consistent, scalable digital products."
  },
  about: {
    title: "About Álex Salmerón — Product Designer based in Murcia, Spain",
    desc: "Álex Salmerón is a Senior Product Designer based in Murcia with 15+ years of experience. Specialized in Design Systems, DesignOps and Figma. Discover his professional journey, design library and tools."
  },
  soul: {
    title: "Soul — Álex Salmerón's AI Design Assistant",
    desc: "Chat with Soul, the personal AI assistant of Álex Salmerón, product designer based in Murcia. Ask about his experience, skills, Design Systems work and how to get in touch."
  },
  resources: {
    title: "Recursos creados para la comunidad de diseño — Álex Salmerón",
    desc: "Plugins, librerías y herramientas desarrolladas a partir de mi experiencia en diseño de producto, Design Systems y optimización de flujos de trabajo. Creados para compartir conocimiento y ayudar a otros diseñadores a trabajar mejor."
  },
  projects: {
    title: "Proyectos que dan forma a mejores experiencias digitales — Álex Salmerón",
    desc: "Una selección de proyectos en los que exploro el diseño de producto, los sistemas de diseño y nuevas formas de conectar diseño, tecnología e IA para resolver problemas reales.",
    waykout: {
      title: "Waykout Case Study — Product Design by Álex Salmerón",
      desc: "Waykout is a collaborative tourism platform for authentic local experiences in Murcia, Spain. Full product design and MVP by Álex Salmerón, Senior Product Designer."
    },
    animal_rescue: {
      title: "Ayuda Incendios Madrid y Ávila 2025 | Product Design & AI — Álex Salmerón",
      desc: "Plataforma con IA para emparejar avisos de auxilio animal por cercanía y necesidad durante los incendios de Madrid y Ávila. Side project por Álex Salmerón."
    },
    gaztelugatxe_tracker: {
      title: "Gaztelugatxe Tickets Tracker — Automation & Case Study by Álex Salmerón",
      desc: "Rastreador y automatizador de reservas para San Juan de Gaztelugatxe ante cancelaciones en tiempo real. Side project por Álex Salmerón."
    },
    dribbble: {
      title: "Dribbble Explorations & UI Design | Álex Salmerón",
      desc: "Colección de conceptos de diseño de producto, sistemas de diseño, dashboards y microinteracciones por Álex Salmerón."
    }
  },
  articles: {
    title: "Articles by Álex Salmerón — Design Systems, Figma & Product Design",
    desc: "Articles and reflections by Álex Salmerón on Design Systems, Figma workflows, DesignOps and the future of product design. Written from 15+ years of experience."
  },
  articles_list: {
    'design-systems-scale': {
      title: "Design Systems at Scale: The Xnorb Case | Álex Salmerón",
      desc: "How Álex Salmerón built a design system that allows 50+ designers to work synchronously without losing visual consistency. Practical insights on DesignOps and scalable systems."
    },
    'figma-variables-workflow': {
      title: "Figma Variables: A Paradigm Shift in Design Systems | Álex Salmerón",
      desc: "Álex Salmerón explores how Figma Variables have changed the way we structure design files. From styles to design logic — a practical guide for design system practitioners."
    },
    'product-design-future': {
      title: "The Future of Product Design in the AI Era | Álex Salmerón",
      desc: "Reflections by Álex Salmerón on how artificial intelligence is redefining the role of product designers. What skills will matter most and how to stay relevant."
    }
  }
};

// HTML Fallbacks for each page
const HTML_CONTENT = {
  home: `
    <header>
      <h1>Álex Salmerón — Senior Product Designer</h1>
      <p>Product Designer based in Murcia, Spain, with 15+ years of experience. Specialized in Visual Design, Design Systems and DesignOps. Helping teams and companies build consistent, scalable and maintainable digital products.</p>
      <nav>
        <a href="/">Work</a> | <a href="/about">About</a> | <a href="/soul">Soul AI</a>
      </nav>
    </header>
    <main>
      <section id="projects">
        <h2>Featured Design Projects by Álex Salmerón</h2>
        <article>
          <h3>Waykout — Product Design Case Study</h3>
          <p>A collaborative tourism platform for discovering and booking authentic local experiences in the Region of Murcia, Spain. Full product design and MVP led by Álex Salmerón.</p>
          <p>Lead Product Designer &amp; Co-founder — 2024</p>
          <a href="/project/waykout">View Waykout Case Study</a>
        </article>
      </section>
      <section id="lab">
        <h2>Design Resources &amp; Figma Tools by Álex Salmerón</h2>
        <p>A small space to experiment without constraints and share resources with the design community. Used by 500+ designers worldwide.</p>
        <ul>
          <li><strong>Variables Timeline Figma Plugin:</strong> Track every variable update, author and value directly inside your Figma file.</li>
          <li><strong>Unlimited Modes for Figma:</strong> Create and manage unlimited variable modes without plan limits.</li>
          <li><strong>UI Flow Documentation:</strong> Annotations on user flows and component behavior to reduce design-to-development gaps.</li>
        </ul>
      </section>
      <section id="skills">
        <h2>Skills &amp; Tools</h2>
        <p>Product Design (end-to-end) / Visual Design / Design Systems / DesignOps / Systems Thinking / Prototyping / UX Research / Figma / Zeroheight / Git / GitHub / HTML / CSS</p>
      </section>
    </main>
  `,
  about: `
    <header>
      <h1>About Álex Salmerón — Product Designer based in Murcia</h1>
    </header>
    <main>
      <section>
        <h2>Professional Journey</h2>
        <p>I am Álex Salmerón, a Senior Product Designer based in Murcia, Spain. Since 2007, I have been helping companies create efficient, accessible and consistent digital products. I specialize in Visual Design, Design Systems and DesignOps, combining strategy, research and user-centered design to deliver solutions aligned with both business and product objectives.</p>
        <p>Currently working at Cella Medical Solutions as Senior Product Designer, focused on UX Research for surgical planning tools and evolving their Design System using Figma, Zeroheight and AI workflows.</p>
      </section>
      <section>
        <h2>Experience</h2>
        <ul>
          <li>Cella Medical Solutions — Senior Product Designer (2025–Present)</li>
          <li>DisplayNote — Senior Product Designer (2020–2025)</li>
          <li>StaymyWay / Operto — Senior Product Designer (2018–2020)</li>
          <li>Erasmusu — Product Designer (2017–2018)</li>
          <li>Droiders / Streye — UI/UX Designer (2015–2017)</li>
        </ul>
      </section>
    </main>
  `,
  soul: `
    <header>
      <h1>Soul — Álex Salmerón's Personal AI Design Assistant</h1>
    </header>
    <main>
      <p>Chat with Soul, the personal AI assistant of Álex Salmerón. Ask about his experience, Design Systems work, current role at Cella Medical Solutions, Figma plugins, or how to get in touch.</p>
    </main>
  `,
  resources: `
    <header>
      <h1>Resources built for the design community — Álex Salmerón</h1>
      <p>Plugins, libraries, and tools developed from my experience in Product Design, Design Systems, and workflow optimization. Created to share knowledge and help other designers work better.</p>
    </header>
    <main>
      <section>
        <h2>Figma Plugins &amp; Design System Resources</h2>
        <article>
          <h3>Variables Timeline</h3>
          <p>Real-time change log for Figma variables. Track every update, author, and value—right inside your file.</p>
        </article>
        <article>
          <h3>UI Flow Documentation Sample</h3>
          <p>UI flow documentation in Figma. Annotations on user flows and component behavior.</p>
        </article>
        <article>
          <h3>Infinite Variable Modes</h3>
          <p>Create and manage unlimited variable modes in Figma. Build scalable design systems without limits.</p>
        </article>
        <article>
          <h3>Component Documentation Structure</h3>
          <p>Figma workflow structure to build understandable component libraries.</p>
        </article>
        <article>
          <h3>Components Explorer</h3>
          <p>Find and manage all your components in one place. Instantly locate instances.</p>
        </article>
        <article>
          <h3>Icon Library with Variables</h3>
          <p>Control your entire icon library with variables.</p>
        </article>
      </section>
    </main>
  `,
  projects: `
    <header>
      <h1>Projects shaping better digital experiences — Álex Salmerón</h1>
      <p>A selection of projects exploring Product Design, Design Systems, and new ways to connect design, technology, and AI to solve real-world problems.</p>
    </header>
    <main>
      <section>
        <article>
          <h2><a href="/project/waykout">Waykout — Collaborative Tourism Platform</a></h2>
          <p>Full product design and MVP for a collaborative tourism platform to discover and book authentic local experiences in Spain.</p>
        </article>
      </section>
    </main>
  `,
  articles: `
    <header>
      <h1>Articles by Álex Salmerón — Design Systems, Figma &amp; Product Design</h1>
    </header>
    <main>
      <article>
        <h2><a href="/articles/design-systems-scale">Design Systems at Scale: The Xnorb Case</a></h2>
        <p>How Álex Salmerón built a design system that allows 50+ designers to work synchronously without losing visual consistency.</p>
      </article>
      <article>
        <h2><a href="/articles/figma-variables-workflow">Figma Variables: A Paradigm Shift in Design Systems</a></h2>
        <p>How Figma Variables changed the way we structure design files — from styles to design logic.</p>
      </article>
      <article>
        <h2><a href="/articles/product-design-future">The Future of Product Design in the AI Era</a></h2>
        <p>Reflections on how artificial intelligence is redefining the role of product designers.</p>
      </article>
    </main>
  `,
  project_waykout: `
    <header>
      <h1>Waykout — Collaborative Tourism Platform — Case Study by Álex Salmerón</h1>
    </header>
    <main>
      <p>Waykout is a marketplace for authentic local tourist experiences in the Region of Murcia, Spain. Full product design, UX research and MVP led by Álex Salmerón, Senior Product Designer and co-founder.</p>
      <p>The design focused on removing barriers to entry for hosts and travelers in a low-digitized sector, implementing passwordless authentication, AI-assisted publishing, and a comprehensive Figma UI Kit.</p>
    </main>
  `,
  project_animal_rescue: `
    <header>
      <h1>Ayuda Incendios Madrid y Ávila 2025 — Case Study by Álex Salmerón</h1>
    </header>
    <main>
      <p>Plataforma de matching ágil para conectar avisos de auxilio y rescate animal con personas voluntarias durante los incendios de Madrid y Ávila 2025.</p>
    </main>
  `,
  project_gaztelugatxe_tracker: `
    <header>
      <h1>Gaztelugatxe Tickets Tracker — Case Study by Álex Salmerón</h1>
    </header>
    <main>
      <p>Rastreador y automatizador de reservas en tiempo real para cancelaciones en San Juan de Gaztelugatxe.</p>
    </main>
  `,
  project_dribbble: `
    <header>
      <h1>Dribbble Explorations &amp; UI Design — Álex Salmerón</h1>
    </header>
    <main>
      <p>Colección de conceptos de diseño de producto, sistemas de interfaz, data grids y flujos móviles compartidos en Dribbble por Álex Salmerón.</p>
    </main>
  `,
  article_ds: `
    <header>
      <h1>Design Systems at Scale: The Xnorb Case — by Álex Salmerón</h1>
    </header>
    <main>
      <p>How Álex Salmerón built a multi-brand design system that allows more than 50 designers to work synchronously without losing visual consistency. Practical insights on DesignOps, token architecture and component governance.</p>
    </main>
  `,
  article_variables: `
    <header>
      <h1>Figma Variables: A Paradigm Shift in Design Systems — by Álex Salmerón</h1>
    </header>
    <main>
      <p>Álex Salmerón explores how Figma Variables have forever changed the way we structure design files. It's no longer about styles — it's about design logic, token architecture and scalable systems.</p>
    </main>
  `,
  article_ai: `
    <header>
      <h1>The Future of Product Design in the AI Era — by Álex Salmerón</h1>
    </header>
    <main>
      <p>Reflections by Álex Salmerón on how artificial intelligence is redefining the role of product designers and what skills will matter most in the coming years.</p>
    </main>
  `
};

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.mefaltaunpixel.es/#website",
      "url": "https://www.mefaltaunpixel.es",
      "name": "Álex Salmerón",
      "alternateName": ["Alex Salmeron", "mefaltaunpixel", "mefaltaunpixel.es"],
      "publisher": {
        "@id": "https://www.mefaltaunpixel.es/#person"
      },
      "inLanguage": ["es", "en"]
    },
    {
      "@type": "Person",
      "@id": "https://www.mefaltaunpixel.es/#person",
      "name": "Álex Salmerón",
      "alternateName": "Alex Salmeron",
      "jobTitle": "Senior Product Designer",
      "url": "https://www.mefaltaunpixel.es",
      "image": "https://www.mefaltaunpixel.es/og-image.png",
      "description": "Senior Product Designer based in Murcia, Spain, with 15+ years of experience. Specialized in Visual Design, Design Systems and DesignOps.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Murcia",
        "addressRegion": "Murcia",
        "addressCountry": "ES"
      },
      "knowsAbout": [
        "Product Design",
        "Design Systems",
        "DesignOps",
        "Visual Design",
        "UX Research",
        "Figma",
        "UI Design",
        "Prototyping",
        "Component Libraries",
        "Design Tokens"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Senior Product Designer",
        "occupationLocation": {
          "@type": "City",
          "name": "Murcia"
        },
        "skills": "Product Design, Design Systems, DesignOps, Figma, Visual Design, UX Research"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Cella Medical Solutions"
      },
      "sameAs": [
        "https://www.linkedin.com/in/alexsalmeron/",
        "https://dribbble.com/mefaltaunpixel",
        "https://www.figma.com/@mefaltaunpixel",
        "https://x.com/mefaltaunpixel"
      ]
    }
  ]
};

const ROUTES = [
  { path: '', seoKey: 'home', contentKey: 'home' },
  { path: 'about', seoKey: 'about', contentKey: 'about' },
  { path: 'soul', seoKey: 'soul', contentKey: 'soul' },
  { path: 'resources', seoKey: 'resources', contentKey: 'resources' },
  { path: 'projects', seoKey: 'projects', contentKey: 'projects' },
  { path: 'project/waykout', seoKey: 'projects.waykout', contentKey: 'project_waykout' },
  { path: 'project/animal-rescue', seoKey: 'projects.animal_rescue', contentKey: 'project_animal_rescue' },
  { path: 'project/gaztelugatxe-tracker', seoKey: 'projects.gaztelugatxe_tracker', contentKey: 'project_gaztelugatxe_tracker' },
  { path: 'project/dribbble', seoKey: 'projects.dribbble', contentKey: 'project_dribbble' }
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
    const seo = getNestedValue(SEO_DATA, route.seoKey);
    const content = HTML_CONTENT[route.contentKey];

    if (!seo || !content) {
      console.warn(`Missing SEO or Content for route: ${route.path}`);
      return;
    }

    let html = template;

    // 1. Set html lang attribute
    html = html.replace(/<html lang=".*?">/, '<html lang="en">');

    // 1.5 Inject canonical (and robots noindex for articles)
    const baseUrl = 'https://www.mefaltaunpixel.es';
    const canonicalUrl = route.path === '' ? baseUrl : `${baseUrl}/${route.path}`;
    
    const seoLinks = `<link rel="canonical" href="${canonicalUrl}" />`;
    html = html.replace('<!-- SEO_LINKS -->', seoLinks);

    // 1.6 Update robots meta tag for articles
    if (route.path.startsWith('articles')) {
      html = html.replace(
        /<meta name="robots" content="index, follow" \/>/,
        '<meta name="robots" content="noindex, nofollow" />'
      );
    }

    // 2. Set title
    html = html.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`);

    // 3. Set description
    html = html.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${seo.desc}" />`
    );
    html = html.replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${seo.desc}">`
    );

    // 4. Update Open Graph and Twitter
    html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${seo.title}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${seo.desc}" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta property="twitter:title" content=".*?" \/>/g, `<meta property="twitter:title" content="${seo.title}" />`);
    html = html.replace(/<meta property="twitter:description" content=".*?" \/>/g, `<meta property="twitter:description" content="${seo.desc}" />`);
    html = html.replace(/<meta property="twitter:url" content=".*?" \/>/g, `<meta property="twitter:url" content="${canonicalUrl}" />`);

    // 5. Inject Schema.org
    const schemaScript = `
    <script type="application/ld+json">
      ${JSON.stringify(SCHEMA_DATA, null, 2)}
    </script>`;
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaScript);

    // 6. Inject fallback HTML
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root"><div class="sr-only-fallback">${content}</div></div>`
    );

    // 7. Save file
    const outputDir = route.path === '' ? DIST_DIR : path.join(DIST_DIR, route.path);
    ensureDirSync(outputDir);
    fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
    console.log(`Pre-rendered: /${route.path}`);
  });

  generateSitemap();

  // For the SPA fallback, the root dist/index.html is already the template
  // We can just leave it as it was generated by Vite, so it handles client-side correctly.
  // Wait, if it exists, Cloudflare will serve it for / . 
  // Since we no longer use worker.ts to redirect /, the root dist/index.html WILL BE SERVED correctly for /.
  // Our prerender script just overwrote dist/index.html with the pre-rendered home page!
  // This is PERFECT.

  console.log('Pre-rendering finished successfully!');
}

function generateSitemap() {
  console.log('Generating sitemap.xml...');
  const baseUrl = 'https://www.mefaltaunpixel.es';

  const pages = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: 'about', priority: '0.8', changefreq: 'weekly' },
    { path: 'soul', priority: '0.8', changefreq: 'weekly' },
    { path: 'project/waykout', priority: '0.8', changefreq: 'monthly' },
    { path: 'project/animal-rescue', priority: '0.8', changefreq: 'monthly' },
    { path: 'project/gaztelugatxe-tracker', priority: '0.8', changefreq: 'monthly' }
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  pages.forEach(page => {
    const currentUrl = page.path === '' ? baseUrl : `${baseUrl}/${page.path}`;
    xml += '  <url>\n';
    xml += `    <loc>${currentUrl}</loc>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log('Sitemap.xml written successfully to dist/');
}

prerender();
