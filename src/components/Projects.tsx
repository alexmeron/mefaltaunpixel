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
  return (
    <section className="projects page-wrapper">
      <div className="projects-list">
        {/* Waykout — Large */}
        <div className="project-item no-link">
          <div className="project-coming-soon">Coming soon</div>
          <div className="project-image large project-waykout">
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
              <Balloon />
            </motion.div>
          </div>
          <h3 className="project-title">Waykout.com</h3>
        </div>

        {/* Xnorb — Row (Right aligned) */}
        <div className="project-row">
          <div className="empty-slot"></div>
          <div className="project-item no-link">
            <div className="project-coming-soon">Coming soon</div>
            <div className="project-image medium project-xnorb"></div>
            <h3 className="project-title">Xnorb Design System</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
