import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{t('hero_title')}</h1>
        <p className="hero-description">
          {t('hero_subtitle')}
        </p>
      </div>
    </section>
  );
};
