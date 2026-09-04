import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/footer.css";
import { subscribeEmail } from "../context/subscriberApi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      await subscribeEmail(email.trim());
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      const message = err.response?.data?.message || "Subscription failed, try again";
      setError(message);
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-col">
          <h2 className="footer-logo-main">KHAN</h2>
          <p className="footer-logo-sub">COLLECTION</p>
          <div className="footer-divider"></div>
          <p className="footer-desc">
            Premium Pakistani fashion for the modern wardrobe — timeless
            silhouettes, elegant fabrics, crafted with care since day one.
          </p>
          <div className="footer-socials">
            <div className="social-icon">
              <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <div className="social-icon">
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
            </div>
            <div className="social-icon">
              <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
            <div className="social-icon">
              <a href="#"><i className="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Shop</p>
          <Link to="/collection">All Products</Link>
          <Link to="/collection?filter=newArrival">New Arrivals</Link>
          <Link to="/collection?filter=onSale">Sale</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Help</p>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/checkout">Order Tracking</Link>
          <span>FAQs</span>
        </div>

        <div className="footer-col footer-newsletter-col">
          <p className="footer-col-title">Newsletter</p>
          <p className="footer-newsletter-text">
            Subscribe to get notified about new arrivals, exclusive discounts
            and style edits.
          </p>

          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe" disabled={loading}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>

          {subscribed && <p className="footer-newsletter-success">Thanks for subscribing!</p>}
          {error && <p className="footer-newsletter-error">{error}</p>}

          <div className="footer-contact-item">
            <i className="fa-solid fa-envelope"></i>
            <span>support@khancollection.pk</span>
          </div>
          <div className="footer-contact-item">
            <i className="fa-solid fa-phone"></i>
            <span>+92 300 0000000</span>
          </div>
          <div className="footer-contact-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>Karachi, Pakistan</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Free delivery on orders above Rs. 5,000</p>
        <div className="footer-bottom-links">
          <span>© {new Date().getFullYear()} Khan Collection</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;