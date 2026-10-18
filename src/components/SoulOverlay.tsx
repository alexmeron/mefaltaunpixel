import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getSoulResponse } from '../data/soul-knowledge';
import { useSoulPlaceholder } from '../hooks/useSoulPlaceholder';

/* ─── Types ─── */
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/* ─── Helpers ─── */
const renderTextWithLinks = (text: string) => {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="cv-link"
          style={{ textDecoration: 'underline' }}
        >
          {match[1]}
        </a>
      );
    }
    return part;
  });
};

const buildResponse = (messageText: string, lang?: string): string => {
  return getSoulResponse(messageText, lang);
};

/* ─── Soul Right Drawer Component ─── */
export const SoulOverlay = ({
  initialQuery,
  onClose,
}: {
  initialQuery: string;
  onClose: () => void;
}) => {
  const { t, language } = useLanguage();
  const trimmedInitial = initialQuery?.trim() || '';

  const [messages, setMessages] = useState<Message[]>(() => {
    if (trimmedInitial) {
      return [
        {
          id: `user-${Date.now()}`,
          role: 'user',
          content: trimmedInitial,
        },
      ];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState<boolean>(() => Boolean(trimmedInitial));
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const drawerPlaceholder = useSoulPlaceholder(input);

  const greetingText = React.useMemo(() => {
    const hour = new Date().getHours();
    let timeGreeting = "";

    if (language === 'es') {
      if (hour >= 5 && hour < 12) timeGreeting = "Buenos días";
      else if (hour >= 12 && hour < 20) timeGreeting = "Buenas tardes";
      else timeGreeting = "Buenas noches";
      return `${timeGreeting}. <span translate="no">Soy Soul</span>.<br />¿Qué quieres saber sobre Álex?`;
    }

    if (hour >= 5 && hour < 12) timeGreeting = "Good morning";
    else if (hour >= 12 && hour < 20) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    return `${timeGreeting}. <span translate="no">I’m Soul</span>.<br />What do you want to know about Álex?`;
  }, [language]);

  const introText =
    language === 'es'
      ? "¡Hola! Estoy aquí para responder cualquier pregunta sobre Alex, su experiencia y su forma de trabajar. Puedes elegir uno de los prompts sugeridos o preguntarme directamente lo que quieras saber."
      : "Hi! I'm here to answer any questions about Alex, his experience, and the way he works. You can choose one of the suggested prompts or simply ask me anything you'd like to know.";

  const SOUL_SUGGESTIONS = [
    { label: `👤 ${t('soul_suggestion_about')}`, key: "about" },
    { label: `💼 ${t('soul_suggestion_current')}`, key: "current" },
    { label: `⚡ ${t('soul_suggestion_skills')}`, key: "skills" },
    { label: `📍 ${t('soul_suggestion_located')}`, key: "located" },
    { label: `🐶 ${t('soul_suggestion_bronx')}`, key: "bronx" },
    { label: `🔗 ${t('soul_suggestion_social')}`, key: "social" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Handle assistant response for initial query
  useEffect(() => {
    if (!trimmedInitial) return;

    let isMounted = true;
    const timer = setTimeout(() => {
      if (!isMounted) return;
      const response = buildResponse(trimmedInitial, language);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => {
        if (prev.some((m) => m.role === 'assistant')) return prev;
        return [...prev, assistantMessage];
      });
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);

      if (response.includes('[/cv-alex-salmeron.pdf]')) {
        window.open('/cv-alex-salmeron.pdf', '_blank');
      }
    }, 750);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [trimmedInitial, language]);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (text: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = buildResponse(messageText.trim(), language);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);

      if (response.includes('[/cv-alex-salmeron.pdf]')) {
        window.open('/cv-alex-salmeron.pdf', '_blank');
      }
    }, 750);
  };

  const renderMessage = (m: Message) => {
    const content = m.content;

    if (content.includes('[img:')) {
      const before = content.split('[img:')[0].trim();
      const imgMatch = content.match(/\[img:(.*?)\]/);
      const after = content.split(']')[1]?.trim() || '';
      return (
        <div className="message-with-image">
          {before && <p>{renderTextWithLinks(before)}</p>}
          {imgMatch && (
            <img
              src={imgMatch[1]}
              alt="Soul illustration"
              className="chat-image"
            />
          )}
          {after && <p>{renderTextWithLinks(after)}</p>}
        </div>
      );
    }

    if (content.includes('|') && content.includes('\n|')) {
      const lines = content.split('\n');
      const tableLines = lines.filter((line) => line.trim().startsWith('|'));
      const otherLines = lines.filter((line) => !line.trim().startsWith('|'));
      const headers = tableLines[0]
        .split('|')
        .filter((s) => s.trim() !== '')
        .map((s) => s.trim());
      const rows = tableLines
        .slice(2)
        .map((line) =>
          line
            .split('|')
            .filter((s) => s.trim() !== '')
            .map((s) => s.trim())
        )
        .filter((row) => row.length > 0);

      return (
        <div className="message-content">
          {otherLines.map(
            (line, i) => line.trim() && <p key={i}>{renderTextWithLinks(line)}</p>
          )}
          <div className="table-container">
            <table className="soul-table">
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>
                        {cell.startsWith('**') ? (
                          <strong>{cell.replace(/\*\*/g, '')}</strong>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (content.includes('[/cv-alex-salmeron.pdf]')) {
      const parts = content.split('[/cv-alex-salmeron.pdf]');
      return (
        <p>
          {parts[0].trim() && renderTextWithLinks(parts[0].trim())}
          <a
            href="/cv-alex-salmeron.pdf"
            target="_blank"
            rel="noreferrer"
            className="cv-link"
            style={{ margin: '0 4px', textDecoration: 'underline' }}
          >
            cv-alex-salmeron.pdf
          </a>
          {parts[1]?.trim() && renderTextWithLinks(parts[1].trim())}
        </p>
      );
    }

    return <p>{renderTextWithLinks(content)}</p>;
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="soul-drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Right Drawer Panel */}
      <motion.aside
        className="soul-drawer-panel"
        role="dialog"
        aria-label="Soul AI Assistant"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        {/* Drawer Header Actions */}
        <div className="soul-drawer-header">
          <div className="soul-drawer-actions">
            <Link
              to="/soul"
              state={{
                messages,
                input,
                isTyping,
              }}
              onClick={onClose}
              className="soul-drawer-action-btn"
              title={
                language === 'es'
                  ? 'Abrir en página completa'
                  : 'Open full screen'
              }
              aria-label="Open full screen"
            >
              <Maximize2 size={16} />
            </Link>
            <button
              onClick={onClose}
              className="soul-drawer-action-btn"
              aria-label="Close drawer"
              title={language === 'es' ? 'Cerrar' : 'Close'}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="soul-drawer-body">
          <div className="soul-greeting">
            <div className="soul-avatar-wrapper">
              <img
                src="/soul-mascot.png"
                alt="Soul mascot"
                className="soul-avatar-img"
              />
            </div>
            <h2 className="greeting-text">
              <span dangerouslySetInnerHTML={{ __html: greetingText }} />
            </h2>
            <p className="soul-intro-text">{introText}</p>
            <div className="suggestion-pills">
              {SOUL_SUGGESTIONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className="suggestion-pill"
                  onClick={() => handleSend(s.label)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {messages.length > 0 && (
            <div className="chat-history">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`chat-row chat-row--${m.role}`}
                >
                  {m.role === 'assistant' && (
                    <div className="role-indicator">
                      <div className="dot" />
                      <span className="role-name">Soul</span>
                    </div>
                  )}
                  <div className={`message-bubble message-bubble--${m.role}`}>
                    {renderMessage(m)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-row chat-row--assistant typing">
                  <div className="role-indicator">
                    <div className="dot" />
                    <span className="role-name">Soul</span>
                  </div>
                  <div className="typing-bubbles">
                    <span className="bubble" />
                    <span className="bubble" />
                    <span className="bubble" />
                  </div>
                </div>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Drawer Footer Input */}
        <div className="soul-drawer-footer">
          <form
            className="hero-prompt-container soul-drawer-prompt-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                drawerPlaceholder ||
                (language === 'es'
                  ? 'Pregunta cualquier cosa sobre Álex'
                  : 'Ask anything about Álex')
              }
              className="hero-prompt-input"
            />
            <div className="hero-prompt-actions">
              <button
                type="submit"
                className="prompt-submit-btn"
                disabled={!input.trim() || isTyping}
                title="Send"
                aria-label="Submit prompt"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </motion.aside>
    </>
  );
};
