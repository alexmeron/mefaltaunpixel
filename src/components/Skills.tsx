import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Skills = () => {

  const { t, language } = useLanguage();
  return (
    <>

      <footer className="footer page-wrapper">
        <div className="footer-connect-box">
          <p className="footer-intro-text">
            {t('footer_intro')}
          </p>
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
            <p className="footer-email-intro">
              {t('footer_question')}
            </p>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = ['mailto:', 'pixel', '@', 'mefaltaunpixel.es'].join('');
              }}
              onMouseEnter={(e) => {
                e.currentTarget.href = ['mailto:', 'pixel', '@', 'mefaltaunpixel.es'].join('');
              }}
              onFocus={(e) => {
                e.currentTarget.href = ['mailto:', 'pixel', '@', 'mefaltaunpixel.es'].join('');
              }}
              className="footer-bold footer-email"
              title={language === 'es' ? 'Enviar correo' : 'Send email'}
            >
              <span className="email-obfuscated">se.lexipnuatlafem@lexip</span>
            </a>
          </div>

        </div>
      </footer>

    </>
  );
};


