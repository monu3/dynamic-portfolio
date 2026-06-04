import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { deleteSkill, saveSkill, updateSkill } from "../../services/api";

const initialForm = { name: "", level: 70, category: "DEVOPS" };

const SkillsManager = () => {
  const { skills, refetchPortfolioData } = usePortfolio();
  const [formState, setFormState] = useState(initialForm);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [status, setStatus] = useState("");

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const startEdit = (skill) => {
    setSelectedSkill(skill);
    setFormState({
      name: skill.name || "",
      level: skill.level || 70,
      category: skill.category || "DEVOPS",
      id: skill.id,
    });
  };

  const resetForm = () => {
    setSelectedSkill(null);
    setFormState(initialForm);
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Saving skill...");
    try {
      if (selectedSkill) {
        await updateSkill({ ...formState, id: selectedSkill.id });
      } else {
        await saveSkill(formState);
      }
      setStatus("Skill saved successfully.");
      await refetchPortfolioData();
      resetForm();
      setStatus("");
    } catch (error) {
      setStatus("Unable to save skill. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    setStatus("Deleting skill...");
    try {
      await deleteSkill(id);
      setStatus("Skill removed.");
      await refetchPortfolioData();
      setStatus("");
    } catch (error) {
      setStatus("Unable to remove skill. Please try again.");
    }
  };

  return (
    <section className="admin-section">
      <h2>Skills Management</h2>
      <p>
        Add or manage current skill entries that appear on the public portfolio.
      </p>

      <div className="admin-split">
        <div className="admin-panel">
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Skill Name
              <input
                value={formState.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                required
              />
            </label>
            <label>
              Level
              <input
                type="number"
                min="0"
                max="100"
                value={formState.level}
                onChange={(e) =>
                  handleFormChange("level", Number(e.target.value))
                }
              />
            </label>
            <label>
              Category
              <select
                value={formState.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
              >
                <option value="DEVOPS">DEVOPS</option>
                <option value="COMPETENCY">COMPETENCY</option>
              </select>
            </label>
            <div className="admin-form-actions">
              <button type="submit" className="btn-primary">
                {selectedSkill ? "Update Skill" : "Add Skill"}
              </button>
              {selectedSkill && (
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
          <h3>Existing Skills</h3>
          <div className="admin-table">
            {skills.map((skill) => (
              <div key={skill.id} className="admin-list-item">
                <div>
                  <strong>{skill.name}</strong>
                  <p>
                    {skill.category} • {skill.level}%
                  </p>
                </div>
                <div className="admin-item-actions">
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => startEdit(skill)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-link danger"
                    onClick={() => handleDelete(skill.id)}
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

export default SkillsManager;
