import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const EXAMPLES_EN = [
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

const EXAMPLES_ES = [
  "Pregunta cualquier cosa sobre Álex",
  "¿Cuál es el rol actual de Álex?",
  "¿Dónde está ubicado Álex?",
  "¿Cuáles son sus principales habilidades?",
  "¿Quién es Bronx?",
  "¿Dónde puedo encontrarle en redes sociales?",
  "¿Cómo puedo contactar con Álex?",
  "¿Cuál es la mejor forma de llegar a él?",
  "¿Cuál es su proceso de diseño?",
  "Cuéntame sobre su trabajo en Cella",
  "Cuéntame sobre su trabajo en DisplayNote",
  "¿Dónde estudió Álex?",
  "¿Qué idiomas habla?",
  "¿Cómo trabaja con los desarrolladores?",
  "¿Está Álex disponible para nuevos proyectos?",
  "¿Puedo ver su currículum?"
];

export const useSoulPlaceholder = (input: string = '') => {
  const { language } = useLanguage();
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const EXAMPLES = language === 'es' ? EXAMPLES_ES : EXAMPLES_EN;

  useEffect(() => {
    // Reset on language change
    setDisplayedPlaceholder("");
    setPlaceholderIndex(0);
    setCharIndex(0);
  }, [language]);

  useEffect(() => {
    if (input) {
      setDisplayedPlaceholder("");
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
  }, [charIndex, placeholderIndex, input, EXAMPLES]);

  if (input) return "";
  return displayedPlaceholder || EXAMPLES[0];
};
