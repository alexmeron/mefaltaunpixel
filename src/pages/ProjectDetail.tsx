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
        <section className="project-intro-section" style={{ paddingBottom: '48px' }}>
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
            style={{ marginBottom: '40px' }}
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
            style={{ fontSize: '28px', lineHeight: '1.4', fontWeight: 300, opacity: 0.9 }}
          >
            {language === 'es' 
              ? "Una plataforma que acerca el turismo auténtico a los rincones menos conocidos de España"
              : "A platform that brings authentic tourism to the lesser-known corners of Spain"}
          </motion.div>
        </section>

        {/* Hero Image Block */}
        <section className="project-content-blocks" style={{ paddingBottom: '0px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="content-block"
            style={{ marginBottom: '80px' }}
          >
            <div className="image-block-wrapper">
              <img 
                src="/assets/projects/waykout/waykout-hero.webp" 
                alt="Waykout Hero Presentation" 
                className="block-img-single"
                style={{ borderRadius: '24px', width: '100%', display: 'block' }}
              />
            </div>
          </motion.div>

          {/* Section 2: Contexto y problema */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="content-block"
          >
            <div className="text-block-inner">
              <h3 className="block-title" style={{ fontSize: '36px', fontWeight: 500, marginBottom: '24px' }}>
                {language === 'es' ? 'Contexto y problema' : 'Context & problem'}
              </h3>
              <div className="block-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '20px', lineHeight: '1.6', fontWeight: 300 }}>
                <p>
                  {language === 'es' 
                    ? 'El turismo en España se concentra en los mismos destinos de siempre. Mientras tanto, regiones como Murcia esconden una riqueza cultural, gastronómica y natural que pasa desapercibida para la mayoría de viajeros, no por falta de interés, sino por falta de visibilidad.'
                    : 'Tourism in Spain is concentrated in the same old destinations. Meanwhile, regions like Murcia hide a cultural, gastronomic, and natural richness that goes unnoticed by most travelers, not for lack of interest, but for lack of visibility.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Waykout nació para cambiar eso. Una plataforma de turismo colaborativo donde anfitriones locales publican sus experiencias y viajeros las descubren y reservan al instante.'
                    : 'Waykout was born to change that. A collaborative tourism platform where local hosts publish their experiences and travelers discover and book them instantly.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Decidimos arrancar en la Región de Murcia por una razón estratégica: la proximidad nos daba control sobre el feedback y la posibilidad de construir con early adopters reales desde el primer día.'
                    : 'We decided to start in the Region of Murcia for a strategic reason: proximity gave us control over feedback and the possibility to build with real early adopters from day one.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Mi rol */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="content-block"
          >
            <div className="text-block-inner">
              <h3 className="block-title" style={{ fontSize: '36px', fontWeight: 500, marginBottom: '24px' }}>
                {language === 'es' ? 'Mi rol' : 'My role'}
              </h3>
              <div className="block-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '20px', lineHeight: '1.6', fontWeight: 300 }}>
                <p>
                  {language === 'es'
                    ? 'Mi trabajo abarcó desde la validación de la idea hasta el diseño completo del producto. Antes de diseñar una sola pantalla, lancé campañas segmentadas en Instagram y Google Ads para medir si había demanda real, definiendo el user persona del viajero y del anfitrión y acotando la inversión a esos perfiles. Los resultados confirmaron el interés y nos dieron datos concretos para priorizar qué construir primero.'
                    : 'My work spanned from idea validation to the complete product design. Before designing a single screen, I launched targeted campaigns on Instagram and Google Ads to measure if there was real demand, defining the traveler and host user personas and limiting the investment to those profiles. The results confirmed the interest and gave us concrete data to prioritize what to build first.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Una vez validada la hipótesis, el ciclo de producto del MVP giró en torno a dos actores: usuarios (viajeros) y anfitriones. Prototipé y validé wireframes e hipótesis con early adopters reales en cada iteración. También creé un UI Kit en Figma que estableció las bases visuales de la plataforma y aceleró el diseño de todos los flujos.'
                    : 'Once the hypothesis was validated, the MVP product cycle revolved around two actors: users (travelers) and hosts. I prototyped and validated wireframes and hypotheses with real early adopters in each iteration. I also created a UI Kit in Figma that established the visual foundation of the platform and accelerated the design of all workflows.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Project Metadata block */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="metadata-insertion"
          >
            <ProjectMeta project={project} language={language} />
          </motion.div>

          {/* Section 4: Decisiones de diseño clave */}
          <div style={{ marginTop: '120px', marginBottom: '80px' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ 
                fontSize: '44px', 
                fontWeight: 500, 
                marginBottom: '64px',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '24px'
              }}
            >
              {language === 'es' ? 'Decisiones de diseño clave' : 'Key design decisions'}
            </motion.h2>

            {/* Bloque A */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="content-block"
              style={{ marginBottom: '100px' }}
            >
              <div className="text-block-inner" style={{ marginBottom: '32px' }}>
                <h3 className="block-title" style={{ fontSize: '28px', fontWeight: 500, marginBottom: '12px' }}>
                  {language === 'es' ? 'Login sin contraseña' : 'Passwordless login'}
                </h3>
                <p className="block-content" style={{ fontSize: '19px', lineHeight: '1.6', fontWeight: 300 }}>
                  {language === 'es'
                    ? 'Una de las primeras fricciones que identificamos fue el registro. Waykout es una plataforma que un usuario puede usar una o dos veces al mes, no todos los días. Pedirle que recuerde una contraseña nueva era garantía de abandono. Rediseñamos el flujo completo de autenticación eliminando la contraseña tradicional e implementando acceso mediante magic link: un enlace enviado al email que autentica al usuario en un clic. Menos fricción, más conversión, y sin que el usuario tenga que gestionar una credencial más.'
                    : 'One of the first points of friction we identified was registration. Waykout is a platform that a user might use once or twice a month, not every day. Asking them to remember a new password was a guarantee of abandonment. We redesigned the entire authentication flow, eliminating the traditional password and implementing magic link access: a link sent to the email that authenticates the user in one click. Less friction, more conversion, and without the user having to manage another credential.'}
                </p>
              </div>
              <div className="image-block-wrapper">
                <img 
                  src="/assets/projects/waykout/waykout-login-magiclink.webp" 
                  alt={language === 'es' ? "Login sin contraseña magic link" : "Passwordless login magic link"} 
                  className="block-img-single"
                  style={{ borderRadius: '16px', width: '100%', display: 'block' }}
                />
              </div>
            </motion.div>

            {/* Bloque B */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="content-block"
              style={{ marginBottom: '100px' }}
            >
              <div className="text-block-inner" style={{ marginBottom: '32px' }}>
                <h3 className="block-title" style={{ fontSize: '28px', fontWeight: 500, marginBottom: '12px' }}>
                  {language === 'es' ? 'Publicación de experiencias asistida por IA' : 'AI-assisted experience creation'}
                </h3>
                <p className="block-content" style={{ fontSize: '19px', lineHeight: '1.6', fontWeight: 300 }}>
                  {language === 'es'
                    ? 'Durante las primeras semanas detectamos una fricción crítica en el lado del anfitrión: describir bien una actividad es difícil. Muchos anfitriones locales tienen una experiencia única que ofrecer, pero no saben cómo presentarla de forma atractiva. El resultado eran fichas pobres que no convertían, y anfitriones frustrados que abandonaban el proceso a mitad. Diseñamos una interfaz de publicación basada en sugerencias inteligentes: el anfitrión escribe una descripción breve y libre de su actividad, y una IA genera automáticamente la ficha completa de la experiencia, título, descripción, puntos destacados y tono, lista para publicar. El anfitrión revisa, ajusta si quiere y publica. El impacto fue inmediato: más anfitriones completaban el proceso de publicación y la calidad media de las fichas mejoró notablemente, lo que se tradujo directamente en más reservas.'
                    : 'During the first few weeks, we detected a critical friction point on the host\'s side: writing a good description for an activity is hard. Many local hosts have a unique experience to offer but don\'t know how to present it attractively. The result was poor experience listings that didn\'t convert, and frustrated hosts who abandoned the process halfway. We designed a publishing interface based on smart suggestions: the host writes a brief and free description of their activity, and an AI automatically generates the complete experience listing, including title, description, highlights, and tone, ready to publish. The host reviews, adjusts if they want, and publishes. The impact was immediate: more hosts completed the creation process and the average quality of the listings improved significantly, translating directly into more bookings.'}
                </p>
              </div>
              <div className="image-block-wrapper">
                <img 
                  src="/assets/projects/waykout/waykout-publicacion-ia.webp" 
                  alt={language === 'es' ? "Publicación asistida por IA" : "AI-assisted experience creation"} 
                  className="block-img-single"
                  style={{ borderRadius: '16px', width: '100%', display: 'block' }}
                />
              </div>
            </motion.div>

            {/* Bloque C */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="content-block"
              style={{ marginBottom: '100px' }}
            >
              <div className="text-block-inner" style={{ marginBottom: '32px' }}>
                <h3 className="block-title" style={{ fontSize: '28px', fontWeight: 500, marginBottom: '12px' }}>
                  {language === 'es' ? 'Herramientas para anfitriones' : 'Tools for hosts'}
                </h3>
                <p className="block-content" style={{ fontSize: '19px', lineHeight: '1.6', fontWeight: 300 }}>
                  {language === 'es'
                    ? 'Más allá de la publicación, diseñamos herramientas internas para que los anfitriones pudieran gestionar sus reservas recibidas de forma sencilla. Un anfitrión que tiene control sobre su agenda y sus reservas es un anfitrión que sigue publicando, y eso es lo que hace crecer la plataforma. También trabajamos el posicionamiento orgánico de cada ficha de experiencia para generar tráfico sin depender exclusivamente de campañas de pago.'
                    : 'Beyond publishing, we designed internal tools so that hosts could easily manage their received bookings. A host who has control over their calendar and bookings is a host who continues to publish, and that is what makes the platform grow. We also worked on the organic search optimization (SEO) of each experience listing to drive traffic without relying exclusively on paid campaigns.'}
                </p>
              </div>
              <div className="image-block-wrapper">
                <img 
                  src="/assets/projects/waykout/waykout-panel-anfitrion.webp" 
                  alt={language === 'es' ? "Herramientas para anfitriones" : "Tools for hosts"} 
                  className="block-img-single"
                  style={{ borderRadius: '16px', width: '100%', display: 'block' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Section 5: UI Kit */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="content-block"
            style={{ marginBottom: '120px' }}
          >
            <div className="text-block-inner" style={{ marginBottom: '32px' }}>
              <h3 className="block-title" style={{ fontSize: '36px', fontWeight: 500, marginBottom: '24px' }}>
                {language === 'es' ? 'UI Kit' : 'UI Kit'}
              </h3>
              <p className="block-content" style={{ fontSize: '20px', lineHeight: '1.6', fontWeight: 300 }}>
                {language === 'es'
                  ? 'Para mantener consistencia y velocidad de ejecución desde el primer día, construí un UI Kit en Figma con todos los componentes base de la plataforma. Colores, tipografía, botones, formularios, cards de experiencia y estados de cada elemento. Esto nos permitió escalar el diseño de nuevos flujos sin perder tiempo en decisiones repetitivas ni en inconsistencias visuales.'
                  : 'To maintain consistency and speed of execution from day one, I built a UI Kit in Figma with all the base components of the platform. Colors, typography, buttons, forms, experience cards, and states for each element. This allowed us to scale the design of new flows without wasting time on repetitive decisions or visual inconsistencies.'}
              </p>
            </div>
            <div className="image-block-wrapper">
              <img 
                src="/assets/projects/waykout/waykout-ui-kit.webp" 
                alt="UI Kit Figma Presentation" 
                className="block-img-single"
                style={{ borderRadius: '16px', width: '100%', display: 'block' }}
              />
            </div>
          </motion.div>

          {/* Section 6: Resultados */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="content-block"
            style={{ marginBottom: '120px' }}
          >
            <div className="text-block-inner">
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
                  ? 'Todo esto en el primer mes tras el lanzamiento del MVP, arrancando únicamente en la Región de Murcia y con una inversión controlada en campañas de validación.'
                  : 'All this in the first month following the MVP launch, starting exclusively in the Region of Murcia and with a controlled investment in validation campaigns.'}
              </p>
            </div>
          </motion.div>

          {/* Section 7: Aprendizajes */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="content-block"
          >
            <div className="text-block-inner">
              <h3 className="block-title" style={{ fontSize: '36px', fontWeight: 500, marginBottom: '24px' }}>
                {language === 'es' ? 'Aprendizajes' : 'Key Takeaways'}
              </h3>
              <div className="block-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '20px', lineHeight: '1.6', fontWeight: 300 }}>
                <p>
                  {language === 'es'
                    ? 'Arrancar en una región concreta fue la decisión correcta. La proximidad con los primeros anfitriones y usuarios nos permitió iterar rápido y con confianza real, no suposiciones.'
                    : 'Starting in a specific region was the right decision. Proximity to our first hosts and users allowed us to iterate quickly and with real confidence, not assumptions.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Validar con campañas antes de escribir una línea de código evitó semanas de trabajo en la dirección equivocada.'
                    : 'Validating with campaigns before writing a single line of code saved us weeks of work in the wrong direction.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'El mayor aprendizaje: los anfitriones no necesitaban más campos en un formulario, necesitaban ayuda para contar bien su historia. Cuando les dimos esa ayuda, la plataforma creció sola.'
                    : 'The biggest takeaway: hosts didn\'t need more fields in a form, they needed help to tell their story well. When we gave them that help, the platform grew on its own.'}
                </p>
              </div>
            </div>
          </motion.div>
        </section>
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
