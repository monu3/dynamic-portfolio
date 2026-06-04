import React from "react";
import "./ContactPage.css";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Download,
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const ContactPage = () => {
  const { profile } = usePortfolio();
  const handleDownloadCV = () => {
    if (profile.cvUrl) {
      window.open(profile.cvUrl, "_blank");
    }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h2 className="page-title">Get In Touch</h2>
        <div className="title-underline"></div>
      </div>

      <div className="contact-content">
        <p className="contact-intro">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision. Feel free to reach out!
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">
              <Mail size={32} />
            </div>
            <h3 className="contact-label">Email</h3>
            <a href={`mailto:${profile.email}`} className="contact-value">
              {profile.email}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <Phone size={32} />
            </div>
            <h3 className="contact-label">Phone</h3>
            <a href={`tel:${profile.phone}`} className="contact-value">
              {profile.phone}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <MapPin size={32} />
            </div>
            <h3 className="contact-label">Location</h3>
            <p className="contact-value">{profile.location}</p>
          </div>
        </div>

        <div className="social-section">
          <h3 className="section-subtitle">Connect With Me</h3>
          <div className="social-links">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Github size={28} />
              <span>GitHub</span>
              <ExternalLink size={16} className="external-icon" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin size={28} />
              <span>LinkedIn</span>
              <ExternalLink size={16} className="external-icon" />
            </a>

            <button
              onClick={handleDownloadCV}
              className="social-link cv-download-btn"
            >
              <Download size={28} />
              <span>Download CV</span>
            </button>
          </div>
        </div>

        <div className="availability-badge">
          <div className="status-dot"></div>
          <p>Available for freelance projects and full-time opportunities</p>
        </div>

        <div className="contact-footer">
          <p className="footer-quote">
            "Let's build something amazing together!"
          </p>
          <div className="footer-signature">
            <div className="signature-line"></div>
            <p className="signature-name">{profile.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
