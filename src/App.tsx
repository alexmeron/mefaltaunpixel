import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Soul } from './pages/Soul';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetail';
import { ProjectDetail } from './pages/ProjectDetail';
import { LikeButton } from './components/LikeButton';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/soul" element={<Soul />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
        <LikeButton />
      </Router>
    </LanguageProvider>
  );
}

export default App;
