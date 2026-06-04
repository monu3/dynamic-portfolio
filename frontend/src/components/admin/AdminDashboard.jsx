import React from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    path: "profile",
    title: "Profile",
    description: "Edit the public profile content.",
  },
  {
    path: "skills",
    title: "Skills",
    description: "Add, update, or remove skill entries.",
  },
  {
    path: "projects",
    title: "Projects",
    description: "Manage project cards and links.",
  },
  {
    path: "experience",
    title: "Experience",
    description: "Update career timeline items.",
  },
  {
    path: "tech-stack",
    title: "Technology Stack",
    description: "Manage stack categories and skills.",
  },
];

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-welcome">
        <h2>Welcome to the Admin Portal</h2>
        <p>Select a section below to update your portfolio content.</p>
      </div>

      <div className="admin-grid">
        {sections.map((section) => (
          <Link key={section.path} to={section.path} className="admin-card">
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
