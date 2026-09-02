import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../services/productApi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/wishlistContext";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../style/productDetail.css";

const sizes = ["S", "M", "L", "XL"];

const faqs = [
  {
    q: "Delivery kitne din me hogi?",
    a: "Order place karne ke baad 3-5 working days me nationwide express delivery ho jati hai.",
  },
  {
    q: "Size exchange/return ho sakta hai?",
    a: "Haan, 3 din ke andar easy & hassle-free size exchange ya return policy available hai.",
  },
  {
    q: "Fabric care kaise karein?",
    a: "Premium delicate embroidery aur fabric longevity ke liye cold water me gentle hand wash ya dry clean recommended hai.",
  },
  {
    q: "Cash on delivery available hai?",
    a: "Haan, Pakistan ke saare major cities me Cash on Delivery (COD) service available hai.",
  },
];

const ratingBreakdown = [
  { star: 5, percent: 68 },
  { star: 4, percent: 20 },
  { star: 3, percent: 7 },
  { star: 2, percent: 3 },
  { star: 1, percent: 2 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product) return;
    fetchProducts()
      .then((all) => {
        if (Array.isArray(all)) {
          setRelatedProducts(
            all.filter(
              (p) => p && p.category === product.category && p._id !== product._id
            )
          );
        }
      })
      .catch(() => {});
  }, [product]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="pp-container pp-loading-wrap">
          <div className="pp-spinner"></div>
          <p className="pp-loading-text">Unveiling luxury garment details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <Header />
        <div className="pp-container pp-not-found">
          <h2>Garment Not Found</h2>
          <p>The requested design may have sold out or is no longer available.</p>
          <Link to="/" className="pp-back-btn">
            Explore Haute Collection
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const images = [product.image];

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
    });
    openCart();
  };

  const handleBuyNow = (e) => {
    e.preventDefault();

    if (!selectedSize) {
      alert("Please select a size before proceeding");
      return;
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
    });

    navigate("/cart");
  };

  const handleWishlist = () => {
    toggleWishlist({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const scrollCarousel = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <>
      <Header />

      <main className="pp-page-wrapper">
        <div className="pp-container">
          {/* Breadcrumb Navigation */}
          <nav className="pp-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to={`/collection?category=${encodeURIComponent(product.category || "")}`}>
              {product.category || "Collection"}
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>

          {/* Top Gallery & Details Grid */}
          <div className="pp-top">
            {/* Gallery Section */}
            <div className="pp-gallery">
              <div className="pp-main-image">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="pp-main-img-tag"
                />

                {discount > 0 && (
                  <span className="pp-discount-pill">
                    Save {discount}%
                  </span>
                )}

                {/* Floating Heart Button */}
                <button
                  className={`pp-wishlist-float-btn ${inWishlist ? "active" : ""}`}
                  onClick={handleWishlist}
                  title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <i
                    className={
                      inWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"
                    }
                  ></i>
                </button>
              </div>

              {images.length > 1 && (
                <div className="pp-thumbs">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`pp-thumb ${activeImage === idx ? "active" : ""}`}
                      onClick={() => setActiveImage(idx)}
                    >
                      <img src={img} alt={`Preview ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Purchase Controls */}
            <div className="pp-info">
              <span className="pp-category">{product.category || "Haute Pret"}</span>
              <h1 className="pp-name">{product.name}</h1>

              <div className="pp-rating">
                <span className="pp-stars">
                  {"★".repeat(Math.floor(product.rating || 0))}
                  {"☆".repeat(5 - Math.floor(product.rating || 0))}
                </span>
                <span className="pp-reviews">
                  ({product.reviews || 0} Verified Customer Reviews)
                </span>
              </div>

              {/* Price Row */}
              <div className="pp-price-row">
                <span className="pp-price">
                  Rs. {product.price ? product.price.toLocaleString() : "0"}
                </span>
                {product.originalPrice && (
                  <span className="pp-original-price">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="pp-discount-tag">Limited Vault Offer</span>
                )}
              </div>

              <div className="pp-divider"></div>

              <p className="pp-description">{product.description}</p>

              {/* Size Selector */}
              <div className="pp-size-section">
                <div className="pp-size-header-row">
                  <p className="pp-section-label">Select Tailored Size</p>
                  <span className="pp-size-guide-text">
                    <i className="fa-solid fa-ruler-horizontal"></i> Size Guide
                  </span>
                </div>
                <div className="pp-sizes">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`pp-size-btn ${selectedSize === s ? "active" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="pp-qty-section">
                <p className="pp-section-label">Quantity</p>
                <div className="pp-qty-control">
                  <button type="button" onClick={decreaseQty} aria-label="Decrease quantity">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="pp-qty-number">{quantity}</span>
                  <button type="button" onClick={increaseQty} aria-label="Increase quantity">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pp-actions">
                <button
                  type="button"
                  className="pp-add-to-cart"
                  onClick={handleAddToCart}
                >
                  <i className="fa-solid fa-bag-shopping"></i> Add To Shopping Bag
                </button>
                <button
                  type="button"
                  className="pp-buy-now"
                  onClick={handleBuyNow}
                >
                  Instant Checkout <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              {/* In-Stock Urgent Indicator */}
              <div className="pp-stock-status">
                <span className="pp-stock-pulse"></span>
                <span>In Stock & Ready for Immediate Dispatch</span>
              </div>
            </div>
          </div>

          {/* 4 Trust Value Pillars */}
          <div className="pp-trust-strip">
            <div className="pp-trust-item">
              <div className="pp-trust-icon-box">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h4 className="pp-trust-title">Nationwide Delivery</h4>
              <p className="pp-trust-desc">Express delivery in 3-5 business days</p>
            </div>
            <div className="pp-trust-item">
              <div className="pp-trust-icon-box">
                <i className="fa-solid fa-rotate-left"></i>
              </div>
              <h4 className="pp-trust-title">3-Day Easy Exchange</h4>
              <p className="pp-trust-desc">Hassle-free size replacement</p>
            </div>
            <div className="pp-trust-item">
              <div className="pp-trust-icon-box">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h4 className="pp-trust-title">100% Authentic Fabric</h4>
              <p className="pp-trust-desc">Guaranteed premium original thread</p>
            </div>
            <div className="pp-trust-item">
              <div className="pp-trust-icon-box">
                <i className="fa-solid fa-money-bill-wave"></i>
              </div>
              <h4 className="pp-trust-title">Cash on Delivery</h4>
              <p className="pp-trust-desc">Pay safely at your doorstep</p>
            </div>
          </div>

          {/* Reviews & Social Proof Section */}
          <div className="pp-reviews-section">
            <div className="pp-section-header-wrap">
              <span className="pp-section-eyebrow">Client Feedback</span>
              <h2 className="pp-section-title">Verified Customer Reviews</h2>
            </div>

            <div className="pp-reviews-summary">
              <div className="pp-reviews-score">
                <h1>{product.rating ? Number(product.rating).toFixed(1) : "5.0"}</h1>
                <span className="pp-stars">
                  {"★".repeat(Math.floor(product.rating || 5))}
                  {"☆".repeat(5 - Math.floor(product.rating || 5))}
                </span>
                <p>{product.reviews || 12} Authentic Reviews</p>
              </div>

              <div className="pp-reviews-bars">
                {ratingBreakdown.map((b) => (
                  <div className="pp-bar-row" key={b.star}>
                    <span className="pp-bar-label">{b.star} ★</span>
                    <div className="pp-bar-track">
                      <div
                        className="pp-bar-fill"
                        style={{ width: `${b.percent}%` }}
                      ></div>
                    </div>
                    <span className="pp-bar-percent">{b.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Curated Products */}
          {relatedProducts.length > 0 && (
            <div className="pp-related-section">
              <div className="pp-related-header-row">
                <div>
                  <span className="pp-section-eyebrow">Complete The Look</span>
                  <h2 className="pp-section-title">You May Also Admire</h2>
                </div>

                <div className="pp-carousel-controls">
                  <button
                    className="pp-carousel-arrow-btn"
                    onClick={() => scrollCarousel("left")}
                    aria-label="Previous Products"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    className="pp-carousel-arrow-btn"
                    onClick={() => scrollCarousel("right")}
                    aria-label="Next Products"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div className="pp-carousel-wrapper">
                <div className="pp-carousel" ref={scrollRef}>
                  {relatedProducts.map((rp) => {
                    const rpDiscount = rp.originalPrice
                      ? Math.round(
                          ((rp.originalPrice - rp.price) / rp.originalPrice) *
                            100
                        )
                      : 0;
                    return (
                      <div
                        className="pp-related-card"
                        key={rp._id}
                        onClick={() => navigate(`/product/${rp._id}`)}
                      >
                        <div className="pp-related-img">
                          <img src={rp.image} alt={rp.name} loading="lazy" />
                          {rpDiscount > 0 && (
                            <span className="pp-related-discount">
                              -{rpDiscount}%
                            </span>
                          )}
                          <div className="pp-related-overlay">
                            <span>Explore Piece</span>
                          </div>
                        </div>

                        <div className="pp-related-info">
                          <h4 className="pp-related-name" title={rp.name}>
                            {rp.name}
                          </h4>
                          <div className="pp-related-price">
                            <span className="pp-related-new">
                              Rs. {rp.price ? rp.price.toLocaleString() : "0"}
                            </span>
                            {rp.originalPrice && (
                              <span className="pp-related-old">
                                Rs. {rp.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Interactive FAQs Accordion */}
          <div className="pp-faq-section">
            <div className="pp-section-header-wrap">
              <span className="pp-section-eyebrow">Customer Concierge</span>
              <h2 className="pp-section-title">Frequently Asked Questions</h2>
            </div>

            <div className="pp-faq-list">
              {faqs.map((f, i) => (
                <div
                  className={`pp-faq-item ${openFaq === i ? "active" : ""}`}
                  key={i}
                >
                  <button
                    type="button"
                    className="pp-faq-question"
                    onClick={() => toggleFaq(i)}
                  >
                    <span>{f.q}</span>
                    <i
                      className={`fa-solid fa-chevron-down faq-icon ${
                        openFaq === i ? "open" : ""
                      }`}
                    ></i>
                  </button>
                  {openFaq === i && (
                    <div className="pp-faq-answer-wrap">
                      <p className="pp-faq-answer">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetail;