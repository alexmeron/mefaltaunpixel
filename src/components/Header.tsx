import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Linkedin, Figma, Dribbble } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const LogoIcon = () => (
  <svg width="26" height="36" viewBox="0 0 26 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.1158 26.587C23.1158 26.587 24.0287 26.7638 24.0755 27.5815C24.0755 27.5815 24.7543 25.0178 23.6307 23.3824C23.6307 23.3824 24.6607 23.8465 24.6607 24.7526C24.6607 24.7526 24.9884 21.4375 23.4903 20.1335C23.4903 20.1335 23.8882 19.9346 24.1925 20.3987C24.1925 20.3987 24.5905 17.8571 23.4903 16.6858C23.4903 16.6858 24.6607 16.7963 25.1055 16.0227C25.1055 16.0227 23.303 15.2271 23.2328 13.4369C23.1626 11.6468 23.6776 8.1548 21.6879 7.22656C21.8985 9.25985 21.2899 11.912 18.5746 10.6964C16.7253 9.87868 15.3208 7.40337 13.3077 9.63557C13.3077 9.63557 11.7628 7.80119 9.72625 9.45876C8.78992 10.2102 7.83019 11.5141 6.51933 11.2931C4.99779 11.05 4.64667 8.48632 4.62326 7.27076C4.62326 6.93925 2.84423 9.19355 2.53993 12.133C2.21221 15.0945 1.74405 15.5365 0.105469 16.1111C0.105469 16.1111 1.34611 17.5919 2.58674 16.5532C2.58674 16.5532 2.98468 17.8129 1.18225 18.7633C1.18225 18.7633 2.35266 19.4263 3.42944 17.9455C3.42944 17.9455 3.5933 19.7799 1.65041 21.2607C1.65041 21.2607 2.42288 21.9237 3.75715 20.5976C3.75715 20.5976 2.89105 23.0287 1.58019 23.9791C1.58019 23.9791 2.35266 24.4874 3.45285 23.6034C3.45285 23.6034 3.6167 25.7251 1.43974 27.3605C1.43974 27.3605 2.44629 28.5319 4.15509 26.8522C4.15509 26.8522 3.99124 29.1286 2.28243 29.5043C2.28243 29.5043 3.82738 30.3221 5.32551 28.996C5.32551 28.996 5.48936 30.3884 4.38918 31.1177C4.38918 31.1177 6.33206 31.3387 6.96408 30.1674C6.96408 30.1674 7.03431 31.7807 6.19161 32.2227C6.19161 32.2227 7.36202 33.5488 8.60266 31.847C8.60266 31.847 8.76652 33.1068 7.83019 33.4604C7.83019 33.4604 9.39854 34.4107 11.1776 33.0184C11.1776 33.0184 11.6457 35.2948 13.2843 34.9191C13.2843 34.9191 12.5821 33.372 13.2843 32.4217C13.2843 32.4217 14.3845 33.0184 13.8227 33.9687C13.8227 33.9687 15.0633 33.9687 15.3676 32.488C15.3676 32.488 16.4678 33.9687 18.1766 33.3057C18.1766 33.3057 17.1701 32.4217 17.6382 31.4713C17.6382 31.4713 18.9491 32.3996 20.8686 31.9133C20.8686 31.9133 20.0727 30.3663 20.6579 29.5706C20.6579 29.5706 21.6879 30.3221 21.641 30.9851C21.641 30.9851 22.4369 30.3884 22.2731 29.1728C22.2731 29.1728 23.2328 29.9905 25.0821 28.9739C25.0821 28.9739 23.0221 28.1341 23.1158 26.587ZM14.1036 14.2547C12.8864 14.3652 11.5989 14.2105 10.5924 13.879C10.3583 13.8126 10.171 13.7021 10.0306 13.5695C9.39854 12.9507 10.054 12.5529 10.8499 12.5529C11.6925 12.5529 12.2075 12.3098 12.863 11.8678C13.3545 11.5362 12.2075 12.3098 12.863 11.8678C13.3545 11.5362 13.7291 11.8678 14.127 12.133C14.7356 12.5308 18.5512 12.575 16.0231 13.7463C15.8592 13.8568 15.0867 14.2326 14.1036 14.2547Z" fill="currentColor" stroke="currentColor" strokeWidth="0.125536" strokeMiterlimit="10"/>
    <path d="M7.13672 4.75666L10.6019 0.863525" stroke="currentColor" strokeWidth="1.17188" strokeMiterlimit="10" strokeLinecap="round"/>
    <path d="M10.6019 4.75666L7.13672 0.863525" stroke="currentColor" strokeWidth="1.17188" strokeMiterlimit="10" strokeLinecap="round"/>
    <path d="M16.9961 4.88281C18.1826 4.88281 19.1445 3.92092 19.1445 2.73437C19.1445 1.54783 18.1826 0.585938 16.9961 0.585938C15.8095 0.585938 14.8477 1.54783 14.8477 2.73437C14.8477 3.92092 15.8095 4.88281 16.9961 4.88281Z" fill="currentColor" stroke="currentColor" strokeWidth="1.17188" strokeMiterlimit="10"/>
  </svg>
);

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [theme, setTheme] = React.useState('light');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Auto-theme logic (Spain Time)
  React.useEffect(() => {
    const checkTheme = () => {
      // Create date in Spain timezone
      const now = new Date();
      const spainTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Madrid',
        hour: 'numeric',
        hour12: false
      }).format(now);
      
      const hour = parseInt(spainTime, 10);
      const isNight = hour >= 20 || hour < 8;
      const initialTheme = isNight ? 'dark' : 'light';
      
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    };

    checkTheme();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    // Replace current lang in URL
    const newPath = location.pathname.replace(`/${language}`, `/${newLang}`);
    navigate(newPath);
  };

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          <Link to={`/${language}`} className="logo-area" onClick={() => setIsMenuOpen(false)}>
            <LogoIcon />
            <span className="logo-name">Alex Salmerón</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-center desktop-only">
            <ul className="nav-links">
              <li><NavLink to={`/${language}/soul`} className={({isActive}) => isActive ? 'nav-active' : ''}>{t('nav_soul')}</NavLink></li>
              <li><NavLink to={`/${language}/about`} className={({isActive}) => isActive ? 'nav-active' : ''}>{t('nav_about')}</NavLink></li>
              <li><NavLink to={`/${language}`} end className={({isActive}) => isActive ? 'nav-active' : ''}>{t('nav_work')}</NavLink></li>
              <li><span style={{ opacity: 0.4, cursor: 'default' }}>{t('nav_articles')}</span></li>
              <li><a href="/cv-alex-salmeron.pdf" target="_blank" rel="noreferrer">{t('nav_resume')}</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <div className="header-actions-group desktop-only">
              <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle language">
                {language === 'es' ? 'EN' : 'ES'}
              </button>
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            <div className="mobile-only menu-trigger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </div>

            <div className="mobile-menu-content">
              <nav className="mobile-nav">
                <NavLink to={`/${language}/soul`} onClick={() => setIsMenuOpen(false)}>{t('nav_soul')}</NavLink>
                <NavLink to={`/${language}/about`} onClick={() => setIsMenuOpen(false)}>{t('nav_about')}</NavLink>
                <NavLink to={`/${language}`} end onClick={() => setIsMenuOpen(false)}>{t('nav_work')}</NavLink>
                <span style={{ opacity: 0.4, fontSize: '35px', fontWeight: 500, letterSpacing: '-0.02em' }}>{t('nav_articles')}</span>
                <a href="/cv-alex-salmeron.pdf" target="_blank" rel="noreferrer">{t('nav_resume')}</a>
              </nav>

              <div className="mobile-controls">
                <div className="mobile-control-item" onClick={toggleLanguage}>
                  <span>{language === 'es' ? 'Idioma: EN' : 'Language: ES'}</span>
                </div>
                <div className="mobile-control-item" onClick={toggleTheme}>
                  <span>{theme === 'light' ? t('theme_dark') : t('theme_light')}</span>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </div>
              </div>

              <div className="mobile-socials">
                <a href="https://www.linkedin.com/in/alexsalmeron/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={24} />
                </a>
                <a href="https://www.figma.com/@mefaltaunpixel/" target="_blank" rel="noreferrer" aria-label="Figma">
                  <Figma size={24} />
                </a>
                <a href="https://dribbble.com/mefaltaunpixel" target="_blank" rel="noreferrer" aria-label="Dribbble">
                  <Dribbble size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
