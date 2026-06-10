import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const EmailLink = () => {
  const user = "pixel";
  const domain = "mefaltaunpixel.es";
  const fullEmail = `${user}@${domain}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${fullEmail}`;
  };

  return (
    <a 
      href="#" 
      onClick={handleClick} 
      className="footer-bold footer-email"
      title="Enviar email"
    >
      {fullEmail}
    </a>
  );
};

export const Skills = () => {
  const { t } = useLanguage();
  return (
    <>
      <section className="skills page-wrapper">
        <h2 className="skills-intro">
          {t('skills_intro')}
        </h2>
        <div className="skills-content">
          <p className="skills-list">
            Product Design (end-to-end) / Design Systems / Systems thinking /<br />
            Prototyping / Research / Collaboration with product & engineering /<br />
            Figma / Zeroheight / Git / GitHub / AI workflows (Claude) / HTML / CSS
          </p>
        </div>
      </section>

      <footer className="footer page-wrapper">
        <h2 className="footer-contact">
          <span className="footer-regular">{t('footer_reach')}</span>{' '}
          <a href="https://www.linkedin.com/in/alexsalmeron/" target="_blank" rel="noreferrer" className="footer-bold">LinkedIn</a>{' '}
          <span className="footer-regular">{t('footer_explore')}</span>{' '}
          <a href="https://www.figma.com/@mefaltaunpixel/" target="_blank" rel="noreferrer" className="footer-bold">Figma</a>{' '}
          <span className="footer-regular">&</span>{' '}
          <a href="https://dribbble.com/mefaltaunpixel" target="_blank" rel="noreferrer" className="footer-bold">Dribbble</a><span className="footer-regular">.</span>
        </h2>
        
        <div className="footer-divider"></div>
        
        <div className="footer-email-area">
          <EmailLink />
        </div>
      </footer>
    </>
  );
};
