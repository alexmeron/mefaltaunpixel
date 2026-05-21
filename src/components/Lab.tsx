import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Lab = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const componentsVideoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Move the container horizontally based on vertical scroll.
  // Adjusting the end percentage based on the track width. 
  // With 4 items and gaps, moving it roughly -70% to -75% works well for a 4-item list.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 4.0;
    }
    if (componentsVideoRef.current) {
      componentsVideoRef.current.playbackRate = 4.0;
    }
  }, []);

  return (
    <section className="lab" ref={targetRef}>
      <div className="lab-sticky-wrapper page-wrapper">
        <h2 className="lab-intro">
          {t('lab_title')}
        </h2>
        
        <motion.div className="lab-grid" style={{ x }}>
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
    </section>
  );
};
