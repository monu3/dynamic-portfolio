import React, { useState, useEffect, useRef } from "react";
import "./BookPortfolio.css";
import CoverPage from "./pages/CoverPage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

const BookPortfolio = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState("warm"); // 'warm' or 'dark'
  const bookRef = useRef(null);

  const pages = [
    { id: 0, component: <CoverPage /> },
    { id: 1, component: <AboutPage /> },
    { id: 2, component: <SkillsPage /> },
    { id: 3, component: <ProjectsPage /> },
    { id: 4, component: <ContactPage /> },
  ];

  const goToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < pages.length && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(pageIndex);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "warm" ? "dark" : "warm"));
  };

  // Keyboard navigation only
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextPage();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage]);

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={`book-container theme-${theme}`} ref={bookRef}>
      <div className="book-wrapper">
        {/* Theme Toggle */}
        <button
          className="theme-toggle w-auto -mt-10"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "warm" ? <Moon size={20} /> : <Sun size={20} />}
          <span className="theme-label">
            {theme === "warm" ? "Dark" : "Light"}
          </span>
        </button>

        <div className="book" data-current-page={currentPage}>
          {/* Left Page */}
          <div className="page page-left">
            {currentPage > 0 && (
              <div className="page-content">
                {pages[currentPage - 1]?.component}
              </div>
            )}
          </div>

          {/* Book Spine */}
          <div className="book-spine">
            <div className="spine-decoration"></div>
          </div>

          {/* Right Page */}
          <div className="page page-right">
            <div className="page-content">{pages[currentPage]?.component}</div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentPage > 0 && (
          <button
            className="nav-button nav-prev"
            onClick={prevPage}
            disabled={isAnimating}
            aria-label="Previous page"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {currentPage < pages.length - 1 && (
          <button
            className="nav-button nav-next"
            onClick={nextPage}
            disabled={isAnimating}
            aria-label="Next page"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Page Indicator */}
        <div className="page-indicator -m-3">
          {pages.map((_, index) => (
            <button
              key={index}
              className={`page-dot ${index === currentPage ? "active" : ""}`}
              onClick={() => goToPage(index)}
              disabled={isAnimating}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPortfolio;
