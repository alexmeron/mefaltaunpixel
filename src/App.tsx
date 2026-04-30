import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Soul } from './pages/Soul';
import { ProjectDetail } from './pages/ProjectDetail';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// This component syncs the URL language parameter with the context state
const LanguageManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useParams<{ lang: string }>();
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (lang === 'es' || lang === 'en') {
      setLanguage(lang as 'es' | 'en');
    } else {
      // Default to browser language or 'en' if not es/en
      const userLang = navigator.language.split('-')[0].toLowerCase() === 'es' ? 'es' : 'en';
      navigate(`/${userLang}${location.pathname}`, { replace: true });
    }
  }, [lang, setLanguage, navigate, location.pathname]);

  return <>{children}</>;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Redirect root to /es or /en */}
          <Route path="/" element={<Navigate to={`/${navigator.language.split('-')[0].toLowerCase() === 'es' ? 'es' : 'en'}`} replace />} />
          
          {/* Main routes wrapped in LanguageManager */}
          <Route path="/:lang" element={<LanguageManager><Header /><Home /></LanguageManager>} />
          <Route path="/:lang/about" element={<LanguageManager><Header /><About /></LanguageManager>} />
          <Route path="/:lang/soul" element={<LanguageManager><Header /><Soul /></LanguageManager>} />
          <Route path="/:lang/project/:id" element={<LanguageManager><Header /><ProjectDetail /></LanguageManager>} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
