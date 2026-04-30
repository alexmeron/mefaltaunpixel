import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Projects = () => {
  const { language } = useLanguage();

  return (
    <section className="projects page-wrapper">
      <div className="projects-list">
        {/* Waykout — Large */}
        <Link to={`/${language}/project/waykout`} className="project-item">
          <div className="project-image large project-waykout"></div>
          <h3 className="project-title">Waykout</h3>
        </Link>
      </div>
    </section>
  );
};
