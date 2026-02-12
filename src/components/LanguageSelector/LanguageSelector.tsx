'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Locale } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import styles from './LanguageSelector.module.css';

const localeConfig: Record<string, { flag: string; label: string }> = {
  en: { flag: '🇺🇸', label: 'English' },
  'pt-BR': { flag: '🇧🇷', label: 'Português' },
  es: { flag: '🇪🇸', label: 'Español' },
  fr: { flag: '🇫🇷', label: 'Français' },
  it: { flag: '🇮🇹', label: 'Italiano' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
  ru: { flag: '🇷🇺', label: 'Русский' },
};

interface LanguageSelectorProps {
  variant?: 'header' | 'footer';
}

export default function LanguageSelector({ variant = 'header' }: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('header');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = localeConfig[locale] || localeConfig['pt-BR'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.selector} ${styles[variant]}`}
      ref={dropdownRef}
    >
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('selectLanguage')}
        id="language-selector"
      >
        <span className={styles.flag}>{currentLocale.flag}</span>
        <span className={styles.label}>{currentLocale.label}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {Object.entries(localeConfig).map(([key, config]) => (
            <button
              key={key}
              className={`${styles.option} ${key === locale ? styles.active : ''}`}
              onClick={() => handleLocaleChange(key as Locale)}
              id={`language-option-${key}`}
            >
              <span className={styles.optionFlag}>{config.flag}</span>
              <span className={styles.optionLabel}>{config.label}</span>
              {key === locale && (
                <svg className={styles.check} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
