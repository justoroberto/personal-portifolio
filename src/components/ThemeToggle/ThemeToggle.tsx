'use client';

import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle"
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <span className={`${styles.iconWrapper} ${theme === 'dark' ? styles.active : ''}`}>
        <FaMoon className={styles.icon} />
      </span>
      <span className={`${styles.iconWrapper} ${theme === 'light' ? styles.active : ''}`}>
        <FaSun className={styles.icon} />
      </span>
      <span className={`${styles.slider} ${theme === 'light' ? styles.sliderLight : ''}`} />
    </button>
  );
}
