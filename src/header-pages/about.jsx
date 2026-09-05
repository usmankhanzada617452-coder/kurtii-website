import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../style/about.css";

const AboutUs = () => {
  return (
    <>
      <Header />

      <div className="about-container">
        {/* 1. Hero Section */}
        <section className="about-hero">
          <div className="about-hero-overlay">
            <span className="about-eyebrow">Khan Collection</span>
            <h1 className="about-hero-title">Crafting Timeless Elegance</h1>
            <p className="about-hero-subtitle">
              Redefining luxury fashion with premium fabrics, intricate
              craftsmanship, and modern style.
            </p>
          </div>
        </section>

        {/* 2. Brand Story Section */}
        <section className="about-story-section">
          <div className="about-story-grid">
            <div className="about-story-image">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800"
                alt="Craftsmanship"
              />
            </div>
            <div className="about-story-content">
              <span className="section-subtitle">Our Heritage</span>
              <h2>Where Tradition Meets Modern Couture</h2>
              <p>
                Founded with a passion for exquisite fashion, Khan Collection
                brings you a handpicked selection of premium traditional and
                contemporary attire. Every piece is crafted to make you stand
                out with confidence and sophistication.
              </p>
              <p>
                From fine embroideries to hand-selected fabrics, our mission is
                to deliver luxury clothing that feels as extraordinary as it
                looks.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Why Choose Us (Highlights) */}
        <section className="about-features-section">
          <div className="features-header">
            <span className="section-subtitle">Why Choose Us</span>
            <h2>The Khan Collection Standard</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Premium Fabrics</h3>
              <p>
                Sourced from top mills to guarantee durability, softness, and
                sheer luxury.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✂️</div>
              <h3>Master Craftsmanship</h3>
              <p>
                Detailed embroidery and precise tailoring for a flawless luxury
                fit.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Worldwide Express Delivery</h3>
              <p>
                Safe, fast, and reliable delivery right to your doorstep,
                everywhere.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Founder's Message */}
        <section className="about-founder-section">
          <div className="founder-card">
            <p className="founder-quote">
              "Clothing isn’t just about looking good—it’s about how it makes
              you feel. Our goal is to bring timeless elegance into everyday
              lives."
            </p>
            <span className="founder-name">Usman Khan</span>
            <span className="founder-title">Founder & Creative Director</span>
          </div>
        </section>

        {/* 5. Call To Action */}
        <section className="about-cta-section">
          <h2>Ready to Upgrade Your Wardrobe?</h2>
          <p>Explore our latest luxury arrivals today.</p>

          <Link to="/shop" className="about-cta-btn">
            Explore Collection ➔
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
