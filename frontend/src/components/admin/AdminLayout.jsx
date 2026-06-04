import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminCredentials } from "../../services/api";
import "./admin.css";

const navItems = [
  { path: "profile", label: "Profile" },
  { path: "skills", label: "Skills" },
  { path: "projects", label: "Projects" },
  { path: "experience", label: "Experience" },
  { path: "tech-stack", label: "Technology Stack" },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem("adminCredentials");
      if (!stored) {
        navigate("/admin");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAdminCredentials();
    navigate("/admin");
  };

  return (
    <div className="admin-page admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Portfolio Admin</h2>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="btn-secondary admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage portfolio content and sync changes to the backend API.</p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
