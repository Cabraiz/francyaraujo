"use client";

import { useEffect, useState } from 'react';

export type ColorSchemePreference = 'system' | 'dark' | 'light';

const STORAGE_KEY = 'nextjs-blog-starter-theme';
const DARK = 'dark';
const LIGHT = 'light';
const modes: ColorSchemePreference[] = ['system', 'dark', 'light'];

const setThemeOnClient = (mode: ColorSchemePreference) => {
  const modifyTransition = () => {
    const css = document.createElement('style');
    css.textContent = '*,*:after,*:before{transition:none !important;}';
    document.head.appendChild(css);
    return () => {
      getComputedStyle(document.body);
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  const restoreTransitions = modifyTransition();
  const classList = document.documentElement.classList;

  if (mode === DARK) {
    classList.add(DARK);
    classList.remove(LIGHT);
  } else {
    classList.add(LIGHT);
    classList.remove(DARK);
  }

  document.documentElement.setAttribute('data-mode', mode);
  restoreTransitions();
};

export const useTheme = () => {
  // Estado inicial como null até que o tema seja carregado
  const [mode, setMode] = useState<ColorSchemePreference | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      const storedMode = localStorage.getItem(STORAGE_KEY) as ColorSchemePreference;
      if (storedMode) {
        setMode(storedMode);
        setThemeOnClient(storedMode);
      } else {
        // Se não houver um tema armazenado, usar 'system' como padrão
        setMode('system');
        setThemeOnClient('system');
      }
    }
  }, []);

  useEffect(() => {
    if (isClient && mode !== null) {
      localStorage.setItem(STORAGE_KEY, mode);
      setThemeOnClient(mode);
    }
  }, [mode, isClient]);

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode!); // O '!' garante que mode não seja nulo
    setMode(modes[(index + 1) % modes.length]);
  };

  // Fallback enquanto o modo ainda não foi carregado
  if (mode === null) {
    return null; // Ou pode retornar algum componente de carregamento se preferir
  }

  return { mode, handleModeSwitch, isClient };
};
