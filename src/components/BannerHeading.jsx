import React from "react";
import "../style/BannerHeading.css"; // Apni CSS path set karein

const BannerHeading = () => {
  return (
    <div className="banner-heading">
      <div className="banner-glow"></div>
      
      <h1 className="banner-title">
        <i className="fa-solid fa-truck-fast banner-icon"></i>
        <span>Shopping Karo Be-Fikr! Rs. 5,000 se zyada ki shopping par Delivery Bilkul Free — Poore Pakistan Mein!</span>
      </h1>
    </div>
  );
};

export default BannerHeading;