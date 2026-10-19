import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dribbble, ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

interface ProjectItem {
  id: string;
  title: string;
  descEs: string;
  descEn: string;
  imageSrc?: string;
  imageWebp?: string;
  href?: string;
  isPlaceholder?: boolean;
  isDribbble?: boolean;
}

export const Projects = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects: ProjectItem[] = [
    {
      id: 'waykout',
      title: 'Waykout',
      descEs: 'Plataforma de turismo colaborativo para descubrir y reservar experiencias locales auténticas en España. Diseño de producto completo desde la validación de la idea hasta el MVP.',
      descEn: 'Collaborative tourism platform to discover and book authentic local experiences in Spain. Full product design from idea validation to MVP launch.',
      imageSrc: '/resources-images/waykout-preview.png',
      imageWebp: '/resources-images/waykout-preview.webp',
      href: '/project/waykout',
      isPlaceholder: false,
    },
    {
      id: 'dribbble',
      title: 'Dribbble',
      descEs: 'Exploraciones visuales, prototipos interactivos y conceptos de diseño de producto.',
      descEn: 'Visual explorations, interactive prototypes, and product design concepts.',
      imageSrc: '/dribbble-shots/shot-7-table-order-list-light.webp',
      imageWebp: '/dribbble-shots/shot-7-table-order-list-light.webp',
      href: '/project/dribbble',
      isPlaceholder: false,
    },
    {
      id: 'cella-medical',
      title: 'Cella Medical Solutions',
      descEs: 'Investigación UX y evolución del sistema de diseño para herramientas de planificación quirúrgica 3D guiadas por IA. Actualmente en desarrollo.',
      descEn: 'UX research and design system evolution for AI-guided 3D surgical planning tools. Currently in progress.',
      isPlaceholder: true,
    },
    {
      id: 'magma-design-system',
      title: 'Magma Design System',
      descEs: 'Sistema de diseño multimarca, arquitectura de componentes en Storybook, tokens semánticos y sincronización de diseño a código. Próximamente.',
      descEn: 'Multibrand design system, Storybook component library, semantic tokens, and design-to-code synchronization. Coming soon.',
      isPlaceholder: true,
    }
  ];

  const sideProjects: ProjectItem[] = [
    {
      id: 'animal-rescue',
      title: 'Ayuda Incendios Madrid y Ávila 2025',
      descEs: 'Plataforma de coordinación de ayuda animal, desarrollada con IA durante los incendios de Madrid y Ávila para conectar necesidades y recursos cercanos.',
      descEn: 'Animal aid coordination platform, built with AI during the Madrid and Ávila wildfires to connect needs with nearby resources.',
      imageSrc: '/resources-images/animales-incendios-preview.png',
      imageWebp: '/resources-images/animales-incendios-preview.webp',
      href: '/project/animal-rescue',
      isPlaceholder: false,
    },
    {
      id: 'gaztelugatxe-tracker',
      title: 'Gaztelugatxe Tickets Tracker',
      descEs: 'Rastreador y automatizador de reservas para San Juan de Gaztelugatxe. Monitoriza cancelaciones en tiempo real por fecha y tramo horario, alerta al instante y completa la reserva en el formulario oficial tras confirmar.',
      descEn: 'Real-time ticket tracker and booking automation for San Juan de Gaztelugatxe. Monitors slot releases, alerts the user, and auto-submits reservations upon confirmation.',
      imageSrc: '/resources-images/gaztelugatxe-preview.png',
      imageWebp: '/resources-images/gaztelugatxe-preview.webp',
      href: '/project/gaztelugatxe-tracker',
      isPlaceholder: false,
    }
  ];

  const renderProjectCard = (item: ProjectItem) => {
    if (item.isPlaceholder) {
      return (
        <li key={item.id} className="project-card-item">
          <div className="project-card-media project-placeholder-card">
            <div className="project-placeholder-wireframe" aria-hidden="true">
              <div className="w-full flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10" />
                </div>
                <div className="w-16 h-2 rounded bg-black/10 dark:bg-white/10" />
              </div>
              <div className="w-full flex flex-col gap-2 pt-1">
                <div className="w-3/4 h-3.5 rounded bg-black/10 dark:bg-white/10" />
                <div className="w-1/2 h-2.5 rounded bg-black/10 dark:bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-24 rounded-none bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]" />
                <div className="h-24 rounded-none bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]" />
              </div>
            </div>

            <div className="project-placeholder-center">
              <span className="project-placeholder-pill">
                {language === 'es' ? 'Próximamente' : 'Coming soon'}
              </span>
            </div>
          </div>

          <div className="inset-site-media-copy type-site-body text-text-secondary">
            <h3 className="inline font-normal text-text-primary">
              <span>{item.title}.</span>
            </h3>
            &nbsp;
            <p className="inline">
              <span>{language === 'es' ? item.descEs : item.descEn}</span>
            </p>
          </div>
        </li>
      );
    }

    return (
      <li key={item.id} className="project-card-item">
        <Link
          to={item.href!}
          className={`project-card-media ${item.id === 'dribbble' ? 'project-card-media-dribbble' : ''}`}
          aria-label={`Ver proyecto ${item.title}`}
        >
          {item.imageSrc ? (
            <picture>
              {item.imageWebp && <source srcSet={item.imageWebp} type="image/webp" />}
              <img
                src={item.imageSrc}
                alt={item.title}
                className={`project-card-img ${item.id === 'dribbble' ? 'project-card-img-dribbble' : ''}`}
                loading="eager"
                decoding="async"
              />
            </picture>
          ) : (
            <div className="project-placeholder-wireframe" aria-hidden="true">
              <div className="w-full flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-medium tracking-wider uppercase text-text-secondary">
                    {language === 'es' ? 'Match Activo' : 'Active Match'}
                  </span>
                </div>
                <div className="w-16 h-2 rounded bg-emerald-500/20" />
              </div>
              <div className="w-full flex flex-col gap-2 pt-1">
                <div className="w-3/4 h-3.5 rounded bg-black/10 dark:bg-white/10" />
                <div className="w-1/2 h-2.5 rounded bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          )}
        </Link>

        <Link
          to={item.href!}
          className="inset-site-media-copy type-site-body text-text-secondary resources-media-text-link"
        >
          <h3 className="inline font-normal text-text-primary">
            <span>{item.title}.</span>
          </h3>
          &nbsp;
          <p className="inline">
            <span>{language === 'es' ? item.descEs : item.descEn}</span>
          </p>
        </Link>
      </li>
    );
  };

  return (
    <main className="resources-page page-wrapper">
      <SEO
        title={language === 'es' ? 'Proyectos — Álex Salmerón' : 'Projects — Álex Salmerón'}
        description={language === 'es'
          ? 'Proyectos de diseño de producto y sistemas de diseño por Álex Salmerón.'
          : 'Product design and design systems projects by Álex Salmerón.'}
      />

      <div className="site-container">
        <header className="col-span-full flex flex-col gap-48 pt-31 text-center site-desktop:pt-36 resources-page-header">
          <h1 className="type-page-heading text-text-primary">
            {language === 'es' ? 'Proyectos que dan forma a mejores experiencias digitales' : 'Projects shaping better digital experiences'}
          </h1>
          <div className="mx-auto w-full max-w-[620px] flex flex-col gap-6 text-left type-page-intro text-text-secondary">
            <p>
              {language === 'es'
                ? 'Una colección de exploraciones en la intersección del diseño de producto, los sistemas de diseño, la tecnología y la IA. Enfocado en crear experiencias digitales reflexivas, simplificar la complejidad y descubrir nuevas formas de resolver problemas relevantes a través del diseño.'
                : 'A collection of explorations at the intersection of Product Design, Design Systems, technology, and AI. Focused on creating thoughtful digital experiences, simplifying complexity, and uncovering new ways to solve meaningful problems through design.'}
            </p>
          </div>
        </header>
      </div>

      {/* Main Projects Section */}
      <section
        className="site-container project-section-container project-case-studies-section"
      >
        <div className="flex items-center justify-center text-center">
          <h2 className="project-section-title">
            {language === 'es' ? 'Proyectos destacados' : 'Featured Projects'}
          </h2>
        </div>

        <ul className="project-cards-grid" role="list">
          {projects.map(renderProjectCard)}
        </ul>
      </section>

      {/* Side Projects Category */}
      <section className="site-container project-section-container pt-16 site-desktop:pt-28">
        <div className="border-t border-[var(--border)] pt-12 site-desktop:pt-16 flex items-center justify-center text-center">
          <h2 className="project-section-title">
            {language === 'es' ? 'Cosas que he creado' : "Things I've Built"}
          </h2>
        </div>

        <ul className="project-cards-grid" role="list">
          {sideProjects.map(renderProjectCard)}
        </ul>
      </section>
    </main>
  );
};
