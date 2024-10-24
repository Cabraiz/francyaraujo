"use client";

import { useTheme } from '../hooks/useTheme';
import styles from './switch.module.css';

export const ThemeSwitcher = () => {
  const theme = useTheme(); // Primeiro, pegamos o objeto completo retornado pelo hook

  // Verificação se o hook retornou valores válidos
  if (!theme?.isClient) return null;

  const { handleModeSwitch } = theme;

  return (
    <button className={styles.switch} onClick={handleModeSwitch}>
      Switch Theme
    </button>
  );
};
