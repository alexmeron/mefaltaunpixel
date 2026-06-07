import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

const CONTENT = {
  es: {
    title: "Un poco sobre mí",
    professional: [
      "Soy Álex Salmerón, diseñador de producto ubicado en Murcia. Desde 2007 me dedico a ayudar a compañías a crear productos digitales eficientes, accesibles y coherentes. Combinando estrategia, investigación y diseño centrado en el usuario para ofrecer soluciones visuales y funcionales alineadas con los objetivos de negocio y producto.",
      "Mi trayectoria como diseñador comenzó de forma autodidacta, impulsado por la curiosidad y la práctica constante. Pero además, también he realizado diferentes workshops en <strong>Neoland</strong>, <strong>Instituto Tramontana</strong>, <strong>Figma Camp</strong> y <strong>DesignOps Latam</strong> (Workshop: DesignOps en acción), buscando especializarme en la creación, mantenimiento y organización de sistemas de diseño."
    ],
    personal: [
      "También me encanta la naturaleza, viajar, descubrir nuevos lugares, practicar CrossFit, disfrutar de un buen concierto de indie o rock, perderme en una maratón de cine… y, sobre todo, compartir momentos con ese pequeño ser que aparece en la foto.",
      "Él es <strong>Bronx</strong>, mi compañero de vida y una de mis mayores fuentes de inspiración desde hace más de 15 años. En todo este tiempo hemos vivido aventuras recorriendo miles de kilómetros y explorando rincones increíbles. Esta es la parte más personal de la historia… y poder disfrutar de todo esto, lo llamo suerte."
    ],
    booksTitle: "Biblioteca de diseño",
    playlistTitle: "Mi banda sonora",
    books: [
      { title: "The design of everyday things", author: "Don Norman", tag: "UX / Psicología" },
      { title: "Experiencia de usuario: Principios y métodos", author: "Yusef Hassan Montero", tag: "UX" },
      { title: "UX. Una metodología de diseño eficiente", author: "M. Ferrer, E. Aguirre y R. Méndez", tag: "UX" },
      { title: "Más que diseño de experiencia", author: "Esther Rizo", tag: "UX / Estrategia" },
      { title: "Diseño desde Marte", author: "Cris Busquets", tag: "Diseño / UX" },
      { title: "UX Writing", author: "Marisol Parnofiello", tag: "Contenido" },
      { title: "Manual de DesignOps", author: "Irene Beitia", tag: "DesignOps" },
      { title: "Idea, producto y negocio", author: "Justo Hidalgo", tag: "Producto" },
      { title: "El método Lean Startup", author: "Eric Ries", tag: "Estrategia" },
      { title: "Designpedia", author: "Juan Gasca y Rafa Zaragoza", tag: "Metodologías" },
      { title: "Psicología del color", author: "Eva Heller", tag: "Color" }
    ]
  },
  en: {
    title: "A bit about me",
    professional: [
      "I am Álex Salmerón, a Product Designer based in Murcia. Since 2007, I have been dedicated to helping companies create efficient, accessible, and consistent digital products. By combining strategy, research, and user-centered design, I deliver visual and functional solutions aligned with both business and product objectives.",
      "My journey as a designer began as a self-taught pursuit, driven by curiosity and constant practice. Additionally, I have completed various workshops at <strong>Neoland</strong>, <strong>Instituto Tramontana</strong>, <strong>Figma Camp</strong>, and <strong>DesignOps Latam</strong> (Workshop: DesignOps in Action), specializing in the creation, maintenance, and organization of design systems."
    ],
    personal: [
      "I also love nature, traveling, discovering new places, practicing CrossFit, enjoying a good indie or rock concert, getting lost in a movie marathon... and, above all, sharing moments with that little being that appears in the photo.",
      "He is <strong>Bronx</strong>, my life companion and one of my greatest sources of inspiration for over 15 years. In all this time, we have lived adventures traveling thousands of kilometers and exploring incredible corners. This is the most personal part of the story... and being able to enjoy all this, I call luck."
    ],
    booksTitle: "Design Library",
    playlistTitle: "My Soundtrack",
    books: [
      { title: "The design of everyday things", author: "Don Norman", tag: "UX / Psychology" },
      { title: "Experiencia de usuario: Principios y métodos", author: "Yusef Hassan Montero", tag: "UX" },
      { title: "UX. Una metodología de diseño eficiente", author: "M. Ferrer, E. Aguirre and R. Méndez", tag: "UX" },
      { title: "Más que diseño de experiencia", author: "Esther Rizo", tag: "UX / Strategy" },
      { title: "Diseño desde Marte", author: "Cris Busquets", tag: "Design / UX" },
      { title: "UX Writing", author: "Marisol Parnofiello", tag: "Content" },
      { title: "Manual de DesignOps", author: "Irene Beitia", tag: "DesignOps" },
      { title: "Idea, producto y negocio", author: "Justo Hidalgo", tag: "Product" },
      { title: "The Lean Startup", author: "Eric Ries", tag: "Strategy" },
      { title: "Designpedia", author: "Juan Gasca and Rafa Zaragoza", tag: "Methodology" },
      { title: "Color Psychology", author: "Eva Heller", tag: "Theory" }
    ]
  }
};

export const About = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page">
      <SEO title={t('seo_about_title')} description={t('seo_about_desc')} lang={language} />
      <section className="about-hero">
        <div className="about-container-simple">
          {/* Professional Narrative */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-text-content"
          >
            <h1 className="about-h1">{CONTENT[language].title}</h1>
            {CONTENT[language].professional.map((text, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: text }} />
            ))}
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-image-hero"
            style={{ borderRadius: 0, overflow: 'visible' }}
          >
            <img 
              src="/alex-bronx.png" 
              alt="Alex and Bronx" 
              className="about-main-img" 
              style={{ borderRadius: 0 }}
            />
          </motion.div>

          {/* Personal Narrative */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-text-content"
          >
            {CONTENT[language].personal.map((text, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: text }} />
            ))}
          </motion.div>

          {/* Books Table */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-extra-section"
            style={{ marginTop: '120px' }}
          >
            <h3 className="section-title-small">{CONTENT[language].booksTitle}</h3>
            <div className="books-table-wrapper">
              <table className="books-table">
                <tbody>
                  {CONTENT[language].books.map((book, idx) => (
                    <tr key={idx}>
                      <td className="book-title">{book.title}</td>
                      <td className="book-author">{book.author}</td>
                      <td className="book-tag"><span>{book.tag}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Spotify Playlist */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-extra-section"
            style={{ marginTop: '80px' }}
          >
            <h3 className="section-title-small">{CONTENT[language].playlistTitle}</h3>
            <div className="spotify-embed-wrapper">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/playlist/4devtnWp35zEtCzx25BByX?utm_source=generator&theme=0" 
                width="100%" 
                height="452" 
                frameBorder="0" 
                allowFullScreen={false} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
