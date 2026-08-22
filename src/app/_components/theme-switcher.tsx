"use client";

import { useTheme } from "../hooks/useTheme";
import styles from "./switch.module.css";

export const ThemeSwitcher = () => {
  const { handleModeSwitch, isClient, mode } = useTheme();

  if (!isClient) return null;

  return (
    <button
      aria-label={`Tema atual: ${mode}. Alternar tema`}
      className={styles.switch}
      onClick={handleModeSwitch}
      type="button"
    >
      Alternar tema
    </button>
  );
};
