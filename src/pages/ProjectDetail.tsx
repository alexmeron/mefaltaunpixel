import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projects-data';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

const GreyPlaceholder = ({ height = "600px", label = "" }: { height?: string, label?: string }) => (
  <div style={{ 
    width: '100%', 
    height: height, 
    backgroundColor: 'var(--text)', 
    opacity: 0.05, 
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  }}>
    {label}
  </div>
);

const ProjectMeta = ({ project, language }: { project: any, language: 'es' | 'en' }) => (
  <div className="project-meta-inline">
    <div className="meta-item">
      <span className="meta-label">{language === 'es' ? 'Categoría' : 'Category'}</span>
      <span className="meta-value">{project.category}</span>
    </div>
    <div className="meta-item">
      <span className="meta-label">{language === 'es' ? 'Año' : 'Year'}</span>
      <span className="meta-value">{project.year}</span>
    </div>
    <div className="meta-item">
      <span className="meta-label">{language === 'es' ? 'Rol' : 'Role'}</span>
      <span className="meta-value">{project.role}</span>
    </div>
  </div>
);

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const project = PROJECTS_DATA.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="project-not-found page-wrapper">
        <h2>Project not found</h2>
      </div>
    );
  }

  const seoTitle = `${project.title}${t('seo_project_suffix')}`;
  const seoDesc = project.description[language];

  return (
    <main className="project-detail-page page-wrapper">
      <SEO title={seoTitle} description={seoDesc} lang={language} />

      {/* Intro Text */}
      <section className="project-intro-section">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="project-intro-text"
        >
          {project.title} — {project.intro[language]}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="project-description-text"
        >
          {project.description[language]}
        </motion.div>
      </section>

      {/* Content Blocks */}
      <section className="project-content-blocks">
        {project.blocks.map((block, index) => (
          <React.Fragment key={index}>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`content-block block-${block.type}`}
            >
              {block.type === 'text' && (
                <div className="text-block-inner">
                  {block.title && <h3 className="block-title">{block.title[language]}</h3>}
                  {block.subtitle && <h4 className="block-subtitle">{block.subtitle[language]}</h4>}
                  <p className="block-content">{block.content?.[language]}</p>
                </div>
              )}

              {block.type === 'image' && (
                <div className="image-block-wrapper">
                  <GreyPlaceholder height="600px" label="IMAGE ASSET" />
                </div>
              )}

              {block.type === 'image-grid' && (
                <div className="image-grid-wrapper">
                  <GreyPlaceholder height="450px" label="UI VIEW A" />
                  <GreyPlaceholder height="450px" label="UI VIEW B" />
                </div>
              )}

              {block.type === 'quote' && (
                <div className="quote-block-wrapper">
                  <blockquote className="project-quote">
                    {block.content?.[language]}
                  </blockquote>
                </div>
              )}
            </motion.div>
            
            {/* Insert Metadata after the first text block (The Context) */}
            {block.type === 'text' && index === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="metadata-insertion"
              >
                <ProjectMeta project={project} language={language} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </section>
    </main>
  );
};
