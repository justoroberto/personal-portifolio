'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import styles from './page.module.css';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: FaEnvelope, title: t('info.emailTitle'), value: 'justoroberto20@gmail.com', href: 'mailto:justoroberto20@gmail.com' },
    { icon: FaPhone, title: t('info.phoneTitle'), value: '+55 21 98372-6512', href: 'tel:+5521983726512' },
    { icon: FaMapMarkerAlt, title: t('info.locationTitle'), value: t('info.locationValue'), href: '#' },
    { icon: FaLinkedin, title: t('info.linkedinTitle'), value: 'linkedin.com/in/roberto-justo', href: 'https://www.linkedin.com/in/roberto-justo-415a8661/' },
  ];

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

          <div className={styles.contactGrid}>
            {/* Contact Info */}
            <motion.div
              className={styles.infoSection}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.infoCards}>
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={styles.infoCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                      id={`contact-info-${index}`}
                    >
                      <div className={styles.infoIcon}>
                        <Icon />
                      </div>
                      <div>
                        <span className={styles.infoTitle}>{item.title}</span>
                        <span className={styles.infoValue}>{item.value}</span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className={styles.formSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className={styles.formTitle}>{t('formTitle')}</h2>

              {formSubmitted ? (
                <motion.div
                  className={styles.successMessage}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FaCheckCircle className={styles.successIcon} />
                  <span>{t('successMessage')}</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="contact-name">{t('name')}</label>
                      <input
                        id="contact-name"
                        type="text"
                        className={styles.input}
                        placeholder={t('namePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="contact-email">{t('email')}</label>
                      <input
                        id="contact-email"
                        type="email"
                        className={styles.input}
                        placeholder={t('emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="contact-subject">{t('subject')}</label>
                    <input
                      id="contact-subject"
                      type="text"
                      className={styles.input}
                      placeholder={t('subjectPlaceholder')}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="contact-message">{t('message')}</label>
                    <textarea
                      id="contact-message"
                      className={styles.textarea}
                      placeholder={t('messagePlaceholder')}
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} id="contact-submit">
                    <FaPaperPlane /> {t('send')}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
