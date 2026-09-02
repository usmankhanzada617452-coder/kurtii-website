// buy it now btn ke click pe ye component open huga 

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/product-page.css";
import { getProductById } from "../context/productData";
import { useCart } from "../context/CartContext";
import Header from '../components/Header'
import Footer from "../components/footer";

const sizes = ["S", "M", "L", "XL"];

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = getProductById(id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="pp-not-found">
        <h2>Product not found</h2>
        <Link to="/">Go back home</Link>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0 ? product.images : [product.image];

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, quantity });
  };

  const handleBuyNow = () => {
    addToCart({ ...product, size: selectedSize, quantity });
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <>
    <div className="pp-container">
      <Header />
      <div className="pp-top">
        
        <div className="pp-gallery">
          <div className="pp-main-image">
            <img src={images[activeImage]} alt={product.name} />
            {discount > 0 && <span className="pp-discount">-{discount}%</span>}
          </div>

          <div className="pp-thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                className={`pp-thumb ${i === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="pp-info">
          <span className="pp-category">{product.category}</span>
          <h1 className="pp-name">{product.name}</h1>

          <div className="pp-rating">
            <span className="pp-stars">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="pp-reviews">({product.reviews} reviews)</span>
          </div>

          <div className="pp-price-row">
            <span className="pp-price">Rs. {product.price.toLocaleString()}</span>
            <span className="pp-original-price">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
            {discount > 0 && <span className="pp-discount-tag">-{discount}%</span>}
          </div>

          <p className="pp-description">
            Premium quality {product.category.toLowerCase()} crafted with care — perfect
            for everyday elegance and special occasions alike.
          </p>

          <div className="pp-size-section">
            <p className="pp-section-label">Size</p>
            <div className="pp-sizes">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`pp-size-btn ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pp-qty-section">
            <p className="pp-section-label">Quantity</p>
            <div className="pp-qty-control">
              <button onClick={decreaseQty}>−</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>
          </div>

          <div className="pp-actions">
            <button className="pp-add-to-cart" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping"></i> Add To Cart
            </button>
            <Link to="/cart" className="pp-buy-now" onClick={handleBuyNow}>
              Buy It Now
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProductPage;