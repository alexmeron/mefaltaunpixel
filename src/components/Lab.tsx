import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Lab = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0; // Set to 2.0x speed
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
          <div className="lab-image">
            <video 
              ref={videoRef}
              src="/videos/thumb-vars.webm" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="lab-video-asset"
            />
          </div>
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
          >
            {t('lab_try_figma')} <ArrowRight size={16} />
          </a>
        </div>

        {/* Item 2 */}
        <div className="lab-item">
          <div className="lab-image">
            <img src="/swap-var.png" alt="Infinite Variable Modes" className="lab-video-asset" />
          </div>
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
          >
            {t('lab_try_figma')} <ArrowRight size={16} />
          </a>
        </div>

        {/* Item 3 */}
        <div className="lab-item">
          <div className="lab-image">
          </div>
          <div className="lab-meta">
            <div className="lab-badge">{t('lab_badge_plugin')}</div>
          </div>
          <p className="lab-text">
            {t('lab_item3_title')}<br />
            {t('lab_item3_desc')}
          </p>
          <a 
            href="https://www.figma.com/@mefaltaunpixel" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lab-community-link"
          >
            {t('lab_try_figma')} <ArrowRight size={16} />
          </a>
        </div>

        {/* Item 4 */}
        <div className="lab-item">
          <div className="lab-image">
            <img src="/icons-var.png" alt="Icon Library with Variables" className="lab-video-asset" />
          </div>
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
          >
            {t('lab_try_figma')} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
