import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchPortfolio } from "../services/api";
import defaults from "../data/defaults";

const PortfolioContext = createContext({});

const groupTechnologyStacks = (technologyStacks) => {
  if (!Array.isArray(technologyStacks) || technologyStacks.length === 0) {
    return [];
  }

  const grouped = technologyStacks.reduce((acc, item) => {
    const category = item.category || "Other";
    const name = item.name || item.tech || item.label || "Unknown";

    if (!acc[category]) {
      acc[category] = new Set();
    }
    acc[category].add(name);
    return acc;
  }, {});

  return Object.entries(grouped).map(([category, values]) => ({
    category,
    skills: Array.from(values),
  }));
};

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaults.profile);
  const [experience, setExperience] = useState(defaults.experience);
  const [skills, setSkills] = useState(defaults.skills);
  const [technologyStackItems, setTechnologyStackItems] = useState([]);
  const [technologyStacks, setTechnologyStacks] = useState(
    defaults.technologyStacks,
  );
  const [projects, setProjects] = useState(defaults.projects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetchPortfolioData = async () => {
    setLoading(true);
    try {
      const response = await fetchPortfolio();
      const data = response.data || {};

      if (data.profile) {
        setProfile({
          ...defaults.profile,
          ...data.profile,
        });
      }

      setExperience(
        Array.isArray(data.experience) && data.experience.length > 0
          ? data.experience
          : defaults.experience,
      );
      setSkills(
        Array.isArray(data.skills) && data.skills.length > 0
          ? data.skills
          : defaults.skills,
      );
      setTechnologyStackItems(
        Array.isArray(data.technologyStacks) ? data.technologyStacks : [],
      );
      setTechnologyStacks(
        Array.isArray(data.technologyStacks) && data.technologyStacks.length > 0
          ? groupTechnologyStacks(data.technologyStacks)
          : defaults.technologyStacks,
      );
      setProjects(
        Array.isArray(data.projects) && data.projects.length > 0
          ? data.projects
          : defaults.projects,
      );
      setError(null);
    } catch (err) {
      setError(err?.message || "Could not load portfolio data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        experience,
        skills,
        technologyStackItems,
        technologyStacks,
        projects,
        loading,
        error,
        refetchPortfolioData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};
