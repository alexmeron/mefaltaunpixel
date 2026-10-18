import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSoulOverlay } from '../context/SoulOverlayContext';
import { useSoulPlaceholder } from '../hooks/useSoulPlaceholder';

export const FloatingSoulBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, openOverlay } = useSoulOverlay();
  const [query, setQuery] = useState('');
  const isHomePage = location.pathname === '/' || location.pathname === '';
  const isAboutPage = location.pathname.startsWith('/about');
  const isSoulPage = location.pathname.includes('/soul');
  const [isScrolled, setIsScrolled] = useState(false);
  const placeholder = useSoulPlaceholder(query);

  useEffect(() => {
    if (isSoulPage) return;

    const handleScroll = () => {
      if (isHomePage) {
        const targetEl = document.querySelector('.hero-card');
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          if (rect.bottom < 80 || window.scrollY > 300) {
            setIsScrolled(true);
          } else if (window.scrollY < 120) {
            setIsScrolled(false);
          }
          return;
        }
      }
      // On other pages (Projects, Resources, Articles, etc.): visible once scrolled
      setIsScrolled(window.scrollY > 220);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, isSoulPage]);

  // Determine visibility:
  // - On About: always visible
  // - On other non-Soul pages: visible whenever scrolled
  // - On Soul: never visible
  // - When overlay drawer is open: hidden
  const isVisible = !isSoulPage && !isOpen && (isAboutPage || isScrolled);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    openOverlay(query.trim());
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="hero-floating-input-bar"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <form className="hero-prompt-container soul-prompt-container" onSubmit={handleSubmit}>
            <input
              type="text"
              className="hero-prompt-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
