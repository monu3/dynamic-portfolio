import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BookPortfolio from "./components/BookPortfolio";
import { PortfolioProvider } from "./context/PortfolioContext";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProfileForm from "./components/admin/ProfileForm";
import SkillsManager from "./components/admin/SkillsManager";
import ProjectsManager from "./components/admin/ProjectsManager";
import ExperienceManager from "./components/admin/ExperienceManager";
import TechStackManager from "./components/admin/TechStackManager";

function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <Routes>
          <Route path="/" element={<BookPortfolio />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<ProfileForm />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="tech-stack" element={<TechStackManager />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PortfolioProvider>
    </BrowserRouter>
  );
}

export default App;
