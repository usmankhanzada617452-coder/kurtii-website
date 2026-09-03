import React, { useState } from "react";
import "../style/Newsletter.css"; // Apni CSS path ke mutabiq set karein

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="newsletter-section">
      <div className="nl-ambient-glow"></div>
      
      <div className="nl-container">
        <div className="nl-content">
          
          {/* BADGE / EYEBROW */}
          <div className="nl-badge">
            <i className="fa-solid fa-crown"></i>
            <span>The Private Club</span>
          </div>

          {/* SINGLE LINE TITLE */}
          <h2 className="nl-title">
            <span>Join The Inner Circle</span>
          </h2>

          {/* SUBTITLE */}
          <p className="nl-subtitle">
            Be the first to access private sales, seasonal drops, and bespoke couture previews.
          </p>

          {/* FORM / SUCCESS MESSAGE */}
          {!isSubscribed ? (
            <form className="nl-form" onSubmit={handleSubmit}>
              <div className={`nl-input-wrapper ${isFocused ? "focused" : ""}`}>
                <i className="fa-regular fa-envelope nl-input-icon"></i>
                <input
                  type="email"
                  className="nl-input"
                  placeholder="Enter your VIP email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                />
              </div>

              <button type="submit" className="nl-btn">
                <span>Unlock Access</span>
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </form>
          ) : (
            <div className="nl-success">
              <i className="fa-solid fa-circle-check"></i>
              <span>Welcome to the Inner Circle. Privilege granted.</span>
            </div>
          )}

          {/* FOOTNOTE */}
          <div className="nl-note">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Zero Spam. Exclusive Privileges Only.</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;