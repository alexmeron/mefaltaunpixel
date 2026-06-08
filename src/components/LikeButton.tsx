import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isSoulPage = location.pathname.includes('/soul');

  useEffect(() => {
    // 1. Fetch real likes from API
    fetch('/api/likes')
      .then(res => res.json())
      .then((data: any) => {
        if (data && typeof data.likes === 'number') {
          setLikes(data.likes);
        }
      })
      .catch(err => console.error('Failed to fetch likes:', err));

    // 2. Check local storage
    const savedLike = localStorage.getItem('portfolio_liked');
    if (savedLike) {
      setIsLiked(true);
      // We don't increment here because the global count already includes their past like
    }
  }, []);

  const handleLike = () => {
    if (isLiked) {
      // Optimistic update (unlike is not supported globally yet, but we allow removing local flag)
      setIsLiked(false);
      setLikes(prev => prev - 1);
      localStorage.removeItem('portfolio_liked');
      // For simplicity, we only let people ADD likes to the backend.
      // If we wanted unlike, we would need a DELETE endpoint.
    } else {
      // Optimistic update
      setIsLiked(true);
      setLikes(prev => prev + 1);
      localStorage.setItem('portfolio_liked', 'true');
      
      // Tell backend to increment
      fetch('/api/likes', { method: 'POST' })
        .then(res => res.json())
        .then((data: any) => {
          if (data && typeof data.likes === 'number') {
            setLikes(data.likes); // sync with real backend value
          }
        })
        .catch(err => console.error('Failed to post like:', err));
      
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
    <div className={`floating-like-container ${isSoulPage ? 'hide-mobile-soul' : ''}`}>
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
          fill={isLiked ? "var(--accent-pink)" : "rgba(150, 150, 150, 0.15)"} 
          stroke={isLiked ? "var(--accent-pink)" : "currentColor"} 
          strokeWidth={isLiked ? 0 : 2}
          className="heart-icon"
        />
        <span className="like-count">{likes}</span>
      </motion.button>
    </div>
  );
};
