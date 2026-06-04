import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAdminCredentials = () => {
  if (typeof window === "undefined") {
    return { username: "", password: "" };
  }
  const stored = window.sessionStorage.getItem("adminCredentials");
  if (!stored) {
    return { username: "", password: "" };
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    return { username: "", password: "" };
  }
};

export const setAdminCredentials = (username, password) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(
      "adminCredentials",
      JSON.stringify({ username, password }),
    );
  }
};

export const clearAdminCredentials = () => {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("adminCredentials");
  }
};

const authHeader = () => {
  const { username, password } = getAdminCredentials();
  if (!username || !password) {
    return {};
  }
  return {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
  };
};

export const fetchPortfolio = () => api.get("/public/profile");

export const saveProfile = (profile) =>
  api.put("/admin/profile", profile, { headers: authHeader() });

export const saveSkill = (skill) =>
  api.post("/admin/skills", skill, { headers: authHeader() });

export const updateSkill = (skill) =>
  api.put("/admin/skills", skill, { headers: authHeader() });

export const deleteSkill = (id) =>
  api.delete(`/admin/skills/${id}`, { headers: authHeader() });

export const saveProject = (project) =>
  api.post("/admin/project", project, { headers: authHeader() });

export const updateProject = (project) =>
  api.put("/admin/project", project, { headers: authHeader() });

export const deleteProject = (id) =>
  api.delete(`/admin/project/${id}`, { headers: authHeader() });

export const saveExperience = (experience) =>
  api.post("/admin/experience", experience, { headers: authHeader() });

export const updateExperience = (experience) =>
  api.put("/admin/experience", experience, { headers: authHeader() });

export const deleteExperience = (id) =>
  api.delete(`/admin/experience/${id}`, { headers: authHeader() });

export const saveTechnologyStack = (technologyStack) =>
  api.post("/admin/technology-stack", technologyStack, {
    headers: authHeader(),
  });

export const updateTechnologyStack = (technologyStack) =>
  api.put("/admin/technology-stack", technologyStack, {
    headers: authHeader(),
  });

export const deleteTechnologyStack = (id) =>
  api.delete(`/admin/technology-stack/${id}`, { headers: authHeader() });
