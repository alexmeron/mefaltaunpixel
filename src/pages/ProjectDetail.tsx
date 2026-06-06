import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projects-data';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

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

const VisitWebsiteLink = ({ language }: { language: 'es' | 'en' }) => (
  <a 
    href="https://www.waykout.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="visit-project-link"
  >
    <span>{language === 'es' ? 'Visitar waykout.com' : 'Visit waykout.com'}</span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  </a>
);

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const project = PROJECTS_DATA.find(p => p.id === id);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -sliderRef.current.offsetWidth * 0.8 : sliderRef.current.offsetWidth * 0.8;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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

  // --- CUSTOM WAYKOUT CASE STUDY LAYOUT ---
  if (id === 'waykout') {
    const seoTitle = `Waykout | ${language === 'es' ? 'Proyecto de Diseño de Producto por Alex Salmerón' : 'Product Design Project by Alex Salmerón'}`;
    const seoDesc = language === 'es'
      ? "Waykout es una plataforma de turismo colaborativo para descubrir y reservar experiencias locales auténticas en la Región de Murcia. Diseño de producto y MVP por Alex Salmerón."
      : "Waykout is a collaborative tourism platform to discover and book authentic local experiences in the Region of Murcia, Spain. Product design and MVP by Alex Salmerón.";

    return (
      <main className="project-detail-page page-wrapper">
        <SEO title={seoTitle} description={seoDesc} lang={language} />

        {/* Section 1: Hero */}
        <section className="project-intro-section" style={{ paddingBottom: '24px', paddingTop: '80px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="project-intro-text"
            style={{ marginBottom: '16px', fontSize: '64px', fontWeight: 500 }}
          >
            Waykout
          </motion.h1>

          {/* Visual tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="footer-tags" 
            style={{ marginBottom: '32px' }}
          >
            {['Product Design', 'UX Research', 'UI Kit', 'IA', 'MVP', '2025'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="project-description-text"
            style={{ fontSize: '26px', lineHeight: '1.4', fontWeight: 300, opacity: 0.9 }}
          >
            {language === 'es' 
              ? "Una plataforma que acerca el turismo auténtico a los rincones menos conocidos de España"
              : "A platform that brings authentic tourism to the lesser-known corners of Spain"}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ 
              fontSize: '18px', 
              lineHeight: '1.6', 
              fontWeight: 300, 
              opacity: 0.7, 
              marginTop: '24px',
              maxWidth: '800px'
            }}
          >
            {language === 'es'
              ? "Waykout es una plataforma de turismo colaborativo diseñada para conectar a viajeros que buscan descubrir la España real con anfitriones locales que ofrecen experiencias culturales, gastronómicas y de naturaleza auténticas. El producto nace con la misión de descentralizar el turismo de masas, dar visibilidad a regiones con un gran potencial inexplorado y revitalizar la economía de las comunidades locales a través de la tecnología."
              : "Waykout is a collaborative tourism platform designed to connect travelers looking to discover the real Spain with local hosts offering authentic cultural, gastronomic, and nature experiences. The product was born with the mission to decentralize mass tourism, give visibility to regions with unexplored potential, and revitalize local economies through technology."}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: '32px' }}
          >
            <VisitWebsiteLink language={language} />
          </motion.div>
        </section>

        {/* Horizontal Slider Section */}
        <section className="project-images-slider-container">
          <button className="slider-nav-btn prev" onClick={() => scrollSlider('left')} aria-label="Previous image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div className="project-images-slider" ref={sliderRef}>
            {[
              { src: 'waykout-hero.webp', alt: 'Waykout Hero' },
              { src: 'waykout-login-magiclink.webp', alt: 'Magic Link Passwordless Login' },
              { src: 'waykout-publicacion-ia.webp', alt: 'AI-assisted Publishing Interface' },
              { src: 'waykout-panel-anfitrion.webp', alt: 'Host Dashboard Calendar & Bookings' },
              { src: 'waykout-ui-kit.webp', alt: 'Figma UI Kit Design Library' }
            ].map((img, idx) => (
              <div key={idx} className="slider-slide">
                <img 
                  src={`/assets/projects/waykout/${img.src}`} 
                  alt={img.alt} 
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          <button className="slider-nav-btn next" onClick={() => scrollSlider('right')} aria-label="Next image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </section>

        {/* Inline Metadata Block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '0px', marginBottom: '24px' }}
        >
          <ProjectMeta project={project} language={language} />
        </motion.div>

        {/* Two Column Summary Block */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '64px',
            marginTop: '32px'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                {language === 'es' ? 'El diseño' : 'The design'}
              </h3>
              <p style={{ fontSize: '18px', lineHeight: '1.7', fontWeight: 300, opacity: 0.85 }}>
                {language === 'es' 
                  ? 'El diseño de Waykout se centró en eliminar las barreras de entrada y la complejidad de publicación en un sector poco digitalizado. Rediseñamos el flujo de registro eliminando la contraseña tradicional y sustituyéndola por un sistema sin contraseña (magic links) que reduce el abandono del usuario. Para los anfitriones, simplificamos la publicación de experiencias mediante una interfaz asistida por IA: el anfitrión describe brevemente su actividad y la inteligencia artificial redacta automáticamente títulos, puntos clave y descripciones optimizadas. El diseño se complementó con un completo UI Kit en Figma que garantiza consistencia visual en tarjetas, estados y componentes esenciales, escalando el desarrollo con coherencia.'
                  : 'The design of Waykout focused on removing barriers to entry and the complexity of publishing in a low-digitized sector. We redesigned the registration flow by eliminating the traditional password and replacing it with a passwordless system (magic links) that reduces user abandonment. For hosts, we simplified experience publishing through an AI-assisted interface: the host writes a brief description of their activity and the artificial intelligence automatically drafts optimized titles, key points, and descriptions. The design was complemented by a comprehensive UI Kit in Figma that guarantees visual consistency in cards, states, and essential components, scaling development cohesively.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                {language === 'es' ? 'Mi rol' : 'My role'}
              </h3>
              <p style={{ fontSize: '18px', lineHeight: '1.7', fontWeight: 300, opacity: 0.85 }}>
                {language === 'es'
                  ? 'Mi trabajo abarcó desde la validación inicial de la idea hasta el diseño completo del producto final. Lanzamos campañas segmentadas en Instagram y Google Ads para medir la demanda real de viajeros y anfitriones antes de escribir código. Con los datos obtenidos y las hipótesis validadas, prototipé y probé wireframes en ciclos iterativos con early adopters reales en la Región de Murcia. Además del diseño del flujo principal de usuarios y las herramientas de gestión interna para anfitriones, desarrollé el sistema visual y el UI Kit completo. Esto permitió lanzar un MVP que, en su primer mes, captó a más de 100 usuarios, 50 anfitriones activos y facilitó más de 120 reservas.'
                  : 'My work spanned from the initial validation of the idea to the complete design of the final product. We launched targeted campaigns on Instagram and Google Ads to measure the real demand of travelers and hosts before writing code. With the data obtained and hypotheses validated, I prototyped and tested wireframes in iterative cycles with real early adopters in the Region of Murcia. In addition to designing the main user flows and internal management tools for hosts, I developed the complete visual system and UI Kit. This enabled the launch of an MVP that, in its first month, attracted more than 100 users, 50 active hosts, and facilitated over 120 bookings.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Resultados */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="content-block"
          style={{ marginBottom: '120px' }}
        >
          <div className="text-block-inner" style={{ maxWidth: '100%' }}>
            <h3 className="block-title" style={{ fontSize: '36px', fontWeight: 500, marginBottom: '24px' }}>
              {language === 'es' ? 'Resultados' : 'Results'}
            </h3>
            
            {/* Metrics grid */}
            <div className="results-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              margin: '48px 0'
            }}>
              {[
                { 
                  numEs: '+100 usuarios', 
                  numEn: '+100 users', 
                  lblEs: 'el primer mes', 
                  lblEn: 'the first month' 
                },
                { 
                  numEs: '50 anfitriones', 
                  numEn: '50 hosts', 
                  lblEs: 'activos', 
                  lblEn: 'active' 
                },
                { 
                  numEs: '+50 experiencias', 
                  numEn: '+50 experiences', 
                  lblEs: 'publicadas', 
                  lblEn: 'published' 
                },
                { 
                  numEs: '+120 reservas', 
                  numEn: '+120 bookings', 
                  lblEs: 'realizadas', 
                  lblEn: 'completed' 
                }
              ].map((m, idx) => (
                <div key={idx} style={{
                  padding: '24px',
                  backgroundColor: 'var(--card-bg, rgba(0,0,0,0.02))',
                  border: '1px solid var(--border, rgba(0,0,0,0.05))',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '36px', 
                    fontWeight: 600, 
                    color: 'var(--text)',
                    lineHeight: '1.2'
                  }}>
                    {language === 'es' ? m.numEs : m.numEn}
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    opacity: 0.6, 
                    marginTop: '12px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    lineHeight: '1.4'
                  }}>
                    {language === 'es' ? m.lblEs : m.lblEn}
                  </div>
                </div>
              ))}
            </div>

            <p className="block-content" style={{ fontSize: '20px', lineHeight: '1.6', fontWeight: 300 }}>
              {language === 'es'
                ? 'Todo esto en el primer mes tras el lanzamiento del MVP, arrancando únicamente en la Región de Murcia y con una inversión controlada en campañas de validación. Esta estrategia local y segmentada nos permitió optimizar el coste de adquisición de clientes (CAC) desde el primer día, obteniendo un flujo continuo de feedback directo de anfitriones y viajeros. Al centralizar los esfuerzos en un área geográfica delimitada, pudimos realizar iteraciones sobre el producto en ciclos de menos de 48 horas, asegurando la retención de los usuarios antes de iniciar la expansión a nuevas provincias.'
                : 'All this in the first month following the MVP launch, starting exclusively in the Region of Murcia and with a controlled investment in validation campaigns. This localized and targeted strategy allowed us to optimize the customer acquisition cost (CAC) from day one, securing a continuous flow of direct feedback from hosts and travelers. By centering our efforts on a defined geographical area, we were able to iterate on the product in cycles of less than 48 hours, ensuring user retention before initiating expansion into new provinces.'}
            </p>
          </div>
        </motion.div>

        {/* Highlighted Link at the End */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            display: 'flex', 
            justifyContent: 'flex-start', 
            marginTop: '32px', 
            marginBottom: '80px' 
          }}
        >
          <VisitWebsiteLink language={language} />
        </motion.div>
      </main>
    );
  }

  // --- DEFAULT GENERIC LAYOUT ---
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
                  <div style={{ 
                    width: '100%', 
                    height: '600px', 
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
                    IMAGE ASSET
                  </div>
                </div>
              )}

              {block.type === 'image-grid' && (
                <div className="image-grid-wrapper">
                  <div style={{ 
                    width: '100%', 
                    height: '450px', 
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
                    UI VIEW A
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '450px', 
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
                    UI VIEW B
                  </div>
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
