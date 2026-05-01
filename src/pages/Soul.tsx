import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import { SOUL_KNOWLEDGE, DEFAULT_RESPONSE_EN, DEFAULT_RESPONSE_ES } from '../data/soul-knowledge';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  const EXAMPLES = [
    "Ask anything about Álex",
    "What is Álex's current role?",
    "Where is Álex based?",
    "What are his main skills?",
    "Who is Bronx?",
    "Where can I find him on social media?",
    "How can I reach out to Álex?",
    "What is the best way to get in touch with him?",
    "What is his design process?",
    "Tell me about his work at Cella",
    "Tell me about his work at DisplayNote",
    "Where did Álex study?",
    "What languages does he speak?",
    "How does he work with developers?",
    "Is Álex available for new projects?",
    "Can I see his resume?"
  ];

  useEffect(() => {
    if (input) {
      setDisplayedPlaceholder("");
      // Reset charIndex so it starts fresh when input is cleared
      setCharIndex(0);
      return;
    }

    const currentFullText = EXAMPLES[placeholderIndex];
    
    if (charIndex < currentFullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedPlaceholder(prev => prev + currentFullText[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setDisplayedPlaceholder("");
        setPlaceholderIndex(prev => (prev + 1) % EXAMPLES.length);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, placeholderIndex, input]);
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
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (text: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    inputRef.current?.focus();

    setTimeout(() => {
      const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const query = messageText.toLowerCase();
      const normalizedQuery = normalize(query);
      
      const isSpanishLanguage = language === 'es';
      
      let bestMatch = { 
        score: 0, 
        response: isSpanishLanguage ? DEFAULT_RESPONSE_ES : DEFAULT_RESPONSE_EN 
      };

      for (const entry of SOUL_KNOWLEDGE) {
        let score = 0;
        for (const keyword of entry.keywords) {
          const normalizedKeyword = normalize(keyword);
          if (normalizedQuery.includes(normalizedKeyword)) {
            // Favor longer, more specific keywords
            // Give extra weight to multi-word keywords
            const multiplier = normalizedKeyword.includes(' ') ? 2 : 1;
            score += normalizedKeyword.length * multiplier;
          }
        }
        
        if (score > bestMatch.score) {
          const rawResponse = isSpanishLanguage ? entry.responseEs : entry.responseEn;
          const finalResponse = Array.isArray(rawResponse) 
            ? rawResponse[Math.floor(Math.random() * rawResponse.length)]
            : rawResponse;
            
          bestMatch = { 
            score, 
            response: finalResponse 
          };
        }
      }

      if (bestMatch.score === 0) {
        // Send email notification via Formspree
        fetch("https://formspree.io/f/xojyregr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "soul-assistant@mefaltaunpixel.es",
            message: `New unknown question for Soul: "${query}"`,
            _subject: "Soul Assistant: New Unanswered Question"
          })
        }).catch(err => console.error("Error sending notification:", err));
        
        const fallbackEn = "I'm sorry, I don't have an answer for that yet. But I've just sent your question to Álex so he can teach me! In the meantime, you can ask about his work at Cella, his dog Bronx, or how to contact him.";
        const fallbackEs = "Lo siento, aún no tengo una respuesta para eso. Pero acabo de enviarle tu pregunta a Álex para que me la enseñe. Mientras tanto, puedes preguntarme sobre su trabajo en Cella, su perro Bronx o cómo contactar con él.";
        
        bestMatch.response = isSpanishLanguage ? fallbackEs : fallbackEn;
      }

      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: bestMatch.response };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Re-focus input after response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Auto-open PDF if requested
      if (bestMatch.response.includes('[/cv-alex-salmeron.pdf]')) {
        window.open('/cv-alex-salmeron.pdf', '_blank');
      }
    }, 1000);
  };

  const { t, language } = useLanguage();

  const greetingText = React.useMemo(() => {
    const hour = new Date().getHours();
    let timeGreeting = "";
    if (language === 'es') {
      if (hour >= 5 && hour < 12) timeGreeting = "Buenos días";
      else if (hour >= 12 && hour < 20) timeGreeting = "Buenas tardes";
      else timeGreeting = "Buenas noches";
      return `${timeGreeting}. <span translate="no">Soy Soul</span>. <br /> ¿Qué quieres saber sobre Álex?`;
    } else {
      if (hour >= 5 && hour < 12) timeGreeting = "Good morning";
      else if (hour >= 12 && hour < 20) timeGreeting = "Good afternoon";
      else timeGreeting = "Good evening";
      return `${timeGreeting}. <span translate="no">I’m Soul</span>. <br /> What do you know about Álex?`;
    }
  }, [language]);

  const SOUL_SUGGESTIONS = [
    { label: t('soul_suggestion_about'), key: "about" },
    { label: t('soul_suggestion_current'), key: "current" },
    { label: t('soul_suggestion_skills'), key: "skills" },
    { label: t('soul_suggestion_located'), key: "located" },
    { label: t('soul_suggestion_bronx'), key: "bronx" },
    { label: t('soul_suggestion_social'), key: "social" }
  ];

  return (
    <main className="soul-page">
      <SEO title={t('seo_soul_title')} description={t('seo_soul_desc')} lang={language} />
      {/* Background with blurred shapes */}
      <section className="soul-hero">
        <div className="soul-content">
          <div className="soul-greeting">
            <h1 className="greeting-text">
              <span style={{ marginRight: '12px', verticalAlign: 'middle', display: 'inline-block' }}>🙃</span>
              <span dangerouslySetInnerHTML={{ __html: greetingText }} />
            </h1>
            
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
                className="chat-row"
              >
                <div className="role-indicator">
                  <div className="dot" />
                  <span className="role-name">{m.role === 'user' ? 'You' : 'Soul'}</span>
                </div>
                <div className="message-text">
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
              <div className="chat-row typing">
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

          <div className="soul-input-area">
            <form className="input-form" onSubmit={(e) => { e.preventDefault(); handleSend(input); }}>
              <div className="input-container">
                <div className={`custom-caret ${input || isFocused ? 'hidden' : ''}`} />
                <input 
                  ref={inputRef}
                  autoFocus
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={displayedPlaceholder}
                  className="soul-input"
                />
                <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
                  {t('soul_send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
