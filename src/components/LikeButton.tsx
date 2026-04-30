import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export const LikeButton = () => {
  const [likes, setLikes] = useState(124);
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const savedLike = localStorage.getItem('portfolio_liked');
    if (savedLike) {
      setIsLiked(true);
      setLikes(prev => prev + 1);
    }
  }, []);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes(prev => prev - 1);
      localStorage.removeItem('portfolio_liked');
    } else {
      setIsLiked(true);
      setLikes(prev => prev + 1);
      localStorage.setItem('portfolio_liked', 'true');
      
      // Generate particles
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: 0,
        y: 0,
        angle: (Math.PI * 2 / 12) * i + (Math.random() * 0.5)
      }));
      setParticles(newParticles);
      
      // Cleanup particles
      setTimeout(() => setParticles([]), 1200);
    }
  };

  return (
    <div className="floating-like-container">
      <div className="particles-wrapper">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="heart-particle"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
              animate={{ 
                x: Math.cos(p.angle) * (100 + Math.random() * 50), 
                y: Math.sin(p.angle) * (100 + Math.random() * 50) - 60, 
                opacity: 0,
                scale: [1, 1.5, 0.8],
                rotate: p.angle * 100
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Heart fill="var(--accent-pink)" stroke="none" size={20} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>


      <motion.button 
        className={`like-button ${isLiked ? 'liked' : ''}`}
        onClick={handleLike}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Like this portfolio"
      >
        <Heart 
          size={24} 
          fill={isLiked ? "var(--accent-pink)" : "none"} 
          stroke={isLiked ? "var(--accent-pink)" : "currentColor"} 
          className="heart-icon"
        />
        <span className="like-count">{likes}</span>
      </motion.button>
    </div>
  );
};
