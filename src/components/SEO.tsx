import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  lang: 'es' | 'en';
}

export const SEO: React.FC<SEOProps> = ({ title, description, lang }) => {
  const location = useLocation();
  const baseUrl = "https://mefaltaunpixel.es"; // Using the correct .es domain
  const currentPath = location.pathname;
  
  // Construct URLs for hreflang
  const esUrl = `${baseUrl}${currentPath.replace(/^\/(es|en)/, '/es')}`;
  const enUrl = `${baseUrl}${currentPath.replace(/^\/(es|en)/, '/en')}`;
  const canonicalUrl = `${baseUrl}${currentPath}`;

  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attr, value);
      } else {
        const [tagName, attrName, attrValue] = selector.split(/[\[=\]]/);
        element = document.createElement(tagName);
        element.setAttribute(attrName, attrValue.replace(/"/g, ''));
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
    };

    const updateLink = (rel: string, href: string, hreflang?: string) => {
      let selector = `link[rel="${rel}"]`;
      if (hreflang) selector += `[hreflang="${hreflang}"]`;
      
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('href', href);
      } else {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('href', href);
        if (hreflang) element.setAttribute('hreflang', hreflang);
        document.head.appendChild(element);
      }
    };

    // Meta Description
    updateMeta('meta[name="description"]', 'content', description);

    // Open Graph
    updateMeta('meta[property="og:title"]', 'content', title);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:type"]', 'content', 'website');
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="og:locale"]', 'content', lang === 'es' ? 'es_ES' : 'en_US');

    // Canonical
    updateLink('canonical', canonicalUrl);

    // Hreflang
    updateLink('alternate', esUrl, 'es');
    updateLink('alternate', enUrl, 'en');
    updateLink('alternate', esUrl, 'x-default'); // Default to Spanish as per user preference

    // Language attribute on html tag
    document.documentElement.lang = lang;

  }, [title, description, lang, canonicalUrl, esUrl, enUrl]);

  return null;
};
