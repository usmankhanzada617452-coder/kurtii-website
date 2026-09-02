import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/flash-sales.css";
import { useWishlist } from "../context/wishlistContext";

const Sales = ({ allProducts, loading }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [visibleCards, setVisibleCards] = useState({});

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll pe cards ko fade-in karne ke liye
  useEffect(() => {
    const cards = document.querySelectorAll(".sale-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            setVisibleCards((prev) => ({ ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [allProducts]);

  const pad = (n) => String(n).padStart(2, "0");

  const getDiscountPercent = (originalPrice, price) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const renderStars = (rating) => {
    const fullStars = Math.round(rating || 0);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleWishlistClick = (e, product) => {
    e.stopPropagation();
    toggleWishlist({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  if (loading) {
    return (
      <div className="sales-container">
        <p>Loading flash sale products...</p>
      </div>
    );
  }

  const products = allProducts.filter((p) => p.onSale);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="sales-container">
      <div className="sales-header">
        <div className="day">
          <div className="border"></div>
          <p>Today's</p>
        </div>

        <div className="sales-time">
          <h1>Flash Sales</h1>

          <div className="time-container">
            <div className="time">
              <p>Days</p>
              <h1>{pad(timeLeft.days)}</h1>
            </div>

            <span className="underscore">:</span>

            <div className="time">
              <p>Hours</p>
              <h1>{pad(timeLeft.hours)}</h1>
            </div>

            <span className="underscore">:</span>

            <div className="time">
              <p>Minutes</p>
              <h1>{pad(timeLeft.minutes)}</h1>
            </div>

            <span className="underscore">:</span>

            <div className="time">
              <p>Seconds</p>
              <h1>{pad(timeLeft.seconds)}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="sales-cards">
        {products.map((product, index) => {
          const inWishlist = isInWishlist(product._id);
          const isVisible = visibleCards[product._id];

          return (
            <div
              className={`sale-card ${isVisible ? "in-view" : ""}`}
              key={product._id}
              data-id={product._id}
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => handleCardClick(product._id)}
            >
              <div className="discount-badge">
                <p>-{getDiscountPercent(product.originalPrice, product.price)}%</p>
              </div>

              <div className="card-img">
                <img src={product.image} alt={product.name} />

                <div className="card-actions">
                  <button
                    className={`action-btn ${inWishlist ? "active" : ""}`}
                    onClick={(e) => handleWishlistClick(e, product)}
                  >
                    <i
                      className={
                        inWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"
                      }
                    ></i>
                  </button>
                </div>
              </div>

              <div className="card-info">
                <h3 className="card-name">{product.name}</h3>

                <div className="card-price">
                  <span className="new-price">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="old-price">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="card-rating">
                  <span className="stars">{renderStars(product.rating)}</span>
                  <span className="review-count">({product.reviews || 0})</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sales;