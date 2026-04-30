import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Lab = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const componentsVideoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 4.0;
    }
    if (componentsVideoRef.current) {
      componentsVideoRef.current.playbackRate = 4.0;
    }
  }, []);

  return (
    <section className="lab page-wrapper">
      <h2 className="lab-intro">
        {t('lab_title')}
      </h2>
      
      <div className="lab-grid">
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
          </a>
          <div className="lab-meta">
            <div className="lab-badge">{t('lab_badge_plugin')}</div>
          </div>
          <p className="lab-text">
            {t('lab_item1_title')}<br />
            {t('lab_item1_desc')}
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
          </a>
          <div className="lab-meta">
            <div className="lab-badge lab-badge-resource">{t('lab_badge_resource')}</div>
          </div>
          <p className="lab-text">
            {t('lab_item2_title')}<br />
            {t('lab_item2_desc')}
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
          </a>
          <div className="lab-meta">
            <div className="lab-badge">{t('lab_badge_plugin')}</div>
          </div>
          <p className="lab-text">
            {t('lab_item3_title')}<br />
            {t('lab_item3_desc')}
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
          </a>
          <div className="lab-meta">
            <div className="lab-badge lab-badge-resource">{t('lab_badge_resource')}</div>
          </div>
          <p className="lab-text">
            {t('lab_item4_title')}<br />
            {t('lab_item4_desc')}
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
      </div>
    </section>
  );
};
