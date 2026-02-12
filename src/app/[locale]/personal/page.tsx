'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaLanguage, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import styles from './page.module.css';

const timelineImages = [
  '🎓', '💻', '🚀', '📈', '🎉', '⭐', '👨‍💼', '🔥'
];

export default function PersonalPage() {
  const t = useTranslations('personal');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const infoItems = [
    { icon: FaMapMarkerAlt, label: t('info.location'), value: t('info.locationValue') },
    { icon: FaGraduationCap, label: t('info.education'), value: t('info.educationValue') },
    { icon: FaBriefcase, label: t('info.experience'), value: t('info.experienceValue') },
    { icon: FaLanguage, label: t('info.languages'), value: t('info.languagesValue') },
  ];

  const timelineEvents = Array.from({ length: 8 }, (_, i) => ({
    date: t(`timeline.event${i + 1}.date`),
    title: t(`timeline.event${i + 1}.title`),
    description: t(`timeline.event${i + 1}.description`),
    emoji: timelineImages[i],
  }));

  const handlePrev = () => {
    if (selectedEvent !== null && selectedEvent > 0) {
      setSelectedEvent(selectedEvent - 1);
      setCarouselIndex(0);
    }
  };

  const handleNext = () => {
    if (selectedEvent !== null && selectedEvent < timelineEvents.length - 1) {
      setSelectedEvent(selectedEvent + 1);
      setCarouselIndex(0);
    }
  };

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

          {/* Bio */}
          <motion.div
            className={styles.bioCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.bioAvatar}>
              <span>RJ</span>
            </div>
            <div className={styles.bioContent}>
              <p className={styles.bioText}>{t('bio')}</p>
              <div className={styles.infoGrid}>
                {infoItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className={styles.infoItem}>
                      <Icon className={styles.infoIcon} />
                      <div>
                        <span className={styles.infoLabel}>{item.label}</span>
                        <span className={styles.infoValue}>{item.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.timelineSection}
          >
            <h2 className="section-title">{t('timelineTitle')}</h2>
            <p className="section-subtitle">{t('timelineSubtitle')}</p>

            <div className={styles.timeline}>
              <div className={styles.timelineTrack}>
                <div className={styles.timelineLine} />

                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className={`${styles.timelineNode} ${selectedEvent === index ? styles.nodeActive : ''}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <button
                      className={styles.nodeButton}
                      onClick={() => {
                        setSelectedEvent(selectedEvent === index ? null : index);
                        setCarouselIndex(0);
                      }}
                      id={`timeline-event-${index}`}
                    >
                      <div className={styles.nodeCircle}>
                        <span className={styles.nodeEmoji}>{event.emoji}</span>
                      </div>
                      <span className={styles.nodeDate}>{event.date}</span>
                      <span className={styles.nodeTitle}>{event.title}</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline Detail Modal/Carousel */}
            <AnimatePresence>
              {selectedEvent !== null && (
                <motion.div
                  className={styles.timelineDetail}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className={styles.detailClose}
                    onClick={() => setSelectedEvent(null)}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>

                  <div className={styles.carouselContainer}>
                    <button
                      className={styles.carouselBtn}
                      onClick={handlePrev}
                      disabled={selectedEvent === 0}
                      aria-label="Previous"
                    >
                      <FaChevronLeft />
                    </button>

                    <div className={styles.carouselContent}>
                      <div className={styles.carouselImageArea}>
                        <span className={styles.carouselEmoji}>{timelineEvents[selectedEvent].emoji}</span>
                      </div>
                      <div className={styles.carouselInfo}>
                        <span className={styles.carouselDate}>{timelineEvents[selectedEvent].date}</span>
                        <h3 className={styles.carouselTitle}>{timelineEvents[selectedEvent].title}</h3>
                        <p className={styles.carouselDescription}>{timelineEvents[selectedEvent].description}</p>
                      </div>
                    </div>

                    <button
                      className={styles.carouselBtn}
                      onClick={handleNext}
                      disabled={selectedEvent === timelineEvents.length - 1}
                      aria-label="Next"
                    >
                      <FaChevronRight />
                    </button>
                  </div>

                  <div className={styles.carouselDots}>
                    {timelineEvents.map((_, i) => (
                      <button
                        key={i}
                        className={`${styles.dot} ${i === selectedEvent ? styles.dotActive : ''}`}
                        onClick={() => { setSelectedEvent(i); setCarouselIndex(0); }}
                        aria-label={`Event ${i + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
