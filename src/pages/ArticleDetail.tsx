import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ArticleDetail = () => {
  const { id, lang } = useParams<{ id: string, lang: string }>();
  const { language, t } = useLanguage();
  const [readingTime, setReadingTime] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sample data (In a real app, this would be in a CMS or translations)
  const articlesData: any = {
    'design-systems-scale': {
      title: {
        es: 'Sistemas de Diseño a escala: El caso Xnorb',
        en: 'Design Systems at Scale: The Xnorb Case'
      },
      category: 'Design Systems',
      date: 'Apr 24, 2024',
      readTime: '8',
      image: '/original-ds.webp',
      content: {
        es: `
          <p>Los sistemas de diseño no son solo bibliotecas de componentes; son el lenguaje vivo de un producto. En Xnorb, nos enfrentamos al reto de escalar nuestra visión de diseño a través de múltiples equipos y geografías.</p>
          <h2>El Problema del Crecimiento</h2>
          <p>Cuando el equipo creció más allá de los 50 diseñadores, la consistencia empezó a fragmentarse. Cada equipo interpretaba las guías de estilo de manera diferente, creando silos de diseño que afectaban directamente a la experiencia del usuario final.</p>
          <blockquote>"Un sistema de diseño exitoso es aquel que se vuelve invisible."</blockquote>
          <h2>La Solución: Figma Variables</h2>
          <p>Implementamos un sistema basado íntegramente en variables de Figma, permitiendo el cambio instantáneo entre temas (Light/Dark) y densidades. Esto redujo el tiempo de traspaso a desarrollo en un 40%.</p>
          <p>En este artículo exploraremos cómo la automatización y la documentación integrada fueron las claves para que el sistema de diseño Xnorb fuera adoptado por toda la organización.</p>
        `,
        en: `
          <p>Design systems are not just component libraries; they are the living language of a product. At Xnorb, we faced the challenge of scaling our design vision across multiple teams and geographies.</p>
          <h2>The Growth Problem</h2>
          <p>When the team grew beyond 50 designers, consistency began to fragment. Each team interpreted style guides differently, creating design silos that directly affected the end-user experience.</p>
          <blockquote>"A successful design system is one that becomes invisible."</blockquote>
          <h2>The Solution: Figma Variables</h2>
          <p>We implemented a system based entirely on Figma variables, allowing instant switching between themes (Light/Dark) and densities. This reduced development handoff time by 40%.</p>
          <p>In this article we will explore how automation and integrated documentation were the keys to the Xnorb design system being adopted across the organization.</p>
        `
      }
    },
    'figma-variables-workflow': {
      title: {
        es: 'Figma Variables: Un cambio de paradigma',
        en: 'Figma Variables: A Paradigm Shift'
      },
      category: 'DesignOps',
      date: 'Mar 12, 2024',
      readTime: '12',
      image: '/icons-var.png',
      content: {
        es: `<p>Las variables han cambiado para siempre cómo estructuramos nuestros archivos. Ya no se trata de estilos, sino de lógica de diseño.</p>`,
        en: `<p>Variables have forever changed how we structure our files. It's no longer about styles, but about design logic.</p>`
      }
    }
  };

  const article = articlesData[id || ''] || articlesData['design-systems-scale'];

  return (
    <main className="article-detail-page page-wrapper">
      <SEO 
        title={`${article.title[language]} | Alex Salmerón`}
        description={article.title[language]}
        lang={language}
      />

      <motion.div className="reading-progress-bar" style={{ scaleX }} />

      <div className="article-detail-container">
        <header className="article-detail-header">
          <div className="article-detail-meta">
            <span className="detail-category">{article.category}</span>
            <span className="meta-sep">•</span>
            <div className="meta-item"><Calendar size={16} /> <span>{article.date}</span></div>
            <span className="meta-sep">•</span>
            <div className="meta-item"><Clock size={16} /> <span>{article.readTime} min read</span></div>
          </div>

          <h1 className="article-detail-title">{article.title[language]}</h1>

          <div className="article-author-card">
            <div className="author-info">
              <span className="author-name">Álex Salmerón</span>
              <span className="author-role">Product Designer</span>
            </div>
          </div>
        </header>

        <div className="article-detail-hero">
          <img src={article.image} alt={article.title[language]} />
        </div>

        <div 
          className="article-detail-content"
          dangerouslySetInnerHTML={{ __html: article.content[language] }}
        />

        <footer className="article-detail-footer">
          <div className="footer-tags">
            <div className="tag"><Tag size={14} /> Design Systems</div>
            <div className="tag"><Tag size={14} /> Figma</div>
            <div className="tag"><Tag size={14} /> DesignOps</div>
          </div>
        </footer>
      </div>
    </main>
  );
};
