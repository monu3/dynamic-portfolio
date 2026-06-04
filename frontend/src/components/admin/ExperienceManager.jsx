import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  deleteExperience,
  saveExperience,
  updateExperience,
} from "../../services/api";

const initialForm = {
  company: "",
  role: "",
  duration: "",
  description: "",
};

const ExperienceManager = () => {
  const { experience, refetchPortfolioData } = usePortfolio();
  const [formState, setFormState] = useState(initialForm);
  const [selectedItem, setSelectedItem] = useState(null);
  const [status, setStatus] = useState("");

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const startEdit = (item) => {
    setSelectedItem(item);
    setFormState({
      company: item.company || "",
      role: item.role || "",
      duration: item.duration || "",
      description: item.description || "",
      id: item.id,
    });
  };

  const resetForm = () => {
    setSelectedItem(null);
    setFormState(initialForm);
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Saving experience...");
    try {
      if (selectedItem) {
        await updateExperience({ ...formState, id: selectedItem.id });
      } else {
        await saveExperience(formState);
      }
      setStatus("Experience saved successfully.");
      await refetchPortfolioData();
      resetForm();
      setStatus("");
    } catch (error) {
      setStatus("Unable to save experience. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    setStatus("Deleting entry...");
    try {
      await deleteExperience(id);
      setStatus("Entry removed.");
      await refetchPortfolioData();
      setStatus("");
    } catch (error) {
      setStatus("Unable to remove experience. Please try again.");
    }
  };

  return (
    <section className="admin-section">
      <h2>Experience Management</h2>
      <p>Update the timeline and career entries shown in the About page.</p>

      <div className="admin-split">
        <div className="admin-panel">
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Company
              <input
                value={formState.company}
                onChange={(e) => handleFormChange("company", e.target.value)}
                required
              />
            </label>
            <label>
              Role
              <input
                value={formState.role}
                onChange={(e) => handleFormChange("role", e.target.value)}
                required
              />
            </label>
            <label>
              Duration
              <input
                value={formState.duration}
                onChange={(e) => handleFormChange("duration", e.target.value)}
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
            <div className="admin-form-actions">
              <button type="submit" className="btn-primary">
                {selectedItem ? "Update Entry" : "Add Entry"}
              </button>
              {selectedItem && (
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
          <h3>Current Experience</h3>
          <div className="admin-table">
            {experience.map((item) => (
              <div key={item.id} className="admin-list-item">
                <div>
                  <strong>{item.role}</strong>
                  <p>
                    {item.company} • {item.duration}
                  </p>
                </div>
                <div className="admin-item-actions">
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-link danger"
                    onClick={() => handleDelete(item.id)}
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

export default ExperienceManager;
