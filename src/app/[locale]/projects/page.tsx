'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaExternalLinkAlt, FaClock, FaUserTie } from 'react-icons/fa';
import styles from './page.module.css';

const projectIcons = ['🛒', '📊', '🏦', '📡', '🤖', '🚛'];
const projectColors = [
  'rgba(74, 145, 112, 0.15)',
  'rgba(141, 110, 99, 0.15)',
  'rgba(46, 107, 79, 0.15)',
  'rgba(93, 64, 55, 0.15)',
  'rgba(102, 168, 134, 0.15)',
  'rgba(161, 136, 127, 0.15)',
];

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = Array.from({ length: 6 }, (_, i) => ({
    name: t(`project${i + 1}.name`),
    description: t(`project${i + 1}.description`),
    role: t(`project${i + 1}.role`),
    duration: t(`project${i + 1}.duration`),
    techs: t(`project${i + 1}.techs`).split(', '),
    icon: projectIcons[i],
    color: projectColors[i],
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

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`${styles.projectCard} ${expandedProject === index ? styles.expanded : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                id={`project-card-${index}`}
              >
                <div className={styles.projectHeader}>
                  <div className={styles.projectIcon} style={{ background: project.color }}>
                    <span>{project.icon}</span>
                  </div>
                  <div className={styles.projectMeta}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <div className={styles.projectMetaRow}>
                      <span className={styles.metaItem}>
                        <FaUserTie /> {project.role}
                      </span>
                      <span className={styles.metaItem}>
                        <FaClock /> {project.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <p className={styles.projectDescription}>{project.description}</p>

                <div className={styles.techTags}>
                  {project.techs.map((tech, ti) => (
                    <span key={ti} className={styles.techTag}>{tech}</span>
                  ))}
                </div>

                <button className={styles.viewMoreBtn} id={`project-view-${index}`}>
                  {t('viewMore')} <FaExternalLinkAlt />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
