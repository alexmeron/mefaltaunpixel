import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getSoulResponse } from '../data/soul-knowledge';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { useSoulPlaceholder } from '../hooks/useSoulPlaceholder';


interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 20) return "Good afternoon";
  return "Good evening";
};

const SUGGESTIONS = [
  { label: "About Álex", key: "about" },
  { label: "Current role", key: "current" },
  { label: "Skills", key: "skills" },
  { label: "Located", key: "located" },
  { label: "Who is Bronx?", key: "bronx" },
  { label: "Social", key: "social" }
];

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

export const Soul = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationState = location.state as {
    messages?: Message[];
    input?: string;
    isTyping?: boolean;
    query?: string;
  } | null;

  const qParam = searchParams.get('q') || locationState?.query;
  const lastHandledQuery = useRef<string | null>(null);

  const [messages, setMessages] = useState<Message[]>(() => locationState?.messages || []);
  const [input, setInput] = useState<string>(() => locationState?.input || '');
  const [isTyping, setIsTyping] = useState<boolean>(() => Boolean(locationState?.isTyping));
  const [isFocused, setIsFocused] = useState(false);
  const displayedPlaceholder = useSoulPlaceholder(input);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  const scrollToBottom = () => {
    if (messages.length > 0 || isTyping) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    inputRef.current?.focus();

    setTimeout(() => {
      const response = getSoulResponse(messageText, language);
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Re-focus input after response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Auto-open PDF if requested
      if (response.includes('[/cv-alex-salmeron.pdf]')) {
        window.open('/cv-alex-salmeron.pdf', '_blank');
      }
    }, 1000);
  };

  useEffect(() => {
    // If expanded from drawer while assistant response was pending:
    if (locationState?.messages && locationState.messages.length > 0) {
      const lastMsg = locationState.messages[locationState.messages.length - 1];
      if (lastMsg.role === 'user') {
        setIsTyping(true);
        const timer = setTimeout(() => {
          const response = getSoulResponse(lastMsg.content, language);
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response,
          };
          setMessages((prev) => {
            if (prev.some((m) => m.role === 'assistant' && m.id === assistantMessage.id)) {
              return prev;
            }
            return [...prev, assistantMessage];
          });
          setIsTyping(false);
          setTimeout(() => inputRef.current?.focus(), 100);

          if (response.includes('[/cv-alex-salmeron.pdf]')) {
            window.open('/cv-alex-salmeron.pdf', '_blank');
          }
        }, 750);
        return () => clearTimeout(timer);
      }
      return;
    }

    const trimmed = qParam?.trim();
    if (trimmed && lastHandledQuery.current !== `${location.key}:${trimmed}`) {
      lastHandledQuery.current = `${location.key}:${trimmed}`;
      handleSend(trimmed);
    }
  }, [qParam, location.key, locationState, language]);

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

  const introText = language === 'es'
    ? "¡Hola! Estoy aquí para responder cualquier pregunta sobre Alex, su experiencia y su forma de trabajar. Puedes elegir uno de los prompts sugeridos o preguntarme directamente lo que quieras saber."
    : "Hi! I'm here to answer any questions about Alex, his experience, and the way he works. You can choose one of the suggested prompts or simply ask me anything you'd like to know.";

  const SOUL_SUGGESTIONS = [
    { label: `👤 ${t('soul_suggestion_about')}`, key: "about" },
    { label: `💼 ${t('soul_suggestion_current')}`, key: "current" },
    { label: `⚡ ${t('soul_suggestion_skills')}`, key: "skills" },
    { label: `📍 ${t('soul_suggestion_located')}`, key: "located" },
    { label: `🐶 ${t('soul_suggestion_bronx')}`, key: "bronx" },
    { label: `🔗 ${t('soul_suggestion_social')}`, key: "social" }
  ];

  return (
    <main className="soul-page">
      <SEO title={t('seo_soul_title')} description={t('seo_soul_desc')}  />
      {/* Background with blurred shapes */}
      <section className="soul-hero">
        <div className="soul-content">
          <div className="soul-greeting">
            <div className="soul-avatar-wrapper">
              <img src="/soul-mascot.png" alt="Soul mascot" className="soul-avatar-img" />
            </div>
            <h1 className="greeting-text">
              <span dangerouslySetInnerHTML={{ __html: greetingText }} />
            </h1>
            <p className="soul-intro-text">
              {introText}
            </p>
            
            <div className="suggestion-pills">
              {SOUL_SUGGESTIONS.map(s => (
                <button key={s.key} className="suggestion-pill" onClick={() => handleSend(s.label)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-history">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`chat-row chat-row--${m.role}`}
              >
                {m.role === 'assistant' && (
                  <div className="role-indicator">
                    <div className="dot" />
                    <span className="role-name">Soul</span>
                  </div>
                )}
                <div className={`message-bubble message-bubble--${m.role}`}>
                  {(() => {
                    const content = m.content;
                    
                    // First handle Bronx image if present
                    if (content.includes('[img:')) {
                      const before = content.split('[img:')[0].trim();
                      const imgMatch = content.match(/\[img:(.*?)\]/);
                      const after = content.split(']')[1].trim();
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

                    // Handle Markdown Tables
                    if (content.includes('|') && content.includes('\n|')) {
                      const lines = content.split('\n');
                      const tableLines = lines.filter(line => line.trim().startsWith('|'));
                      const otherLines = lines.filter(line => !line.trim().startsWith('|'));
                      
                      const headers = tableLines[0].split('|').filter(s => s.trim() !== '').map(s => s.trim());
                      const rows = tableLines.slice(2).map(line => 
                        line.split('|').filter(s => s.trim() !== '').map(s => s.trim())
                      ).filter(row => row.length > 0);

                      return (
                        <div className="message-content">
                          {otherLines.map((line, i) => line.trim() && <p key={i}>{renderTextWithLinks(line)}</p>)}
                          <div className="table-container">
                            <table className="soul-table">
                              <thead>
                                <tr>
                                  {headers.map((h, i) => <th key={i}>{h}</th>)}
                                </tr>
                              </thead>
                              <tbody>
                                {rows.map((row, i) => (
                                  <tr key={i}>
                                    {row.map((cell, j) => (
                                      <td key={j}>
                                        {cell.startsWith('**') ? <strong>{cell.replace(/\*\*/g, '')}</strong> : cell}
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

                    // Then handle PDF link
                    if (content.includes('[/cv-alex-salmeron.pdf]')) {
                      const parts = content.split('[/cv-alex-salmeron.pdf]');
                      const before = parts[0].trim();
                      const after = parts[1].trim();
                      return (
                        <p>
                          {before && renderTextWithLinks(before)}
                          <a href="/cv-alex-salmeron.pdf" target="_blank" rel="noreferrer" className="cv-link" style={{ margin: '0 4px' }}>
                            cv-alex-salmeron.pdf
                          </a>
                          {after && renderTextWithLinks(after)}
                        </p>
                      );
                    }

                    // Default text rendering (with link support)
                    return <p>{renderTextWithLinks(content)}</p>;
                  })()}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="chat-row chat-row--assistant typing">
                <div className="role-indicator">
                  <div className="dot" />
                  <span className="role-name">Soul</span>
                </div>
                <div className="typing-bubbles">
                  <span className="bubble"></span>
                  <span className="bubble"></span>
                  <span className="bubble"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </section>

      <div className="soul-input-bar">
        <form className="hero-prompt-container soul-prompt-container" onSubmit={(e) => { e.preventDefault(); handleSend(input); }}>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={displayedPlaceholder || "Ask anything about Álex"}
            className="hero-prompt-input"
          />
          <div className="hero-prompt-actions">
            <button
              type="submit"
              className="prompt-submit-btn"
              disabled={!input.trim() || isTyping}
              title="Send"
              aria-label="Submit"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
