import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-num">05 // REACH OUT</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-grid">
          {/* Contact Details */}
          <motion.div 
            className="contact-info"
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="contact-pitch">
              Let's construct something exceptional.
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
              I am open to new full-time software engineering roles, contract opportunities, and creative collaborations. Drop me a line or connect on social media.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="contact-label">Email</span>
                <a href="mailto:davidivan6900@gmail.com" className="contact-value">
                  davidivan6900@gmail.com
                </a>
              </div>
              <div className="contact-detail-item">
                <span className="contact-label">Location</span>
                <span className="contact-value" style={{ cursor: 'default' }}>
                  Surabaya, Indonesia
                </span>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://github.com/DavidIvanSantoso" target="_blank" rel="noopener noreferrer" className="social-link">
                // GITHUB
              </a>
              <a href="https://www.linkedin.com/in/davidivan6900/" target="_blank" rel="noopener noreferrer" className="social-link">
                // LINKEDIN
              </a>
              <a href="https://www.instagram.com/_davidivan/" target="_blank" rel="noopener noreferrer" className="social-link">
                // INSTAGRAM
              </a>
            </div>
          </motion.div>

          {/* Contact Form Container */}
          <motion.div
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.15 }}
          >
            {isSubmitted ? (
              <motion.div 
                className="form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="form-success-title">Message Sent!</h3>
                <p className="form-success-desc">
                  Thank you for reaching out, David. I'll get back to you within 24 hours.
                </p>
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: '2rem' }}
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="form-label">Name</label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="form-label">Email Address</label>
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder=" "
                    style={{ resize: 'none' }}
                  />
                  <label htmlFor="message" className="form-label">Message</label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
