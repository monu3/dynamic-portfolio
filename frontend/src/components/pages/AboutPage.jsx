import React from "react";
import "./AboutPage.css";
import { Server, Cloud, Code2, Cpu } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const AboutPage = () => {
  const { profile, experience } = usePortfolio();
  return (
    <div className="about-page">
      <div className="page-header">
        <h2 className="page-title">About Me</h2>
        <div className="title-underline"></div>
      </div>

      <div className="about-content">
        <div className="about-intro">
          <p className="intro-text">{profile.bio}</p>
        </div>

        <div className="about-focus">
          <h3 className="section-subtitle">DevOps Expertise</h3>
          <div className="focus-grid">
            <div className="focus-card">
              <div className="focus-icon">
                <Server size={32} />
              </div>
              <h4>Container Orchestration</h4>
              <p>
                Expert in Docker and Kubernetes for scalable application
                deployment and management.
              </p>
            </div>

            <div className="focus-card">
              <div className="focus-icon">
                <Cloud size={32} />
              </div>
              <h4>CI/CD Pipelines</h4>
              <p>
                Proficient in Jenkins and ArgoCD for automated continuous
                integration and deployment.
              </p>
            </div>

            <div className="focus-card">
              <div className="focus-icon">
                <Code2 size={32} />
              </div>
              <h4>Cloud Solutions</h4>
              <p>
                Experience with AWS services and cloud-native architecture
                patterns.
              </p>
            </div>

            <div className="focus-card">
              <div className="focus-icon">
                <Cpu size={32} />
              </div>
              <h4>Full Stack Development</h4>
              <p>
                Building responsive applications with React, Spring Boot, and
                Java.
              </p>
            </div>
          </div>
        </div>

        <div className="about-journey">
          <h3 className="section-subtitle">My Journey</h3>
          <div className="journey-timeline">
            {experience.map((item) => (
              <div
                className="timeline-item"
                key={item.id || `${item.role}-${item.duration}`}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{item.role}</h4>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-date">{item.duration}</p>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-philosophy">
          <p className="philosophy-text">{profile.philosophy}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
