import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { deleteProject, saveProject, updateProject } from "../../services/api";

const initialForm = {
  title: "",
  subtitle: "",
  description: "",
  technologies: "",
  githubLink: "",
  liveLink: "",
  dockerLink: "",
};

const ProjectsManager = () => {
  const { projects, refetchPortfolioData } = usePortfolio();
  const [formState, setFormState] = useState(initialForm);
  const [selectedProject, setSelectedProject] = useState(null);
  const [status, setStatus] = useState("");

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const startEdit = (project) => {
    setSelectedProject(project);
    setFormState({
      title: project.title || "",
      subtitle: project.subtitle || "",
      description: project.description || "",
      technologies: (project.technologies || []).join(", "),
      githubLink: project.githubLink || "",
      liveLink: project.liveLink || "",
      dockerLink: project.dockerLink || "",
      id: project.id,
    });
  };

  const resetForm = () => {
    setSelectedProject(null);
    setFormState(initialForm);
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Saving project...");
    const payload = {
      title: formState.title,
      subtitle: formState.subtitle,
      description: formState.description,
      technologies: formState.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      githubLink: formState.githubLink,
      liveLink: formState.liveLink,
      dockerLink: formState.dockerLink,
    };

    try {
      if (selectedProject) {
        await updateProject({ ...payload, id: selectedProject.id });
      } else {
        await saveProject(payload);
      }
      setStatus("Project saved successfully.");
      await refetchPortfolioData();
      resetForm();
      setStatus("");
    } catch (error) {
      setStatus("Unable to save project. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    setStatus("Deleting project...");
    try {
      await deleteProject(id);
      setStatus("Project removed.");
      await refetchPortfolioData();
      setStatus("");
    } catch (error) {
      setStatus("Unable to remove project. Please try again.");
    }
  };

  return (
    <section className="admin-section">
      <h2>Projects Management</h2>
      <p>Create and update project cards displayed in your portfolio.</p>

      <div className="admin-split">
        <div className="admin-panel">
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Title
              <input
                value={formState.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                required
              />
            </label>
            <label>
              Subtitle
              <input
                value={formState.subtitle}
                onChange={(e) => handleFormChange("subtitle", e.target.value)}
              />
            </label>
            <label>
              Description
              <textarea
                value={formState.description}
                rows={4}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
              />
            </label>
            <label>
              Technologies (comma separated)
              <input
                value={formState.technologies}
                onChange={(e) =>
                  handleFormChange("technologies", e.target.value)
                }
              />
            </label>
            <label>
              GitHub Link
              <input
                value={formState.githubLink}
                onChange={(e) => handleFormChange("githubLink", e.target.value)}
              />
            </label>
            <label>
              Live Link
              <input
                value={formState.liveLink}
                onChange={(e) => handleFormChange("liveLink", e.target.value)}
              />
            </label>
            <label>
              Docker Link
              <input
                value={formState.dockerLink}
                onChange={(e) => handleFormChange("dockerLink", e.target.value)}
              />
            </label>
            <div className="admin-form-actions">
              <button type="submit" className="btn-primary">
                {selectedProject ? "Update Project" : "Add Project"}
              </button>
              {selectedProject && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          {status && <p className="admin-status">{status}</p>}
        </div>

        <div className="admin-list">
          <h3>Existing Projects</h3>
          <div className="admin-table">
            {projects.map((project) => (
              <div key={project.id} className="admin-list-item">
                <div>
                  <strong>{project.title}</strong>
                  <p>{project.subtitle}</p>
                </div>
                <div className="admin-item-actions">
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => startEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-link danger"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsManager;
