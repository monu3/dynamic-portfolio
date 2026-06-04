import React from "react";
import "./CoverPage.css";
import { BookOpen } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const CoverPage = () => {
  const { profile } = usePortfolio();
  return (
    <div className="cover-page">
      <div className="cover-ornament cover-ornament-top"></div>

      <div className="cover-content">
        <div className="cover-icon">
          <BookOpen size={60} strokeWidth={1.5} />
        </div>

        <h1 className="cover-title">Portfolio</h1>

        <div className="cover-divider"></div>

        <h2 className="cover-name">{profile.name}</h2>

        <p className="cover-subtitle">{profile.subtitle}</p>

        <div className="profile-image-container">
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="profile-image"
          />
        </div>

        <p className="cover-tagline">{profile.tagline}</p>
      </div>

      <div className="cover-ornament cover-ornament-bottom"></div>

      <div className="cover-footer">
        <p>Scroll or click to explore</p>
      </div>
    </div>
  );
};

export default CoverPage;
