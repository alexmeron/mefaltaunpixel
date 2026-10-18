import React, { useState, useCallback } from 'react';
import { ArrowRight, ArrowUp, ArrowDown, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { fireConfetti } from '../utils/confetti';

// ── Toggle ────────────────────────────────────────────────────────────────────
const InlineToggle = () => {
  const [on, setOn] = useState(true);
  return (
    <button
      className={`hs-toggle${on ? ' hs-toggle--on' : ''}`}
      onClick={() => setOn(v => !v)}
      aria-label={on ? 'On' : 'Off'}
    >
      <span className="hs-toggle-thumb" />
    </button>
  );
};

// ── Color Dot ─────────────────────────────────────────────────────────────────
const COLORS = ['#FF4D6D', '#FF9F43', '#F7C948', '#2ECC71', '#4DABF7', '#845EF7', '#F06595'];
const InlineColorDot = () => {
  const [idx, setIdx] = useState(0);
  const [clicks, setClicks] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIdx(i => (i + 1) % COLORS.length);
    const nextCount = clicks + 1;
    setClicks(nextCount);
    if (nextCount % 10 === 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <button
      className="hs-color-dot"
      style={{ background: COLORS[idx] }}
      onClick={handleClick}
      aria-label="Change color"
      title="Click me!"
    />
  );
};

// ── Counter ───────────────────────────────────────────────────────────────────
const InlineCounter = () => {
  const [n, setN] = useState(15);

  return (
    <button className="hs-counter" onClick={() => setN(v => v + 1)}>
      {n}+
    </button>
  );
};

// ── Icon Button ───────────────────────────────────────────────────────────────
const ARROW_ICONS = [ArrowRight, ArrowUp, ArrowLeft, ArrowDown];

const InlineIconBtn = () => {
  const [idx, setIdx] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const Icon = ARROW_ICONS[idx];

  const handleClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setIdx(i => (i + 1) % ARROW_ICONS.length);
      setSpinning(false);
    }, 180);
  };

  return (
    <button
      className={`hs-iconbtn${spinning ? ' hs-iconbtn--spin' : ''}`}
      onClick={handleClick}
      aria-label="Icon button"
    >
      <Icon size={24} strokeWidth={2} />
    </button>
  );
};

// ── Stars ─────────────────────────────────────────────────────────────────────
const InlineStars = () => {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);

  return (
    <span 
      className="hs-stars" 
      role="group" 
      aria-label="Rating stars"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map(i => {
        const isFilled = i <= (hover > 0 ? hover : rating);
        return (
          <button
            key={i}
            type="button"
            className={`hs-star${isFilled ? ' hs-star--on' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setRating(prev => (prev === i ? 0 : i));
            }}
            onMouseEnter={() => setHover(i)}
            aria-label={`${i} star`}
          >
            ★
          </button>
        );
      })}
    </span>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export const HeroStatement = () => {
  const { language } = useLanguage();

  if (language === 'es') {
    return (
      <p className="hero-statement-text">
        Diseñador de producto con más de{' '}
        <InlineCounter />{' '}
        años de experiencia, combinando{' '}
        <InlineColorDot />{' '}
        diseño de producto,{' '}
        <InlineToggle />{' '}
        sistemas de diseño y flujos de trabajo potenciados por IA para ayudar a equipos{' '}
        <InlineIconBtn />{' '}
        a construir mejores productos digitales, trabajar de forma más eficiente y escalar con consistencia.{' '}
        <InlineStars />
      </p>
    );
  }

  return (
    <p className="hero-statement-text">
      Product designer with{' '}
      <InlineCounter />{' '}
      years of experience, combining{' '}
      <InlineColorDot />{' '}
      product design,{' '}
      <InlineToggle />{' '}
      design systems, and AI-powered workflows to help teams{' '}
      <InlineIconBtn />{' '}
      build better digital products, work more efficiently, and scale with consistency.{' '}
      <InlineStars />
    </p>
  );
};
