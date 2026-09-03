import React from "react";
import "../style/BannerHeading.css"; // Apni CSS path set karein

const BannerHeading = () => {
  return (
    <div className="banner-heading">
      <div className="banner-glow"></div>
      
      <h1 className="banner-title">
        <i className="fa-solid fa-truck-fast banner-icon"></i>
        <span>Complimentary Shipping On Orders Above Rs. 5,000</span>
      </h1>
    </div>
  );
};

export default BannerHeading;