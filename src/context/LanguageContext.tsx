import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');

  const translations: any = {
    es: {
      nav_soul: "Soul",
      nav_about: "Sobre mí",
      nav_work: "Proyectos",
      nav_articles: "Artículos (próximamente)",
      nav_resume: "CV",
      hero_title: "¡Hola! ¡Soy Alex!",
      hero_subtitle: "Diseñador de Producto con más de 15 años de experiencia. Especializado en Sistemas de Diseño que permiten a equipos y empresas escalar con velocidad y consistencia.",
      waykout_title: "Waykout",
      waykout_desc: "Rediseñando la forma en que los viajeros descubren destinos auténticos en España.",
      helix_title: "85 UI Kit",
      helix_desc: "Un UI kit completo y robusto creado para unificar la experiencia de marca, acelerar los flujos de diseño y desarrollo, y garantizar la consistencia en múltiples productos digitales.",
      skills_intro: "Metodologías, herramientas y áreas de especialización",
      footer_about_work: "Para más detalles sobre mi trabajo,",
      footer_reach: "contáctame en",
      soul_placeholder: "Pregunta cualquier cosa sobre Alex",
      soul_greeting: "Hola. Soy Soul. ¿Qué quieres saber sobre Alex?",
      soul_suggestion_about: "Sobre Alex",
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
      footer_rights: "© 2025 Alex Salmerón. Todos los derechos reservados.",
      // SEO ES
      seo_home_title: "Alex Salmerón - Diseñador de Producto Senior",
      seo_home_desc: "Portfolio de Alex Salmerón, diseñador de producto senior en Murcia, especializado en sistemas de diseño y DesignOps. Descubre mis proyectos de diseño y herramientas para Figma.",
      seo_about_title: "Sobre mí | Alex Salmerón - Product Designer",
      seo_about_desc: "Conoce la trayectoria de Alex Salmerón, product designer en Murcia desde 2007, especialista en Design Systems y Figma. Descubre mi biblioteca de diseño y mi pasión por el crossfit y la naturaleza.",
      seo_soul_title: "Soul AI | Alex Salmerón - Asistente Personal de Diseño",
      seo_soul_desc: "Interactúa con Soul, mi IA personalizada. Resuelve dudas sobre mi experiencia en Design Systems, metodología de trabajo y proyectos de diseño de producto.",
      seo_project_suffix: " | Proyecto de Diseño de Producto por Alex Salmerón",
      // Lab Section ES
      lab_title: "Un pequeño espacio para experimentar sin restricciones y compartir recursos con la comunidad",
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
      lab_item5_title: "Documentación de flujos de usuario.",
      lab_item5_desc: "Anotaciones sobre flujos y comportamiento de componentes para evitar dudas en desarrollo.",
      lab_item6_title: "Estructura para documentar componentes.",
      lab_item6_desc: "Flujo de trabajo en Figma para crear librerías de componentes comprensibles y mantenibles.",
      articles_title: "Artículos",
      articles_subtitle: "Compartiendo pensamientos sobre diseño, tecnología y flujos de trabajo.",
      articles_min_read: "min de lectura",
      articles_read_more: "Leer más",
      seo_articles_title: "Artículos | Alex Salmerón - Product Designer",
      seo_articles_desc: "Lee mis últimos artículos sobre sistemas de diseño, flujos de trabajo en Figma y el futuro del diseño de producto.",
    },
    en: {
      nav_soul: "Soul",
      nav_about: "About",
      nav_work: "Work",
      nav_articles: "Articles",
      nav_resume: "Resume",
      hero_title: "Hello! I'm Alex!",
      hero_subtitle: "Product Designer with over +15 years of experience. Specialized in Design Systems that allow teams and companies to scale with speed and consistency.",
      waykout_title: "Waykout",
      waykout_desc: "Redesigning the way travelers discover authentic destinations in Spain.",
      helix_title: "85 UI Kit",
      helix_desc: "A complete and robust UI kit built to unify brand experience, accelerate design and development workflows, and guarantee consistency across multiple digital products.",
      skills_intro: "Methodologies, tools, and areas of expertise",
      footer_about_work: "For details about my work,",
      footer_reach: "reach out on",
      soul_placeholder: "Ask anything about Alex",
      soul_greeting: "Hi. I'm Soul. What do you want to know about Alex?",
      soul_suggestion_about: "About Alex",
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
      footer_rights: "© 2025 Alex Salmerón. All rights reserved.",
      // SEO EN
      seo_home_title: "Alex Salmerón - Senior Product Designer",
      seo_home_desc: "Portfolio of Alex Salmerón, senior product designer based in Murcia, Spain, specialized in design systems and DesignOps. Discover my design projects and tools for Figma.",
      seo_about_title: "About | Alex Salmerón - Product Designer",
      seo_about_desc: "Explore my professional journey since 2007. Specialist in DesignOps and Figma Camp. Discover my design library and my passion for nature and life with Bronx.",
      seo_soul_title: "Soul AI | Alex Salmerón - Personal Design Assistant",
      seo_soul_desc: "Chat with Soul, my custom AI assistant. Get insights into my experience with Design Systems, workflows, and product design projects.",
      seo_project_suffix: " | Product Design Project by Alex Salmerón",
      seo_articles_title: "Articles | Alex Salmerón - Product Designer",
      seo_articles_desc: "Read my latest articles about design systems, Figma workflows, and the future of product design.",
      // Lab Section EN
      lab_title: "A small space to experiment without constraints and share resources with the community",
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

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t('seo_home_title');
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('seo_home_desc'));
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

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
