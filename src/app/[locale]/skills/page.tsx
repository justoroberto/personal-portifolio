'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaTools, FaDatabase, FaCloud, FaCubes, FaUsers, FaComments, FaLightbulb, FaHandshake, FaSyncAlt, FaRobot } from 'react-icons/fa';
import styles from './page.module.css';

const technicalSkills = [
  {
    key: 'frontend',
    icon: FaReact,
    techs: ['Salesforce LWC', 'JavaScript', 'CSS', 'HTML', 'React', 'Next.js', 'CloudCraze'],
  },
  {
    key: 'backend',
    icon: FaNodeJs,
    techs: ['Apex', 'Node.js', 'REST API', 'Groovy'],
  },
  {
    key: 'mobile',
    icon: FaTools,
    techs: ['React', 'TypeScript', 'Chart.js', 'Git', 'VS Code'],
  },
  {
    key: 'database',
    icon: FaDatabase,
    techs: ['SOQL', 'SQL', 'PostgreSQL', 'MySQL', 'Data Modeling'],
  },
  {
    key: 'cloud',
    icon: FaCloud,
    techs: ['Salesforce DX', 'Git', 'Scrum', 'Kanban'],
  },
  {
    key: 'architecture',
    icon: FaCubes,
    techs: ['Component Architecture', 'REST API', 'Design Patterns', 'Scalability', 'Code Review'],
  },
];

const personalSkillsData = [
  { key: 'leadership', icon: FaUsers },
  { key: 'communication', icon: FaComments },
  { key: 'problemSolving', icon: FaLightbulb },
  { key: 'teamwork', icon: FaHandshake },
  { key: 'adaptability', icon: FaSyncAlt },
  { key: 'creativity', icon: FaRobot },
];

export default function SkillsPage() {
  const t = useTranslations('skills');

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

          {/* Technical Skills */}
          <motion.h2
            className={styles.categoryTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {t('technicalTitle')}
          </motion.h2>

          <div className={styles.technicalGrid}>
            {technicalSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.key}
                  className={styles.skillCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  id={`skill-${skill.key}`}
                >
                  <div className={styles.skillHeader}>
                    <div className={styles.skillIcon}>
                      <Icon />
                    </div>
                    <h3 className={styles.skillName}>{t(`technical.${skill.key}`)}</h3>
                  </div>

                  <div className={styles.techList}>
                    {skill.techs.map((tech, ti) => (
                      <span key={ti} className={styles.techPill}>{tech}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Personal Skills */}
          <motion.h2
            className={styles.categoryTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: 'var(--space-4xl)' }}
          >
            {t('personalTitle')}
          </motion.h2>

          <div className={styles.personalGrid}>
            {personalSkillsData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.key}
                  className={styles.personalCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  id={`personal-skill-${skill.key}`}
                >
                  <div className={styles.personalIcon}>
                    <Icon />
                  </div>
                  <h3 className={styles.personalName}>{t(`personalSkills.${skill.key}`)}</h3>
                  <p className={styles.personalDesc}>{t(`personalSkills.${skill.key}Desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
