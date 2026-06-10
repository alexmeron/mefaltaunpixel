import React from 'react';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Lab } from '../components/Lab';
import { Skills } from '../components/Skills';
import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { language, t } = useLanguage();
  return (
    <main className="home-page">
      <SEO 
        title={t('seo_home_title')} 
        description={t('seo_home_desc')} 
      />
      <Hero />
      <Projects />
      <Lab />
      <Skills />
    </main>
  );
};
