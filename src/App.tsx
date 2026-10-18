import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Home } from './pages/Home';

const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Soul = lazy(() => import('./pages/Soul').then(m => ({ default: m.Soul })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const Resources = lazy(() => import('./pages/Resources').then(m => ({ default: m.Resources })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));

import { LikeButton } from './components/LikeButton';
import { FloatingSoulBar } from './components/FloatingSoulBar';
import { SoulOverlay } from './components/SoulOverlay';
import { LanguageProvider } from './context/LanguageContext';
import { SoulOverlayProvider, useSoulOverlay } from './context/SoulOverlayContext';

const LegacyProjectRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/project/${id || ''}`} replace />;
};

const LegacyArticleRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/articles/${id || ''}`} replace />;
};

const AppContent = () => {
  const { isOpen, closeOverlay, initialQuery, overlayId } = useSoulOverlay();
  const location = useLocation();
  const isSoulPage = location.pathname.includes('/soul');

  // Close drawer if navigating to the full Soul page
  useEffect(() => {
    if (isSoulPage && isOpen) {
      closeOverlay();
    }
  }, [isSoulPage, isOpen, closeOverlay]);

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/soul" element={<Soul />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/projects" element={<Projects />} />
          {/* Articles temporarily hidden - redirecting to home */}
          <Route path="/articles" element={<Navigate to="/" replace />} />
          <Route path="/articles/:id" element={<Navigate to="/" replace />} />
          <Route path="/project/:id" element={<ProjectDetail />} />

          {/* Legacy language redirects (e.g. /en/project/waykout -> /project/waykout) */}
          <Route path="/:lang/project/:id" element={<LegacyProjectRedirect />} />
          <Route path="/:lang/articles/:id" element={<Navigate to="/" replace />} />
          <Route path="/:lang/about" element={<Navigate to="/about" replace />} />
          <Route path="/:lang/soul" element={<Navigate to="/soul" replace />} />
          <Route path="/:lang/resources" element={<Navigate to="/resources" replace />} />
          <Route path="/:lang/projects" element={<Navigate to="/projects" replace />} />
          <Route path="/:lang/articles" element={<Navigate to="/" replace />} />
          <Route path="/:lang" element={<Navigate to="/" replace />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <FloatingSoulBar />
      <LikeButton />

      {/* Soul Right Drawer when queried from any other page */}
      <AnimatePresence>
        {isOpen && !isSoulPage && (
          <SoulOverlay
            key={`soul-drawer-${overlayId}`}
            initialQuery={initialQuery}
            onClose={closeOverlay}
          />
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <SoulOverlayProvider>
        <Router>
          <AppContent />
        </Router>
      </SoulOverlayProvider>
    </LanguageProvider>
  );
}

export default App;
