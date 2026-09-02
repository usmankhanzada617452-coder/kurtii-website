import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/best-seller.css";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext";

const filters = [
  "All",
  "Unstitched Suits",
  "Stitched Kurtis",
  "Abayas",
  "Shalwar Kameez",
  "Kurta",
];

const BestSellers = ({ allProducts, loading }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeFilter, setActiveFilter] = useState("All");
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

  const bestSellerProducts = allProducts.filter((p) => p.bestSeller);

  const filtered =
    activeFilter === "All"
      ? bestSellerProducts
      : bestSellerProducts.filter((p) => p.category === activeFilter);

  // Scroll pe cards ko fade-in karne ke liye
  useEffect(() => {
    const cards = document.querySelectorAll(".bs-card");

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
  }, [filtered.length]);

  if (loading) {
    return (
      <section className="best-sellers-section">
        <div className="bs-grid">
          {[...Array(4)].map((_, i) => (
            <div className="bs-card na-skeleton" key={i}>
              <div className="na-skeleton-image"></div>
              <div className="bs-card-info">
                <div className="na-skeleton-line na-skeleton-title"></div>
                <div className="na-skeleton-line na-skeleton-price"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (bestSellerProducts.length === 0) return null;

  return (
    <section className="best-sellers-section">
      <div className="bs-section-header">
        <div className="bs-header-left">
          <span className="bs-eyebrow">⭐ Most Loved</span>
          <h2 className="bs-title">Best Selling Products</h2>
          <p className="bs-subtitle">
            Handpicked favourites — loved by thousands of customers across
            Pakistan.
          </p>
        </div>
        <Link to="/collection?filter=bestSeller" className="bs-view-all">
          View All <i className="fa fa-arrow-right"></i>
        </Link>
      </div>

      <div className="bs-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`bs-filter-btn ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bs-grid">
        {filtered.map((product, index) => {
          const inWishlist = isInWishlist(product._id);
          const isVisible = visibleCards[product._id];

          return (
            <div
              className={`bs-card ${isVisible ? "in-view" : ""}`}
              key={product._id}
              data-id={product._id}
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => handleCardClick(product._id)}
            >
              <div className="bs-card-image">
                <img src={product.image} alt={product.name} />
                {product.originalPrice && (
                  <span className="bs-discount">
                    -{discount(product.originalPrice, product.price)}%
                  </span>
                )}

                <div className="bs-card-actions">
                  <button
                    className={`bs-wishlist-btn ${inWishlist ? "active" : ""}`}
                    onClick={(e) => handleWishlistClick(e, product)}
                    title="Add to Wishlist"
                  >
                    <i className={`fa${inWishlist ? "s" : "r"} fa-heart`}></i>
                  </button>
                </div>
              </div>

              <div className="bs-card-info">
                <span className="bs-card-category">{product.category}</span>
                <h3 className="bs-card-name">{product.name}</h3>

                <div className="bs-rating">
                  <div className="bs-stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < Math.floor(product.rating || 0) ? "filled" : ""
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="bs-rating-count">
                    ({product.reviews || 0})
                  </span>
                </div>

                <div className="bs-price-row">
                  <span className="bs-price">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="bs-original-price">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSellers;
