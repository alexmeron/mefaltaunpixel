import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { HomeFeatureSections } from '../components/HomeFeatureSections';
import { HeroStatement } from '../components/HeroStatement';
import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { t } = useLanguage();
  return (
    <main className="home-page">
      <SEO 
        title={t('seo_home_title')} 
        description={t('seo_home_desc')} 
      />
      <Hero />
      <section className="hero-statement-section">
        <motion.div 
          className="hero-statement-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroStatement />
        </motion.div>
      </section>
      <HomeFeatureSections />
      <Skills />
    </main>
  );
};
