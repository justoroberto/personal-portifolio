'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const curiosityEmojis = ['☕', '🔬', '💻', '🎮', '✈️', '🎵', '💪', '📚'];
const curiosityColors = [
  'linear-gradient(135deg, #5d4037, #8d6e63)',
  'linear-gradient(135deg, #1b3a2d, #4a9170)',
  'linear-gradient(135deg, #2e6b4f, #66a886)',
  'linear-gradient(135deg, #3e2723, #6d4c41)',
  'linear-gradient(135deg, #1e4d3a, #3a7d5e)',
  'linear-gradient(135deg, #4e342e, #a1887f)',
  'linear-gradient(135deg, #1b3a2d, #81be9d)',
  'linear-gradient(135deg, #6d4c41, #bcaaa4)',
];

export default function CuriositiesPage() {
  const t = useTranslations('curiosities');

  const curiosities = Array.from({ length: 8 }, (_, i) => ({
    title: t(`items.item${i + 1}.title`),
    description: t(`items.item${i + 1}.description`),
    emoji: curiosityEmojis[i],
    gradient: curiosityColors[i],
  }));

  return (
    <div className={styles.page}>
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">{t('title')}</h1>
            <p className="section-subtitle">{t('subtitle')}</p>
          </motion.div>

          <div className={styles.curiositiesGrid}>
            {curiosities.map((item, index) => (
              <motion.div
                key={index}
                className={styles.curiosityCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6, rotate: index % 2 === 0 ? 1 : -1 }}
                id={`curiosity-${index}`}
              >
                <div
                  className={styles.cardIcon}
                  style={{ background: item.gradient }}
                >
                  <span className={styles.emoji}>{item.emoji}</span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <div className={styles.cardNumber}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
