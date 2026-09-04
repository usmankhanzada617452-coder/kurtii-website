import React, { useState } from "react";
import "../style/Newsletter.css";
import { subscribeEmail } from "../context/subscriberApi";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      await subscribeEmail(email.trim());
      setIsSubscribed(true);
      setEmail("");
    } catch (err) {
      const message = err.response?.data?.message || "Subscription failed, try again";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="nl-ambient-glow"></div>

      <div className="nl-container">
        <div className="nl-content">
          <div className="nl-badge">
            <i className="fa-solid fa-crown"></i>
            <span>The Private Club</span>
          </div>

          <h2 className="nl-title">
            <span>Join The Inner Circle</span>
          </h2>

          <p className="nl-subtitle">
            Be the first to access private sales, seasonal drops, and bespoke couture previews.
          </p>

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

              <button type="submit" className="nl-btn" disabled={loading}>
                <span>{loading ? "Please wait..." : "Unlock Access"}</span>
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>

              {error && <p className="nl-error">{error}</p>}
            </form>
          ) : (
            <div className="nl-success">
              <i className="fa-solid fa-circle-check"></i>
              <span>Welcome to the Inner Circle. Privilege granted.</span>
            </div>
          )}

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