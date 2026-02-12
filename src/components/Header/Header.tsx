'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import styles from './Header.module.css';

const navItems = [
  { key: 'home', path: '/' as const },
  { key: 'personal', path: '/personal' as const },
  { key: 'projects', path: '/projects' as const },
  { key: 'skills', path: '/skills' as const },
  { key: 'contact', path: '/contact' as const },
  { key: 'curiosities', path: '/curiosities' as const },
];

export default function Header() {
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="main-header">
        <div className={styles.container}>
          <Link href="/" className={styles.logo} id="logo-link">
            <span className={styles.logoIcon}>RJ</span>
            <span className={styles.logoText}>Roberto Justo</span>
          </Link>

          <nav className={styles.desktopNav} id="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                id={`nav-${item.key}`}
              >
                {t(item.key)}
                {pathname === item.path && <span className={styles.activeBar} />}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <LanguageSelector variant="header" />

            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? tHeader('closeMenu') : tHeader('menu')}
              id="hamburger-menu"
            >
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.line1Open : ''}`} />
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.line2Open : ''}`} />
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.line3Open : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.overlayOpen : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <nav className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.menuOpen : ''}`} id="mobile-nav">
        <div className={styles.mobileMenuContent}>
          {navItems.map((item, index) => (
            <Link
              key={item.key}
              href={item.path}
              className={`${styles.mobileLink} ${pathname === item.path ? styles.mobileLinkActive : ''}`}
              style={{ animationDelay: `${index * 60}ms` }}
              id={`mobile-nav-${item.key}`}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className={styles.mobileLangSelector}>
            <LanguageSelector variant="header" />
          </div>
        </div>
      </nav>
    </>
  );
}
