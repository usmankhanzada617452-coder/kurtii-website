import React, { useState, useEffect } from "react";
import "../style/Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Malik",
    city: "Karachi",
    rating: 5,
    review:
      "Bohat acha fabric tha aur delivery bhi 2 din mein aa gayi. Abaya ki quality expected se kaafi behtar nikli. Zaroor dobara order karungi!",
    initials: "AM",
    product: "Embroidered Abaya",
  },
  {
    id: 2,
    name: "Sana Rehman",
    city: "Lahore",
    rating: 5,
    review:
      "Maine kurti order ki thi eid ke liye — bilkul waisi aayi jaise website pe thi. Stitching perfect thi aur color bhi exact same. Highly recommend!",
    initials: "SR",
    product: "Printed Lawn Kurti",
  },
  {
    id: 3,
    name: "Fatima Khan",
    city: "Islamabad",
    rating: 4,
    review:
      "Dress bohat sundar thi, packaging bhi neat thi. Thodi delivery late hui lekin customer support ne update deta raha. Overall experience acha raha.",
    initials: "FK",
    product: "Formal Chiffon Dress",
  },
  {
    id: 4,
    name: "Zara Ahmed",
    city: "Faisalabad",
    rating: 5,
    review:
      "Khan Collection se pehli baar liya — soch rahi thi online trust hoga ya nahi. But quality dekh ke dil khush ho gaya. Ab toh regular customer hun!",
    initials: "ZA",
    product: "Shalwar Kameez Set",
  },
  {
    id: 5,
    name: "Hina Baig",
    city: "Multan",
    rating: 5,
    review:
      "Price bhi reasonable hai aur quality bhi top notch. Meri sahelion ne bhi pocha kahan se liya — sab ko yahan refer kar diya!",
    initials: "HB",
    product: "Digital Print Abaya",
  },
  {
    id: 6,
    name: "Nadia Hussain",
    city: "Rawalpindi",
    rating: 4,
    review:
      "Lawn kurti bahut comfortable hai, especially summer mein. Fabric breathable hai aur colors fade nahi hue wash ke baad bhi.",
    initials: "NH",
    product: "Cotton Lawn Kurti",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo(active === 0 ? testimonials.length - 1 : active - 1);
  const next = () => goTo(active === testimonials.length - 1 ? 0 : active + 1);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [active]);

  const current = testimonials[active];

  return (
    <section className="testimonials-section">
      {/* Header */}
      <div className="t-header">
        <span className="t-eyebrow">Client Whispers & Acclaim</span>
        <h2 className="t-title">Real Reviews</h2>
        <div className="t-title-line"></div>
      </div>

      {/* Big quote + slider */}
      <div className="t-slider-wrapper">
        {/* Prev */}
        <button 
          className="t-arrow t-arrow--prev" 
          onClick={prev}
          aria-label="Previous review"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Card */}
        <div className={`t-card ${animating ? "t-card--fade" : ""}`}>
          <div className="t-quote-icon">“</div>

          <p className="t-review">{current.review}</p>

          {/* Stars */}
          <div className="t-stars">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star ${
                  i < current.rating ? "t-star--filled" : "t-star--empty"
                }`}
              ></i>
            ))}
          </div>

          {/* Customer */}
          <div className="t-customer">
            <div className="t-avatar">{current.initials}</div>
            <div className="t-customer-info">
              <span className="t-customer-name">{current.name}</span>
              <span className="t-customer-meta">
                {current.city} &nbsp;·&nbsp; <span className="t-verified-badge">Verified Buyer</span> &nbsp;·&nbsp; Bought: {current.product}
              </span>
            </div>
          </div>
        </div>

        {/* Next */}
        <button 
          className="t-arrow t-arrow--next" 
          onClick={next}
          aria-label="Next review"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Dots */}
      <div className="t-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`t-dot ${i === active ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="t-stats">
        <div className="t-stat">
          <span className="t-stat-number">5,000+</span>
          <span className="t-stat-label">Happy Patrons</span>
        </div>
        <div className="t-stat-divider"></div>
        <div className="t-stat">
          <span className="t-stat-number">4.8 ★</span>
          <span className="t-stat-label">Average Rating</span>
        </div>
        <div className="t-stat-divider"></div>
        <div className="t-stat">
          <span className="t-stat-number">98%</span>
          <span className="t-stat-label">Repeat Recommendation</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;