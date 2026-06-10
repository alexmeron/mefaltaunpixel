import React, { createContext, useContext, useEffect } from 'react';

type Language = 'en';

interface LanguageContextType {
  language: Language;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: Language = 'en';

  const translations: any = {
    en: {
      nav_soul: "Soul",
      nav_about: "About",
      nav_work: "Work",
      nav_articles: "Articles",
      nav_resume: "Resume",
      hero_title: "Hello! I'm Álex!",
      hero_subtitle: "Product Designer with 15+ years of experience, specialized in Visual Design and Design Systems that help teams build consistent, scalable and maintainable digital products.",
      waykout_title: "Waykout",
      waykout_desc: "Redesigning the way travelers discover authentic destinations in Spain.",
      helix_title: "85 UI Kit",
      helix_desc: "A complete and robust UI kit built to unify brand experience, accelerate design and development workflows, and guarantee consistency across multiple digital products.",
      skills_intro: "Methodologies, tools, and areas of expertise",
      footer_about_work: "For details about my work,",
      footer_reach: "Connect with me on",
      footer_explore: "or explore more on",
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
      seo_about_title: "About | Álex Salmerón - Product Designer",
      seo_about_desc: "Explore my professional journey since 2007. Specialist in DesignOps and Figma Camp. Discover my design library and my passion for nature and life with Bronx.",
      seo_soul_title: "Soul AI | Álex Salmerón - Personal Design Assistant",
      seo_soul_desc: "Chat with Soul, my custom AI assistant. Get insights into my experience with Design Systems, workflows, and product design projects.",
      seo_project_suffix: " | Product Design Project by Álex Salmerón",
      seo_articles_title: "Articles | Álex Salmerón - Product Designer",
      seo_articles_desc: "Read my latest articles about design systems, Figma workflows, and the future of product design.",
      // Lab Section EN
      lab_title: "A small space to experiment without constraints and share resources with the community. Used by 500+ designers worldwide.",
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

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
