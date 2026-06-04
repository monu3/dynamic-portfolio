import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  deleteTechnologyStack,
  saveTechnologyStack,
  updateTechnologyStack,
} from "../../services/api";

const initialForm = {
  name: "",
  category: "Frontend",
  level: "Intermediate",
  iconUrl: "",
};

const TechStackManager = () => {
  const { technologyStackItems, refetchPortfolioData } = usePortfolio();
  const [formState, setFormState] = useState(initialForm);
  const [selectedItem, setSelectedItem] = useState(null);
  const [status, setStatus] = useState("");

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const startEdit = (item) => {
    setSelectedItem(item);
    setFormState({
      name: item.name || "",
      category: item.category || "Frontend",
      level: item.level || "Intermediate",
      iconUrl: item.iconUrl || "",
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
    setStatus("Saving technology entry...");
    try {
      if (selectedItem) {
        await updateTechnologyStack({ ...formState, id: selectedItem.id });
      } else {
        await saveTechnologyStack(formState);
      }
      setStatus("Entry saved successfully.");
      await refetchPortfolioData();
      resetForm();
      setStatus("");
    } catch (error) {
      setStatus("Unable to save entry. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    setStatus("Deleting entry...");
    try {
      await deleteTechnologyStack(id);
      setStatus("Entry removed.");
      await refetchPortfolioData();
      setStatus("");
    } catch (error) {
      setStatus("Unable to remove entry. Please try again.");
    }
  };

  return (
    <section className="admin-section">
      <h2>Technology Stack</h2>
      <p>
        Manage the technology items and categories shown in the Skills section.
      </p>

      <div className="admin-split">
        <div className="admin-panel">
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                value={formState.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                required
              />
            </label>
            <label>
              Category
              <input
                value={formState.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
              />
            </label>
            <label>
              Level
              <input
                value={formState.level}
                onChange={(e) => handleFormChange("level", e.target.value)}
              />
            </label>
            <label>
              Icon URL
              <input
                value={formState.iconUrl}
                onChange={(e) => handleFormChange("iconUrl", e.target.value)}
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
          <h3>Current Technology Items</h3>
          <div className="admin-table">
            {technologyStackItems.map((item) => (
              <div key={item.id || item.name} className="admin-list-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    {item.category} • {item.level}
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
                  {item.id && (
                    <button
                      type="button"
                      className="btn-link danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackManager;
