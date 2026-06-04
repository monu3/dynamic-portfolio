import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { saveProfile } from "../../services/api";

const ProfileForm = () => {
  const { profile, refetchPortfolioData } = usePortfolio();
  const [formState, setFormState] = useState({ ...profile });
  const [status, setStatus] = useState("");

  const updateField = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Saving...");
    try {
      await saveProfile(formState);
      setStatus("Profile saved successfully.");
      await refetchPortfolioData();
      setStatus("");
    } catch (error) {
      setStatus("Unable to save profile. Please try again.");
    }
  };

  return (
    <section className="admin-section">
      <h2>Profile Settings</h2>
      <p>Update the public portfolio profile and contact details.</p>
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={formState.name || ""}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </label>
        <label>
          Title
          <input
            value={formState.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </label>
        <label>
          Subtitle
          <input
            value={formState.subtitle || ""}
            onChange={(e) => updateField("subtitle", e.target.value)}
          />
        </label>
        <label>
          Tagline
          <input
            value={formState.tagline || ""}
            onChange={(e) => updateField("tagline", e.target.value)}
          />
        </label>
        <label>
          Bio
          <textarea
            value={formState.bio || ""}
            onChange={(e) => updateField("bio", e.target.value)}
            rows={4}
          />
        </label>
        <label>
          Philosophy
          <textarea
            value={formState.philosophy || ""}
            onChange={(e) => updateField("philosophy", e.target.value)}
            rows={4}
          />
        </label>
        <label>
          Email
          <input
            value={formState.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </label>
        <label>
          Phone
          <input
            value={formState.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </label>
        <label>
          Location
          <input
            value={formState.location || ""}
            onChange={(e) => updateField("location", e.target.value)}
          />
        </label>
        <label>
          GitHub URL
          <input
            value={formState.github || ""}
            onChange={(e) => updateField("github", e.target.value)}
          />
        </label>
        <label>
          LinkedIn URL
          <input
            value={formState.linkedin || ""}
            onChange={(e) => updateField("linkedin", e.target.value)}
          />
        </label>
        <label>
          Profile Image URL
          <input
            value={formState.imageUrl || ""}
            onChange={(e) => updateField("imageUrl", e.target.value)}
          />
        </label>
        <label>
          CV URL
          <input
            value={formState.cvUrl || ""}
            onChange={(e) => updateField("cvUrl", e.target.value)}
          />
        </label>
        <button type="submit" className="btn-primary">
          Save Profile
        </button>
        {status && <p className="admin-status">{status}</p>}
      </form>
    </section>
  );
};

export default ProfileForm;
