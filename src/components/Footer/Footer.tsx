'use client';

import { useTranslations } from 'next-intl';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="main-footer">
      <div className={styles.topBorder} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.brand}>
              <span className={styles.logoIcon}>RJ</span>
              <span className={styles.brandText}>Roberto Justo</span>
            </div>
            <p className={styles.madeBy}>
              {t('madeBy')} <span className={styles.highlight}>Roberto Justo</span>{' '}
              <FaHeart className={styles.heart} />
            </p>
          </div>

          <div className={styles.center}>
            <div className={styles.social}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
                id="footer-linkedin"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
                id="footer-github"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className={styles.right}>
            <LanguageSelector variant="footer" />
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Roberto Justo. {t('allRights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
