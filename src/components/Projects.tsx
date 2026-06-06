import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Balloon = ({ className }: { className?: string }) => (
  <svg className={className} width="277" height="368" viewBox="0 0 277 368" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M102.871 281.678H171.421C193.214 281.678 210.881 299.346 210.882 321.138V327.996L210.869 329.014C210.329 350.337 192.874 367.454 171.421 367.454H102.871C81.0783 367.454 63.4103 349.789 63.4097 327.996V321.138L63.4227 320.124C63.9543 299.138 80.8673 282.224 101.851 281.691L102.871 281.678ZM102.079 305.782C93.9548 306.195 87.495 312.912 87.4947 321.138V327.996L87.5143 328.787C87.9268 336.914 94.6443 343.372 102.871 343.372H171.421C179.913 343.372 186.799 336.49 186.8 327.996V321.138L186.781 320.347C186.368 312.222 179.648 305.763 171.421 305.763H102.871L102.079 305.782Z" fill="white"/>
    <path d="M138.5 13.3496C208.086 13.3496 263.65 67.5991 263.65 133.494C263.65 199.389 208.086 253.639 138.5 253.639C68.9138 253.639 13.3497 199.389 13.3496 133.494C13.3496 67.5991 68.9138 13.3496 138.5 13.3496Z" stroke="white" stroke-width="26.6988"/>
    <path d="M138.5 18.3558C152.975 18.3559 167.846 29.0462 179.579 50.223C191.153 71.1124 198.572 100.537 198.573 133.493C198.573 166.45 191.153 195.875 179.579 216.765C167.846 237.942 152.975 248.632 138.5 248.632C124.025 248.632 109.154 237.942 97.4211 216.765C85.8473 195.875 78.428 166.451 78.428 133.493C78.4281 100.537 85.8473 71.1124 97.4211 50.223C109.154 29.0461 124.025 18.3558 138.5 18.3558Z" stroke="white" stroke-width="16.6867"/>
  </svg>
);

export const Projects = () => {
  const { t, language } = useLanguage();
  return (
    <section className="projects page-wrapper">
      <div className="projects-list">
        {/* Waykout — Large */}
        <Link to={`/${language}/project/waykout`} className="project-item">
          <div className="project-image large project-waykout">
            <div className="project-waykout-content">
              <div className="project-waykout-text">
                <div className="project-waykout-header">
                  <svg className="waykout-svg-logo" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="512" height="512" fill="#F6085A"/>
                    <path d="M219.959 354.244H288.509C310.302 354.244 327.97 371.912 327.97 393.704V400.562L327.957 401.58C327.417 422.903 309.962 440.02 288.509 440.02H219.959C198.166 440.02 180.498 422.355 180.498 400.562V393.704L180.511 392.69C181.042 371.704 197.955 354.79 218.939 354.257L219.959 354.244ZM219.167 378.348C211.043 378.761 204.583 385.478 204.583 393.704V400.562L204.602 401.353C205.015 409.48 211.732 415.938 219.959 415.938H288.509C297.001 415.938 303.887 409.056 303.889 400.562V393.704L303.869 392.913C303.456 384.788 296.736 378.329 288.509 378.329H219.959L219.167 378.348Z" fill="white"/>
                    <path d="M255.588 85.9156C325.174 85.9156 380.739 140.165 380.739 206.06C380.738 271.955 325.174 326.205 255.588 326.205C186.002 326.205 130.438 271.955 130.438 206.06C130.438 140.165 186.002 85.9156 255.588 85.9156Z" stroke="white" stroke-width="26.6988"/>
                    <path d="M255.588 90.9218C270.063 90.922 284.934 101.612 296.667 122.789C308.241 143.678 315.661 173.103 315.661 206.06C315.661 239.017 308.241 268.441 296.667 289.331C284.934 310.508 270.063 321.198 255.588 321.198C241.113 321.198 226.242 310.508 214.509 289.331C202.935 268.441 195.516 239.017 195.516 206.06C195.516 173.103 202.935 143.678 214.509 122.789C226.242 101.612 241.113 90.9218 255.588 90.9218Z" stroke="white" stroke-width="16.6867"/>
                  </svg>
                  <h3 className="project-waykout-title">{t('waykout_title')}</h3>
                </div>
                <p className="project-waykout-description">{t('waykout_desc')}</p>
              </div>
              <div className="project-waykout-media">
                <img 
                  src="/waykout-preview.png" 
                  alt="Waykout Preview" 
                  className="waykout-preview-image"
                />
              </div>
            </div>
            {/* Balloon backup:
            <motion.div 
              className="balloon-container"
              initial={{ y: 500 }}
              animate={{
                y: [0, -15, 15, 0, 10, -10, 10, -10, 10, -10, -1200, 800, 0],
                x: [0, 5, -5, 0, 20, -20, 20, -20, 20, -20, 0, 0, 0],
                rotate: [0, 2, -2, 0, 15, -15, 15, -15, 15, -15, 45, 0, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                times: [0, 0.3, 0.6, 0.7, 0.72, 0.74, 0.76, 0.78, 0.8, 0.82, 0.86, 0.861, 1],
                ease: "easeInOut"
              }}
            >
              <Balloon className="balloon" />
            </motion.div>
            */}
          </div>
        </Link>
        {/* Helix Design System — 6/12 columns */}
        <div className="project-row half-row">
          <div className="project-item no-link project-helix-item">
            <div className="project-coming-soon">Coming soon</div>
            <div className="project-image large project-helix">
              <div className="project-helix-content">
                <div className="project-helix-text">
                  <div className="project-helix-header">
                    <svg className="helix-svg-logo" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="512" height="512" fill="#1EADFF"/>
                      <path d="M131.284 401V110.091H192.79V230.119H317.648V110.091H379.011V401H317.648V280.83H192.79V401H131.284Z" fill="white"/>
                    </svg>
                    <h3 className="project-helix-title">{t('helix_title')}</h3>
                  </div>
                  <p className="project-helix-description">{t('helix_desc')}</p>
                </div>
                <div className="project-helix-media">
                  <img src="/helix-preview.png" alt="Helix Design System Preview" className="helix-preview-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
