import React, { createContext, useContext, useState } from 'react';

interface SoulOverlayContextType {
  isOpen: boolean;
  openOverlay: (query?: string) => void;
  closeOverlay: () => void;
  initialQuery: string;
  overlayId: number;
}

const SoulOverlayContext = createContext<SoulOverlayContextType | undefined>(undefined);

export const SoulOverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const [overlayId, setOverlayId] = useState(0);

  const openOverlay = (query = '') => {
    setInitialQuery(query);
    setOverlayId((prev) => prev + 1);
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setIsOpen(false);
    setInitialQuery('');
  };

  return (
    <SoulOverlayContext.Provider value={{ isOpen, openOverlay, closeOverlay, initialQuery, overlayId }}>
      {children}
    </SoulOverlayContext.Provider>
  );
};

export const useSoulOverlay = () => {
  const ctx = useContext(SoulOverlayContext);
  if (!ctx) throw new Error('useSoulOverlay must be used inside SoulOverlayProvider');
  return ctx;
};
