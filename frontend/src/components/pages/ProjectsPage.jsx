import React from "react";
import "./ProjectsPage.css";
import { ExternalLink, Github, Package } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const ProjectsPage = () => {
  const { projects } = usePortfolio();

  return (
    <div className="projects-page">
      <div className="page-header">
        <h2 className="page-title">Projects</h2>
        <div className="title-underline"></div>
      </div>

      <div className="projects-content">
        <p className="projects-intro">
          Here are some of my recent projects that showcase my expertise in
          full-stack development and DevOps practices:
        </p>

        <div className="projects-list">
          {projects.map((project, index) => {
            const links = [];
            if (project.githubLink) {
              links.push({
                type: "github",
                url: project.githubLink,
                icon: <Github size={20} />,
              });
            }
            if (project.liveLink) {
              links.push({
                type: "live",
                url: project.liveLink,
                icon: <ExternalLink size={20} />,
              });
            }
            if (project.dockerLink) {
              links.push({
                type: "docker",
                url: project.dockerLink,
                icon: <Package size={20} />,
              });
            }

            return (
              <div
                key={project.id || `${project.title}-${index}`}
                className="project-card"
              >
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                  </div>
                  <div className="project-links">
                    {links.map((link, idx) => (
                      <a
                        key={`${link.type}-${idx}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`View ${project.title} on ${link.type}`}
                      >
                        {link.icon}
                        <ExternalLink size={14} className="external-icon" />
                      </a>
                    ))}
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {(project.technologies || []).map((tech, idx) => (
                    <span key={`${tech}-${idx}`} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="projects-footer">
          <p className="footer-text">
            Visit my{" "}
            <a
              href="https://github.com/monu3"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              GitHub profile
            </a>{" "}
            to explore more projects and contributions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
