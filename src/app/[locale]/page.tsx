'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaRocket, FaBriefcase, FaCode, FaUsers, FaArrowRight } from 'react-icons/fa';
import styles from './page.module.css';

const storyGradients = [
  'linear-gradient(135deg, #1b3a2d, #4a9170)',
  'linear-gradient(135deg, #2c3e50, #7f8c8d)',
  'linear-gradient(135deg, #2e6b4f, #81be9d)',
  'linear-gradient(135deg, #5d4037, #a1887f)',
  'linear-gradient(135deg, #4a5568, #a0aec0)',
  'linear-gradient(135deg, #1e4d3a, #66a886)',
  'linear-gradient(135deg, #374151, #9ca3af)',
  'linear-gradient(135deg, #3a7d5e, #a8d5be)',
  'linear-gradient(135deg, #1f2937, #6b7280)',
  'linear-gradient(135deg, #2d3748, #718096)',
];

const storyEmojis = ['🎓', '💻', '🏢', '📊', '🔧', '☁️', '🌍', '👨‍💻', '🚀', '🤖'];

const highlights = [
  { icon: FaBriefcase, value: '15+' },
  { icon: FaRocket, value: '20+' },
  { icon: FaCode, value: '5+' },
  { icon: FaUsers, value: '15+' },
];

export default function HomePage() {
  const t = useTranslations('home');
  const [activeStory, setActiveStory] = useState<number | null>(null);

  const stories = Array.from({ length: 10 }, (_, i) => ({
    title: t(`stories.story${i + 1}.title`),
    year: t(`stories.story${i + 1}.year`),
    description: t(`stories.story${i + 1}.description`),
    gradient: storyGradients[i],
    emoji: storyEmojis[i],
  }));

  const highlightLabels = [
    t('summaryHighlight1'),
    t('summaryHighlight2'),
    t('summaryHighlight3'),
    t('summaryHighlight4'),
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
          <div className={styles.gridOverlay} />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={styles.heroText}
          >
            <span className={styles.heroGreeting}>{t('heroTitle')}</span>
            <h1 className={styles.heroName}>{t('heroName')}</h1>
            <p className={styles.heroSubtitle}>{t('heroSubtitle')}</p>
            <p className={styles.heroDescription}>{t('heroDescription')}</p>

            <div className={styles.heroCta}>
              <Link href="/projects" className="btn btn-primary">
                {t('viewProjects')} <FaArrowRight />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                {t('contactMe')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className={styles.heroVisual}
          >
            <div className={styles.avatarContainer}>
              <div className={styles.avatarRing} />
              <div className={styles.avatar}>
                <Image
                  src="/images/profile.jpg"
                  alt="Roberto Justo"
                  width={200}
                  height={200}
                  className={styles.avatarImage}
                  priority
                />
              </div>
            </div>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              Available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stories Section */}
      <section className={styles.storiesSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('storiesTitle')}</h2>
            <p className="section-subtitle">{t('storiesSubtitle')}</p>
          </motion.div>

          <div className={styles.storiesGrid}>
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <button
                  className={`${styles.storyCard} ${activeStory === index ? styles.storyActive : ''}`}
                  onClick={() => setActiveStory(activeStory === index ? null : index)}
                  style={{ '--story-gradient': story.gradient } as React.CSSProperties}
                  id={`story-${index}`}
                >
                  <div className={styles.storyRing}>
                    <div className={styles.storyAvatar}>
                      <span className={styles.storyEmoji}>{story.emoji}</span>
                    </div>
                  </div>
                  <span className={styles.storyYear}>{story.year}</span>
                  <span className={styles.storyTitle}>{story.title}</span>

                  {activeStory === index && (
                    <motion.div
                      className={styles.storyExpanded}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className={styles.storyDescription}>{story.description}</p>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className={styles.summarySection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('summaryTitle')}</h2>
          </motion.div>

          <motion.p
            className={styles.summaryText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('summaryText')}
          </motion.p>

          <div className={styles.highlightsGrid}>
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.highlightCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.highlightIcon}>
                    <Icon />
                  </div>
                  <span className={styles.highlightValue}>{item.value}</span>
                  <span className={styles.highlightLabel}>{highlightLabels[index]}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
