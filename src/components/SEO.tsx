import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const location = useLocation();
  const baseUrl = "https://mefaltaunpixel.es";
  const canonicalUrl = `${baseUrl}${location.pathname}`;

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

    const updateLink = (rel: string, href: string) => {
      let selector = `link[rel="${rel}"]`;
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('href', href);
      } else {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('href', href);
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
    updateMeta('meta[property="og:locale"]', 'content', 'en_US');

    // Canonical
    updateLink('canonical', canonicalUrl);

    // Language attribute on html tag
    document.documentElement.lang = 'en';

  }, [title, description, canonicalUrl]);

  useEffect(() => {
    // Schema.org Person JSON-LD
    const schemaId = 'schema-person';
    let schemaScript = document.getElementById(schemaId);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.id = schemaId;
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Álex Salmerón",
      "alternateName": "Alex Salmeron",
      "url": "https://mefaltaunpixel.es",
      "jobTitle": "Senior Product Designer",
      "description": description,
      "image": "https://mefaltaunpixel.es/og-image.png",
      "email": "pixel@mefaltaunpixel.es",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Murcia",
        "addressRegion": "Murcia",
        "addressCountry": "ES"
      },
      "knowsAbout": [
        "Product Design",
        "Design Systems",
        "DesignOps",
        "Visual Design",
        "UX Research",
        "Figma",
        "UI Design",
        "Prototyping",
        "Component Libraries",
        "Design Tokens"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Senior Product Designer",
        "occupationLocation": {
          "@type": "City",
          "name": "Murcia"
        },
        "skills": "Product Design, Design Systems, DesignOps, Figma, Visual Design, UX Research"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Cella Medical Solutions"
      },
      "sameAs": [
        "https://www.linkedin.com/in/alexsalmeron/",
        "https://dribbble.com/mefaltaunpixel",
        "https://www.figma.com/@mefaltaunpixel",
        "https://x.com/mefaltaunpixel"
      ]
    });
  }, [description]);

  return null;
};
