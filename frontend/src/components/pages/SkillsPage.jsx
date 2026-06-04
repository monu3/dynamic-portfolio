import React from "react";
import "./SkillsPage.css";
import { Cloud, Layers } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const SkillsPage = () => {
  const { skills, technologyStacks } = usePortfolio();
  const devopsSkills = skills.filter(
    (skill) => skill.category?.toUpperCase() === "DEVOPS",
  );
  const competencySkills = skills.filter(
    (skill) => skill.category?.toUpperCase() === "COMPETENCY",
  );

  const displayedSkills = devopsSkills.length ? devopsSkills : skills;

  return (
    <div className="skills-page">
      <div className="page-header">
        <h2 className="page-title">Technical Skills</h2>
        <div className="title-underline"></div>
      </div>

      <div className="skills-content">
        <div className="devops-section">
          <h3 className="section-subtitle">
            <span className="subtitle-icon">
              <Cloud size={24} />
            </span>
            DevOps & Cloud
          </h3>
          <div className="skills-list">
            {displayedSkills.map((skill, index) => (
              <div
                key={skill.id || `${skill.name}-${index}`}
                className="skill-item"
              >
                <div className="skill-header">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tech-stack-section">
          <h3 className="section-subtitle">
            <span className="subtitle-icon">
              <Layers size={24} />
            </span>
            Technology Stack
          </h3>
          <div className="tech-grid">
            {technologyStacks.map((tech, index) => (
              <div key={`${tech.category}-${index}`} className="tech-card">
                <div className="tech-header">
                  <h4 className="tech-category">{tech.category}</h4>
                </div>
                <div className="tech-skills">
                  {tech.skills.map((skill, idx) => (
                    <span key={`${skill}-${idx}`} className="tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {competencySkills.length > 0 && (
          <div className="expertise-summary">
            <h3 className="section-subtitle">Core Competencies</h3>
            <div className="competencies-grid">
              {competencySkills.map((skill, idx) => (
                <div
                  key={skill.id || `${skill.name}-${idx}`}
                  className="competency-item"
                >
                  <div className="competency-bullet"></div>
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsPage;
