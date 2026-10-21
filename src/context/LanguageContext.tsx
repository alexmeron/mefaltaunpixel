import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mefaltaunpixel_lang') as Language;
      if (saved === 'es' || saved === 'en') return saved;
      // Detect browser language
      const browserLang = navigator.language?.toLowerCase() ?? '';
      if (browserLang.startsWith('es')) return 'es';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mefaltaunpixel_lang', lang);
    }
  };

  const translations: Record<Language, Record<string, string>> = {
    es: {
      nav_hello: "Hola",
      nav_projects: "Proyectos",
      nav_about: "Sobre mí",
      nav_soul: "Soul",
      nav_work: "Hola",
      nav_articles: "Artículos",
      nav_resume: "CV",
      hero_title: "¡Hola! ¡Soy Álex!",
      hero_subtitle: "Diseñando mejores formas de trabajar",
      hero_statement: "Diseñador de producto con más de 15 años de experiencia, combinando diseño de producto, sistemas de diseño y flujos de trabajo potenciados por IA para ayudar a equipos a construir mejores productos digitales, trabajar de forma más eficiente y escalar con consistencia.",
      waykout_title: "Waykout",
      waykout_desc: "Rediseñando la forma en que los viajeros descubren destinos auténticos en España.",
      helix_title: "85 UI Kit",
      helix_desc: "Un UI kit completo y robusto creado para unificar la experiencia de marca, acelerar los flujos de diseño y desarrollo, y garantizar la consistencia en múltiples productos digitales.",
      skills_intro: "Metodologías, herramientas y áreas de especialización",
      footer_intro: "¿Tienes un proyecto en mente, una oportunidad que comentar o simplemente quieres saludar?",
      footer_about_work: "Para más detalles sobre mi trabajo,",
      footer_reach: "Conecta conmigo en",
      footer_explore: "o explora más en",
      footer_question: "¿Tienes una pregunta, una idea o te falta un pixel? Escríbeme a",
      soul_placeholder: "Pregunta cualquier cosa sobre Álex",
      soul_greeting: "Hola. Soy Soul. ¿Qué quieres saber sobre Álex?",
      soul_suggestion_about: "Sobre Álex",
      soul_suggestion_current: "Rol actual",
      soul_suggestion_skills: "Habilidades",
      soul_suggestion_located: "Ubicación",
      soul_suggestion_bronx: "¿Quién es Bronx?",
      soul_suggestion_social: "Redes",
      soul_send: "ENVIAR",
      footer_contact: "Hablemos de tu próximo proyecto",
      footer_email: "Enviar Email",
      theme_dark: "Modo Oscuro",
      theme_light: "Modo Claro",
      footer_rights: "© 2025 Álex Salmerón. Todos los derechos reservados.",
      // SEO ES
      seo_home_title: "Álex Salmerón - Diseñador de Producto Senior",
      seo_home_desc: "Portfolio de Álex Salmerón, diseñador de producto senior en Murcia, especializado en sistemas de diseño y DesignOps. Descubre mis proyectos de diseño y herramientas para Figma.",
      seo_about_title: "Sobre Álex Salmerón — Senior Product Designer & DesignOps",
      seo_about_desc: "Conoce la trayectoria de +15 años de Álex Salmerón en diseño de producto. Especialista en Design Systems, Figma y UI escalable. Apasionado de la vida activa.",
      seo_soul_title: "Soul AI | Álex Salmerón - Asistente Personal de Diseño",
      seo_soul_desc: "Interactúa con Soul, mi IA personalizada. Resuelve dudas sobre mi experiencia en Design Systems, metodología de trabajo y proyectos de diseño de producto.",
      seo_project_suffix: " | Proyecto de Diseño de Producto por Álex Salmerón",
      seo_articles_title: "Artículos | Álex Salmerón - Product Designer",
      seo_articles_desc: "Lee mis últimos artículos sobre sistemas de diseño, flujos de trabajo en Figma y el futuro del diseño de producto.",
      // Lab Section ES
      lab_title: "Un pequeño espacio para experimentar sin restricciones y compartir recursos con la comunidad. Utilizado por más de 1000 diseñadores en todo el mundo.",
      lab_badge_plugin: "Figma Plugin",
      lab_badge_resource: "Resources",
      lab_try_figma: "Pruébalo en Figma",
      lab_item1_title: "Log de cambios en tiempo real para variables de Figma.",
      lab_item1_desc: "Rastrea cada actualización, autor y valor, directamente dentro de tu archivo.",
      lab_item2_title: "Crea y gestiona modos de variables ilimitados en Figma.",
      lab_item2_desc: "Construye sistemas de diseño escalables, flexibles y consistentes, sin límites de plan.",
      lab_item3_title: "Encuentra y gestiona todos tus componentes en un solo lugar.",
      lab_item3_desc: "Localiza instancias al instante y mira dónde se están usando en todo tu archivo.",
      lab_item4_title: "Controla toda tu librería de iconos con variables.",
      lab_item4_desc: "Asegura la consistencia y actualizaciones flexibles en todos tus proyectos.",
      lab_item5_title: "Documentación de flujos de usuario en Figma.",
      lab_item5_desc: "Anotaciones sobre flujos y comportamiento de componentes para reducir la brecha entre diseño y desarrollo.",
      lab_item6_title: "Estructura para documentar componentes.",
      lab_item6_desc: "Flujo de trabajo en Figma para crear librerías de componentes comprensibles y mantenibles.",
      articles_title: "Artículos",
      articles_subtitle: "Compartiendo pensamientos sobre diseño, tecnología y flujos de trabajo.",
      articles_min_read: "min de lectura",
      articles_read_more: "Leer más"
    },
    en: {
      nav_hello: "Hello",
      nav_projects: "Projects",
      nav_about: "About",
      nav_soul: "Soul",
      nav_work: "Hello",
      nav_articles: "Articles",
      nav_resume: "Resume",
      hero_title: "Hello, I’m Álex!",
      hero_subtitle: "Designing better ways to work",
      hero_statement: "Product designer with 15+ years of experience, combining product design, design systems, and AI-powered workflows to help teams build better digital products, work more efficiently, and scale with consistency.",
      waykout_title: "Waykout",
      waykout_desc: "Redesigning the way travelers discover authentic destinations in Spain.",
      helix_title: "85 UI Kit",
      helix_desc: "A complete and robust UI kit built to unify brand experience, accelerate design and development workflows, and guarantee consistency across multiple digital products.",
      skills_intro: "Methodologies, tools, and areas of expertise",
      footer_intro: "Have a project in mind, an opportunity to discuss, or just want to say hi?",
      footer_about_work: "For details about my work,",
      footer_reach: "Connect with me on",
      footer_explore: "or explore more on",
      footer_question: "Got a question, an idea, or missing a pixel? Drop a line to",
      soul_placeholder: "Ask anything about Álex",
      soul_greeting: "Hi. I'm Soul. What do you want to know about Álex?",
      soul_suggestion_about: "About Álex",
      soul_suggestion_current: "Current role",
      soul_suggestion_skills: "Skills",
      soul_suggestion_located: "Located",
      soul_suggestion_bronx: "Who is Bronx?",
      soul_suggestion_social: "Social",
      soul_send: "SEND",
      footer_contact: "Let's talk about your next project",
      footer_email: "Send Email",
      theme_dark: "Dark Mode",
      theme_light: "Light Mode",
      footer_rights: "© 2025 Álex Salmerón. All rights reserved.",
      // SEO EN
      seo_home_title: "Álex Salmerón - Senior Product Designer",
      seo_home_desc: "Portfolio of Álex Salmerón, senior product designer based in Murcia, Spain, specialized in design systems and DesignOps. Discover my design projects and tools for Figma.",
      seo_about_title: "About Álex Salmerón — Senior Product Designer & DesignOps",
      seo_about_desc: "Discover Álex Salmerón's 15+ year journey in Product Design. Specialist in Design Systems, Figma, and scalable UI. Living in Spain, passionate about active life.",
      seo_soul_title: "Soul AI | Álex Salmerón - Personal Design Assistant",
      seo_soul_desc: "Chat with Soul, my custom AI assistant. Get insights into my experience with Design Systems, workflows, and product design projects.",
      seo_project_suffix: " | Product Design Project by Álex Salmerón",
      seo_articles_title: "Articles | Álex Salmerón - Product Designer",
      seo_articles_desc: "Read my latest articles about design systems, Figma workflows, and the future of product design.",
      // Lab Section EN
      lab_title: "A small space to experiment without constraints and share resources with the community. Used by 1000+ designers worldwide.",
      lab_badge_plugin: "Figma Plugin",
      lab_badge_resource: "Resources",
      lab_try_figma: "Try it in Figma",
      lab_item1_title: "Real-time change log for Figma variables.",
      lab_item1_desc: "Track every update, author, and value—right inside your file.",
      lab_item2_title: "Create and manage unlimited variable modes in Figma.",
      lab_item2_desc: "Build scalable, flexible, and consistent design systems—without plan limits.",
      lab_item3_title: "Find and manage all your components in one place.",
      lab_item3_desc: "Instantly locate instances and see where they’re used across your file.",
      lab_item4_title: "Control your entire icon library with variables.",
      lab_item4_desc: "Ensure consistency and flexible updates across projects.",
      lab_item5_title: "UI flow documentation in Figma.",
      lab_item5_desc: "Annotations on user flows and component behavior to reduce design-to-development gaps.",
      lab_item6_title: "Component documentation structure.",
      lab_item6_desc: "Figma workflow structure to build understandable and maintainable component libraries.",
      articles_title: "Articles",
      articles_subtitle: "Sharing thoughts on design, technology, and workflows.",
      articles_min_read: "min read",
      articles_read_more: "Read more"
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t('seo_home_title');
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('seo_home_desc'));
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
