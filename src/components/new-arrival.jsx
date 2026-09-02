import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/new-arrival.css";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext";

const NewArrivals = ({ allProducts, loading }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [visibleCards, setVisibleCards] = useState({});

  const discount = (orig, price) => {
    if (!orig) return 0;
    return Math.round(((orig - price) / orig) * 100);
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

  const products = allProducts.filter((p) => p.isNewArrival);

  // Scroll pe cards ko fade-in karne ke liye
  useEffect(() => {
    const cards = document.querySelectorAll(".na-card:not(.na-skeleton)");

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
      { threshold: 0.15 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [products.length]);

  if (loading) {
    return (
      <section className="new-arrivals-section">
        <div className="na-header">
          <div className="na-header-left">
            <span className="na-eyebrow">What's New</span>
            <h2 className="na-title">New Arrivals</h2>
          </div>
        </div>

        <div className="na-grid">
          {[...Array(4)].map((_, i) => (
            <div className="na-card na-skeleton" key={i}>
              <div className="na-skeleton-image"></div>
              <div className="na-card-info">
                <div className="na-skeleton-line na-skeleton-title"></div>
                <div className="na-skeleton-line na-skeleton-price"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="new-arrivals-section">
      <div className="na-header">
        <div className="na-header-left">
          <span className="na-eyebrow">What's New</span>
          <h2 className="na-title">New Arrivals</h2>
        </div>
        <a href="#" className="na-view-all">
          View All <i className="fa fa-arrow-right"></i>
        </a>
      </div>

      <div className="na-grid">
        {products.map((product, index) => {
          const inWishlist = isInWishlist(product._id);
          const isVisible = visibleCards[product._id];

          return (
            <div
              className={`na-card ${isVisible ? "in-view" : ""}`}
              key={product._id}
              data-id={product._id}
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => handleCardClick(product._id)}
            >
              <div className="na-card-image">
                <img src={product.image} alt={product.name} />
                {product.originalPrice && (
                  <span className="na-discount">
                    -{discount(product.originalPrice, product.price)}%
                  </span>
                )}

                <div className="na-card-actions">
                  <button
                    className={`na-action-btn ${inWishlist ? "active" : ""}`}
                    onClick={(e) => handleWishlistClick(e, product)}
                  >
                    <i className={`fa${inWishlist ? "s" : "r"} fa-heart`}></i>
                  </button>
                </div>
              </div>

              <div className="na-card-info">
                <h3 className="na-card-name">{product.name}</h3>

                <div className="na-rating">
                  <div className="na-stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < Math.floor(product.rating || 0) ? "filled" : ""
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="na-rating-count">
                    ({product.reviews || 0})
                  </span>
                </div>

                <div className="na-price-row">
                  <span className="na-price">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="na-original-price">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="na-bottom">
        <Link to="/collection?filter=bestSeller" className="bs-view-all">
          View All Product<i className="fa fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
};

export default NewArrivals;
