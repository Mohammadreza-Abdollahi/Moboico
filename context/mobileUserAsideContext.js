"use client";

import { createContext, useContext, useState } from "react";

const MobileAsideContext = createContext();

export const MobileAsideProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  return (
    <MobileAsideContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
      {children}
    </MobileAsideContext.Provider>
  );
};

export const useMobileAside = () => useContext(MobileAsideContext);