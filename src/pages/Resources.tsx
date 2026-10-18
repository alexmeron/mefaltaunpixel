import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { Skills } from '../components/Skills';

import coverUiFlow from '../assets/images/cover-ui-flow.png?format=webp&w=1800';
import modesImg from '../assets/images/modes.png?format=webp&w=1324';
import coverComponents from '../assets/images/cover-components.png?format=webp&w=1800';
import iconsVar from '../assets/images/icons-var.png?format=webp&w=908';

export const Resources = () => {
  const { language, t } = useLanguage();
  const [pausedItems, setPausedItems] = useState<Record<string, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const componentsVideoRef = useRef<HTMLVideoElement>(null);

  const togglePlayback = (id: string, ref?: React.RefObject<HTMLVideoElement | null>) => {
    if (!ref?.current) return;
    const isPaused = !!pausedItems[id];
    if (isPaused) {
      ref.current.play();
      setPausedItems(prev => ({ ...prev, [id]: false }));
    } else {
      ref.current.pause();
      setPausedItems(prev => ({ ...prev, [id]: true }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 4.0;
    }
    if (componentsVideoRef.current) {
      componentsVideoRef.current.playbackRate = 4.0;
    }
  }, []);

  const resourcesData = [
    {
      id: 'variables-timeline',
      type: 'plugin',
      badge: language === 'es' ? 'Plugin de Figma' : 'Figma Plugin',
      title: 'Variables Timeline',
      desc: language === 'es' 
        ? 'Historial de cambios en tiempo real para variables de Figma. Rastrea cada actualización, autor y valor directamente dentro de tu archivo.'
        : 'Real-time change log for Figma variables. Track every update, author, and value—right inside your file.',
      url: 'https://www.figma.com/community/plugin/1600155199369592947/variables-timeline',
      mediaType: 'video',
      videoSrc: '/videos/variables.webm',
      videoRef: videoRef
    },
    {
      id: 'ui-flow',
      type: 'resource',
      badge: language === 'es' ? 'Recurso' : 'Resource',
      title: 'UI Flow Documentation Sample',
      desc: language === 'es'
        ? 'Documentación de flujos de UI en Figma. Anotaciones sobre flujos de usuario y comportamiento de componentes para reducir la brecha entre diseño y desarrollo.'
        : 'UI flow documentation in Figma. Annotations on user flows and component behavior to reduce design-to-development gaps.',
      url: 'https://www.figma.com/community/file/1643193230719352715/ui-flow-documentation-sample',
      mediaType: 'image',
      imageSrc: coverUiFlow
    },
    {
      id: 'component-documentation',
      type: 'resource',
      badge: language === 'es' ? 'Recurso' : 'Resource',
      title: 'Component Documentation Structure',
      desc: language === 'es'
        ? 'Estructura de documentación de componentes. Metodología de flujo en Figma para construir librerías de componentes entendibles y mantenibles.'
        : 'Component documentation structure. Figma workflow structure to build understandable and maintainable component libraries.',
      url: 'https://www.figma.com/community/file/1643181196052145946/component-documentation-sample',
      mediaType: 'image',
      imageSrc: coverComponents
    },
    {
      id: 'components-explorer',
      type: 'plugin',
      badge: language === 'es' ? 'Plugin de Figma' : 'Figma Plugin',
      title: 'Components Explorer',
      desc: language === 'es'
        ? 'Encuentra y gestiona todos tus componentes en un solo lugar. Localiza instancias al instante y mira dónde se utilizan en tu archivo.'
        : 'Find and manage all your components in one place. Instantly locate instances and see where they’re used across your file.',
      url: 'https://www.figma.com/community/plugin/1505449538275448157/components-explorer',
      mediaType: 'video',
      videoSrc: '/videos/components.webm',
      videoRef: componentsVideoRef
    },
    {
      id: 'infinite-modes',
      type: 'resource',
      badge: language === 'es' ? 'Recurso' : 'Resource',
      title: 'Infinite Variable Modes',
      desc: language === 'es'
        ? 'Crea y gestiona modos de variables ilimitados en Figma. Construye sistemas de diseño escalables, flexibles y consistentes sin límites de plan.'
        : 'Create and manage unlimited variable modes in Figma. Build scalable, flexible, and consistent design systems—without plan limits.',
      url: 'https://www.figma.com/community/file/1445434350337332622/infinite-variable-modes',
      mediaType: 'image',
      imageSrc: modesImg
    },
    {
      id: 'icon-library',
      type: 'resource',
      badge: language === 'es' ? 'Recurso' : 'Resource',
      title: 'Icon Library with Variables',
      desc: language === 'es'
        ? 'Controla toda tu librería de iconos mediante variables. Asegura consistencia y actualizaciones flexibles en todos tus proyectos.'
        : 'Control your entire icon library with variables. Ensure consistency and flexible updates across projects.',
      url: 'https://www.figma.com/community/file/1445427402991631750',
      mediaType: 'image',
      imageSrc: iconsVar
    }
  ];

  return (
    <main className="resources-page page-wrapper">
      <SEO 
        title={language === 'es' ? 'Recursos & Plugins de Figma — Álex Salmerón' : 'Resources & Figma Plugins — Álex Salmerón'}
        description={t('lab_title')}
      />


      <div className="site-container">
        <header className="col-span-full flex flex-col gap-48 pt-31 text-center site-desktop:pt-36 resources-page-header">
          <h1 className="type-page-heading text-text-primary site-desktop:whitespace-pre-line">
            {language === 'es' ? 'Recursos creados para la comunidad de diseño' : 'Resources built for the design community'}
          </h1>
          <div className="mx-auto w-full max-w-[620px] flex flex-col gap-6 text-left type-page-intro text-text-secondary">
            <p>
              {language === 'es'
                ? 'Plugins, librerías y herramientas desarrolladas a partir de mi experiencia en diseño de producto, Design Systems y optimización de flujos de trabajo. Creados para compartir conocimiento y ayudar a otros diseñadores a trabajar mejor.'
                : 'Plugins, libraries, and tools developed from my experience in Product Design, Design Systems, and workflow optimization. Created to share knowledge and help other designers work better.'}
            </p>
          </div>
        </header>
      </div>

      <section 
        aria-labelledby="why-you-can-trust" 
        className="site-container flex min-w-0 flex-col gap-16 site-desktop:gap-24 resources-america-section"
      >

        <ul 
          className="grid grid-cols-1 items-start gap-x-site-gutter gap-y-14 mobile:grid-cols-2 site-desktop:gap-y-26 resources-america-grid" 
          role="list"
        >
          {resourcesData.map((item) => (
            <li 
              key={item.id}
              className="flex min-w-0 flex-col gap-6 resources-america-item"
            >
              <div className="resources-bento-canvas">
                <a 
                  href={item.url}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="resources-bento-media-link"
                  aria-label={`Ver ${item.title} en Figma`}
                >
                  {item.mediaType === 'video' ? (
                    <video 
                      ref={item.videoRef}
                      src={item.videoSrc} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="resources-bento-media" 
                      onLoadedMetadata={(e) => {
                        const vid = e.currentTarget;
                        vid.playbackRate = 4.0;
                        vid.currentTime = 3;
                      }}
                      onTimeUpdate={(e) => {
                        const vid = e.currentTarget;
                        if (vid.duration && vid.currentTime >= vid.duration - 2) {
                          vid.currentTime = 3;
                          vid.play();
                        }
                      }}
                    />
                  ) : (
                    <img 
                      src={item.imageSrc} 
                      alt={item.title} 
                      className="resources-bento-media" 
                      loading="lazy" 
                    />
                  )}
                </a>

                <span className="resources-bento-badge">
                  {item.badge}
                </span>

                {item.mediaType === 'video' && (
                  <div className="absolute right-6 bottom-6 z-20">
                    <button
                      type="button"
                      className="resources-playback-btn inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full size-9 site-desktop:size-11 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/60 text-text-primary backdrop-blur-frost hover:bg-white/90 dark:hover:bg-black/80 transition-transform hover:scale-105"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        togglePlayback(item.id, item.videoRef);
                      }}
                      aria-label={pausedItems[item.id] ? "Play animation" : "Pause animation"}
                    >
                      {pausedItems[item.id] ? (
                        <Play size={16} fill="currentColor" />
                      ) : (
                        <Pause size={16} fill="currentColor" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inset-site-media-copy type-site-body text-text-secondary resources-media-text-link"
              >
                <h3 className="inline font-normal text-text-primary">
                  <span>{item.title}.</span>
                </h3>
                &nbsp;
                <p className="inline">
                  <span>{item.desc}</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Skills />
    </main>
  );
};
