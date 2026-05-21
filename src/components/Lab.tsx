import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Lab = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const componentsVideoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate the exact distance to scroll horizontally based on DOM widths
  useEffect(() => {
    const updateScrollRange = () => {
      if (gridRef.current && trackRef.current) {
        // Total width of the items minus the visible width of the track (excluding page paddings)
        const maxScroll = gridRef.current.scrollWidth - trackRef.current.clientWidth;
        setScrollRange(maxScroll > 0 ? maxScroll : 0);
      }
    };

    updateScrollRange();
    // Use a small delay to ensure fonts/images are loaded for accurate width
    setTimeout(updateScrollRange, 100);
    // Add another larger delay just in case images load very slowly
    setTimeout(updateScrollRange, 500);
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  const deadZone = 500; // Extra scroll distance to pause at the end
  const totalScroll = scrollRange + deadZone;
  const endProgress = scrollRange > 0 ? scrollRange / totalScroll : 1;
  const x = useTransform(scrollYProgress, [0, endProgress], [0, -scrollRange]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 4.0;
    }
    if (componentsVideoRef.current) {
      componentsVideoRef.current.playbackRate = 4.0;
    }
  }, []);

  return (
    <section className="lab" ref={targetRef} style={{ height: `calc(700px + ${totalScroll}px)` }}>
      <div className="lab-sticky-wrapper page-wrapper">
        <h2 className="lab-intro">
          {t('lab_title')}
        </h2>
        
        <div className="lab-track" ref={trackRef} style={{ width: '100%', overflow: 'visible' }}>
          <motion.div className="lab-grid" style={{ x }} ref={gridRef}>
          {/* Item 1 - Video */}
        <div className="lab-item">
          <a 
            href="https://www.figma.com/community/plugin/1600155199369592947/variables-timeline" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="lab-image"
          >
            <video 
              ref={videoRef}
              src="/videos/variables.webm" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="lab-video-asset"
              aria-label="Figma plugin variables timeline demonstration"
              title="Variables Timeline Plugin for Figma"
              onLoadedMetadata={(e) => {
                const vid = e.currentTarget;
                vid.playbackRate = 4.0;
                vid.currentTime = 3; // Skip first 3 seconds
              }}
              onPlay={(e) => {
                e.currentTarget.playbackRate = 4.0;
              }}
              onTimeUpdate={(e) => {
                const vid = e.currentTarget;
                if (vid.duration && vid.currentTime >= vid.duration - 2) {
                  vid.currentTime = 3; // Back to second 3
                  vid.play();
                }
              }}
            />
            <div className="lab-badge">{t('lab_badge_plugin')}</div>
          </a>
          <p className="lab-text">
            {t('lab_item1_title')} {t('lab_item1_desc')}
          </p>
          <a 
            href="https://www.figma.com/community/plugin/1600155199369592947/variables-timeline" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lab-community-link"
            aria-label="Try Variables Timeline plugin on Figma Community"
          >
            {t('lab_try_figma')} <ArrowRight size={16} />
          </a>
        </div>

        {/* Item 2 */}
        <div className="lab-item">
          <a 
            href="https://www.figma.com/community/file/1445434350337332622/infinite-variable-modes" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="lab-image"
          >
            <img src="/modes.png" alt="Infinite Variable Modes - Figma Resource for scaling design systems" className="lab-asset-cover" />
            <div className="lab-badge lab-badge-resource">{t('lab_badge_resource')}</div>
          </a>
          <p className="lab-text">
            {t('lab_item2_title')} {t('lab_item2_desc')}
          </p>
          <a 
            href="https://www.figma.com/community/file/1445434350337332622/infinite-variable-modes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lab-community-link"
            aria-label="Try Infinite Variable Modes resource on Figma Community"
          >
            {t('lab_try_figma')} <ArrowRight size={16} />
          </a>
        </div>

        {/* Item 3 */}
        <div className="lab-item">
          <a 
            href="https://www.figma.com/community/plugin/1505449538275448157/components-explorer" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="lab-image"
          >
            <video 
              ref={componentsVideoRef}
              src="/videos/components.webm" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="lab-video-asset"
              aria-label="Figma plugin components explorer demonstration"
              title="Components Explorer Plugin for Figma"
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = 4.0;
              }}
              onPlay={(e) => {
                e.currentTarget.playbackRate = 4.0;
              }}
            />
            <div className="lab-badge">{t('lab_badge_plugin')}</div>
          </a>
          <p className="lab-text">
            {t('lab_item3_title')} {t('lab_item3_desc')}
          </p>
          <a 
            href="https://www.figma.com/community/plugin/1505449538275448157/components-explorer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lab-community-link"
            aria-label="Try Components Explorer plugin on Figma Community"
          >
            {t('lab_try_figma')} <ArrowRight size={16} />
          </a>
        </div>

        {/* Item 4 */}
        <div className="lab-item">
          <a 
            href="https://www.figma.com/community/file/1445427402991631750" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="lab-image"
          >
            <img src="/icons-var.png" alt="Icon Library with Variables - Comprehensive SVG icons for design systems" className="lab-video-asset" />
            <div className="lab-badge lab-badge-resource">{t('lab_badge_resource')}</div>
          </a>
          <p className="lab-text">
            {t('lab_item4_title')} {t('lab_item4_desc')}
          </p>
          <a 
            href="https://www.figma.com/community/file/1445427402991631750" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lab-community-link"
            aria-label="Try Icons Library with Variables on Figma Community"
          >
            {t('lab_try_figma')} <ArrowRight size={16} />
          </a>
        </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
