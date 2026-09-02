import React, { useState } from "react";
import "../style/Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="newsletter-section">
      <div className="nl-container">
        <div className="nl-content">
          {/* Animated Envelope / Crown Icon */}
          <div className="nl-icon">
            <i className="fas fa-envelope-open-text"></i>
          </div>

          {/* Luxury Text Copy */}
          <span className="nl-eyebrow">The Khan Couture Gazette</span>
          <h2 className="nl-title">Unlock 10% Off Your Inaugural Order</h2>
          <p className="nl-subtitle">
            Be the first to preview seasonal unstitched lawn drops, limited festive pret edits, and exclusive member-only privileges — straight to your inbox.
          </p>

          {/* Form or Success State */}
          {submitted ? (
            <div className="nl-success">
              <i className="fas fa-circle-check"></i>
              <span>Welcome to the Haute Circle. Your 10% welcome voucher has been dispatched!</span>
            </div>
          ) : (
            <form className="nl-form" onSubmit={handleSubmit}>
              <div className={`nl-input-wrapper ${focused ? "focused" : ""}`}>
                <i className="fas fa-envelope nl-input-icon"></i>
                <input
                  type="email"
                  className="nl-input"
                  placeholder="Enter your email for private access..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                />
              </div>
              <button type="submit" className="nl-btn">
                <span>Claim Invitation</span>
                <i className="fas fa-arrow-right nl-btn-icon"></i>
              </button>
            </form>
          )}

          {/* Privacy Footnote */}
          <p className="nl-note">
            <i className="fas fa-shield-halved"></i> 100% Privacy Protected &nbsp;·&nbsp; Unsubscribe with a single click anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;