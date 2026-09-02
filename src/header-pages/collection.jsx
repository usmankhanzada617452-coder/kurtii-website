import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/productApi";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/CartContext";
import "../style/collection.css";

const Collection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState("default");

  const activeFilterType = searchParams.get("filter") || "";

  useEffect(() => {
    fetchProducts()
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Failed to load products:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];

  let filtered = allProducts.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  // Special filters coming from "View All" links (bestSeller / newArrival / onSale)
  if (activeFilterType === "bestSeller") {
    filtered = filtered.filter((p) => p.bestSeller);
  } else if (activeFilterType === "newArrival") {
    filtered = filtered.filter((p) => p.isNewArrival);
  } else if (activeFilterType === "onSale") {
    filtered = filtered.filter((p) => p.onSale);
  }

  filtered = filtered.sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const pageTitle =
    activeFilterType === "bestSeller"
      ? "Best Selling Products"
      : activeFilterType === "newArrival"
      ? "New Arrivals"
      : activeFilterType === "onSale"
      ? "Sale"
      : "Our Collection";

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

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    openCart();
  };

  return (
    <>
      <Header />

      <div className="collection-page">
        <div className="collection-hero">
          <h1>{pageTitle}</h1>
          <p>Discover the finest Pakistani ladies fashion</p>
        </div>

        <div className="collection-toolbar">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-box">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="collection-count">
          <p>{loading ? "Loading..." : `${filtered.length} Products`}</p>
        </div>

        {loading ? (
          <div className="collection-grid">
            {[...Array(8)].map((_, i) => (
              <div className="col-card na-skeleton" key={i}>
                <div className="na-skeleton-image"></div>
                <div className="col-card-info">
                  <div className="na-skeleton-line na-skeleton-title"></div>
                  <div className="na-skeleton-line na-skeleton-price"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="collection-grid">
            {filtered.map((product) => {
              const inWishlist = isInWishlist(product._id);

              return (
                <div
                  className="col-card"
                  key={product._id}
                  onClick={() => handleCardClick(product._id)}
                >
                  <div className="col-card-image">
                    <img src={product.image} alt={product.name} />
                    {product.originalPrice && (
                      <span className="col-discount">
                        -{discount(product.originalPrice, product.price)}%
                      </span>
                    )}
                    <div className="col-card-actions">
                      <button
                        className={`col-action-btn ${inWishlist ? "active" : ""}`}
                        onClick={(e) => handleWishlistClick(e, product)}
                      >
                        <i className={`fa${inWishlist ? "s" : "r"} fa-heart`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-card-info">
                    <span className="col-category">{product.category}</span>
                    <h3 className="col-card-name">{product.name}</h3>

                    <div className="col-rating">
                      <div className="col-stars">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < Math.floor(product.rating || 0) ? "filled" : ""
                            }`}
                          ></i>
                        ))}
                      </div>
                      <span className="col-rating-count">({product.reviews || 0})</span>
                    </div>

                    <div className="col-price-row">
                      <span className="col-price">Rs. {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="col-original-price">
                          Rs. {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      className="col-add-to-cart"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Collection;