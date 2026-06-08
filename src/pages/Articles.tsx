import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';

import iconsVar from '../assets/images/icons-var.png?format=webp&w=908';
import modesImg from '../assets/images/modes.png?format=webp&w=1324';

interface Article {
  id: string;
  date: string;
  readTime: string;
  title: {
    es: string;
    en: string;
  };
  excerpt: {
    es: string;
    en: string;
  };
  image: string;
  category: string;
}

const ARTICLES: Article[] = [
  {
    id: 'design-systems-scale',
    date: 'Apr 24, 2024',
    readTime: '8',
    title: {
      es: 'Sistemas de Diseño a escala: El caso Xnorb',
      en: 'Design Systems at Scale: The Xnorb Case'
    },
    excerpt: {
      es: 'Cómo construimos un sistema que permite a más de 50 diseñadores trabajar de forma síncrona sin perder la consistencia.',
      en: 'How we built a system that allows more than 50 designers to work synchronously without losing consistency.'
    },
    image: '/original-ds.webp',
    category: 'Design Systems'
  },
  {
    id: 'figma-variables-workflow',
    date: 'Mar 12, 2024',
    readTime: '12',
    title: {
      es: 'Figma Variables: Un cambio de paradigma en el flujo de diseño',
      en: 'Figma Variables: A Paradigm Shift in Design Workflow'
    },
    excerpt: {
      es: 'Guía completa sobre cómo implementar variables para mejorar el traspaso a desarrollo y la flexibilidad del producto.',
      en: 'Comprehensive guide on how to implement variables to improve development handoff and product flexibility.'
    },
    image: iconsVar,
    category: 'DesignOps'
  },
  {
    id: 'product-design-future',
    date: 'Jan 15, 2024',
    readTime: '6',
    title: {
      es: 'El futuro del Diseño de Producto en la era de la IA',
      en: 'The Future of Product Design in the AI Era'
    },
    excerpt: {
      es: 'Reflexiones sobre cómo la inteligencia artificial está redefiniendo nuestro rol como diseñadores y creadores.',
      en: 'Reflections on how artificial intelligence is redefining our role as designers and creators.'
    },
    image: modesImg,
    category: 'Thinking'
  }
];

export const Articles = () => {
  const { language, t } = useLanguage();

  return (
    <main className="articles-page page-wrapper">
      <SEO 
        title={t('seo_articles_title')} 
        description={t('seo_articles_desc')} 
        lang={language}
      />
      
      <header className="articles-header">
        <div className="articles-title-container">
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('articles_title')}
          </motion.h1>
        </div>
      </header>

      <section className="articles-list">
        {ARTICLES.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/${language}/articles/${article.id}`} className="article-item">
              <div className="article-content">
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="meta-sep">•</span>
                  <span className="article-date">{article.date}</span>
                  <span className="meta-sep">•</span>
                  <span className="article-readtime">{article.readTime} min read</span>
                </div>
                
                <h2 className="article-title">{article.title[language]}</h2>
                <p className="article-excerpt">{article.excerpt[language]}</p>
              </div>
              
              <div className="article-image-container">
                <img src={article.image} alt={article.title[language]} className="article-image" />
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
};
