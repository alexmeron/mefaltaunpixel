import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

export interface LightboxScreen {
  id?: string | number;
  number?: string;
  tag?: string;
  title: string;
  desc: string;
  url?: string;
  src: string;
  alt: string;
  ctaHref?: string;
  ctaText?: string;
}

interface ProjectLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  screens: LightboxScreen[];
  initialIndex?: number;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  isOpen,
  onClose,
  screens,
  initialIndex = 0
}) => {
  const [index, setIndex] = useState(initialIndex);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Reset screenshot scroll position when navigating to another slide
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [index]);

  const handlePrev = useCallback(() => {
    if (screens.length <= 1) return;
    setIndex(prev => Math.max(0, prev - 1));
  }, [screens.length]);

  const handleNext = useCallback(() => {
    if (screens.length <= 1) return;
    setIndex(prev => Math.min(screens.length - 1, prev + 1));
  }, [screens.length]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || screens.length === 0) return null;

  const current = screens[index] || screens[0];

  return (
    <AnimatePresence>
      <motion.div 
        className="project-lightbox-fullscreen"
        role="dialog"
        aria-modal="true"
        aria-label={current.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Top Bar: clean header with close X at top right ── */}
        <header className="lightbox-fullscreen-topbar">
          <div className="lightbox-topbar-left">
            {current.tag && (
              <span className="lightbox-topbar-project-tag">{current.tag}</span>
            )}
          </div>

          <div className="lightbox-topbar-right">
            <button
              type="button"
              onClick={onClose}
              className="lightbox-close-btn"
              aria-label="Cerrar modal"
              title="Cerrar (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* ── Main Split View ── */}
        <div className="lightbox-fullscreen-split">
          {/* Left: Scrollable grey canvas containing the browser mockup */}
          <div className="lightbox-split-preview-col">
            <div className="lightbox-split-preview" ref={scrollRef}>
              <div className="lightbox-browser-frame">
                <div className="lightbox-browser-bar">
                  <div className="browser-dots">
                    <span className="browser-dot dot-red"></span>
                    <span className="browser-dot dot-yellow"></span>
                    <span className="browser-dot dot-green"></span>
                  </div>
                  {current.url && (
                    <span className="lightbox-browser-url">{current.url}</span>
                  )}
                </div>

                <div className="lightbox-image-scroll-view">
                  <img
                    key={current.src}
                    src={current.src}
                    alt={current.alt || current.title}
                    className="lightbox-full-img"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Stepper centered horizontally within the preview div */}
            {screens.length > 1 && (
              <div className="lightbox-floating-stepper">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={index === 0}
                  className="lightbox-stepper-btn"
                  aria-label="Captura anterior"
                  title={index === 0 ? undefined : "Anterior (←)"}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="lightbox-stepper-counter">
                  {index + 1} <span className="opacity-40">/</span> {screens.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={index === screens.length - 1}
                  className="lightbox-stepper-btn"
                  aria-label="Captura siguiente"
                  title={index === screens.length - 1 ? undefined : "Siguiente (→)"}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Sidebar with title, description, and action button */}
          <aside className="lightbox-split-sidebar">
            <div className="lightbox-sidebar-inner">
              <div className="lightbox-sidebar-meta">
                {current.number && (
                  <span className="lightbox-sidebar-num">{current.number}</span>
                )}
                {current.number && current.tag && (
                  <span className="lightbox-sidebar-divider">/</span>
                )}
                {current.tag && (
                  <span className="lightbox-sidebar-tag">{current.tag}</span>
                )}
              </div>

              <h2 className="lightbox-sidebar-title">{current.title}</h2>

              {current.desc && (
                <p className="lightbox-sidebar-desc">{current.desc}</p>
              )}

              {current.ctaHref && (
                <div className="lightbox-sidebar-action">
                  <a
                    href={current.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lightbox-sidebar-cta"
                  >
                    <span>{current.ctaText || 'Visitar proyecto'}</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
