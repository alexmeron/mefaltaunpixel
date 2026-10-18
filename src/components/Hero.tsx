import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoulOverlay } from '../context/SoulOverlayContext';
import { useSoulPlaceholder } from '../hooks/useSoulPlaceholder';

interface PassConfig {
  id: number;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  duration: number;
  size: number;
}

export const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { openOverlay } = useSoulOverlay();
  const [query, setQuery] = useState('');
  const [pass, setPass] = useState<PassConfig | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const heroPlaceholder = useSoulPlaceholder(query);

  useEffect(() => {
    // Focus hero input so cursor blinks immediately on landing
    heroInputRef.current?.focus();
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    const routes = [
      // 1. Left to right rising
      { startX: '-35%', startY: '85%', endX: '135%', endY: '20%' },
      // 2. Left to right descending
      { startX: '-35%', startY: '20%', endX: '135%', endY: '75%' },
      // 3. Left to right horizontal sweep
      { startX: '-35%', startY: '50%', endX: '135%', endY: '45%' },
      // 4. Right to left rising
      { startX: '135%', startY: '80%', endX: '-35%', endY: '15%' },
      // 5. Right to left descending
      { startX: '135%', startY: '25%', endX: '-35%', endY: '80%' },
      // 6. Right to left horizontal sweep
      { startX: '135%', startY: '45%', endX: '-35%', endY: '55%' },
    ];

    const launchPass = () => {
      if (isCancelled) return;
      const route = routes[Math.floor(Math.random() * routes.length)];
      const duration = 4.8 + Math.random() * 2.0; // 4.8s - 6.8s steady graceful transit
      const size = 480 + Math.random() * 120; // 480px - 600px diameter

      setPass({
        id: Date.now(),
        ...route,
        duration,
        size
      });

      // Schedule next pass after this pass completes + short pause (0.5s to 2s)
      const pause = 0.5 + Math.random() * 1.5;
      const nextDelay = (duration + pause) * 1000;
      timeoutId = setTimeout(launchPass, nextDelay);
    };

    // First pass starts after 1.2s for pleasant entrance
    timeoutId = setTimeout(launchPass, 1200);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    openOverlay(query.trim());
    setQuery('');
  };

  const renderHeroTitle = () => {
    const title = t('hero_title');
    const hIndex = title.indexOf('H');
    if (hIndex === -1) return title;
    const before = title.slice(0, hIndex);
    const after = title.slice(hIndex + 1);
    return (
      <>
        {before}
        <span className="hero-h-wrapper">
          H
          <img
            src="/soul-mascot-yellow.png?v=2"
            alt="Sitting Soul Companion"
            className="hero-mascot-sitting"
          />
        </span>
        {after}
      </>
    );
  };

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-card">
        <div className="hero-radial-dots" aria-hidden="true" />
        <div className="hero-corner-blur" aria-hidden="true" />
        <AnimatePresence>
          {pass && (
            <motion.div
              key={pass.id}
              className="hero-passing-blur"
              initial={{
                left: pass.startX,
                top: pass.startY,
                opacity: 0,
                scale: 0.85
              }}
              animate={{
                left: [pass.startX, pass.endX],
                top: [pass.startY, pass.endY],
                opacity: [0, 0.8, 0.8, 0],
                scale: [0.85, 1.2, 1.2, 0.85]
              }}
              exit={{ opacity: 0 }}
              transition={{
                left: {
                  duration: pass.duration,
                  ease: 'linear'
                },
                top: {
                  duration: pass.duration,
                  ease: 'linear'
                },
                opacity: {
                  duration: pass.duration,
                  times: [0, 0.2, 0.8, 1],
                  ease: 'easeInOut'
                },
                scale: {
                  duration: pass.duration,
                  times: [0, 0.2, 0.8, 1],
                  ease: 'easeInOut'
                }
              }}
              onAnimationComplete={() => {
                setPass(null);
              }}
              style={{
                width: pass.size,
                height: pass.size
              }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
        <h1 className="hero-title">{renderHeroTitle()}</h1>
        <p className="hero-subtitle">{t('hero_subtitle')}</p>

        <form className="hero-prompt-container" onSubmit={handleSubmit}>
          <img src="/soul-mascot-purple.png?v=6" alt="Soul companion" className="hero-prompt-mascot-purple" />
          <img src="/soul-mascot-swat.png?v=green2" alt="Tactical Soul Mascot" className="hero-mascot-swat" />
          <input
            ref={heroInputRef}
            autoFocus
            type="text"
            className="hero-prompt-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={heroPlaceholder}
            aria-label="Ask about Álex"
          />
          <div className="hero-prompt-actions">
            <button
              type="submit"
              className="prompt-submit-btn"
              disabled={!query.trim()}
              title="Send"
              aria-label="Submit prompt"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
