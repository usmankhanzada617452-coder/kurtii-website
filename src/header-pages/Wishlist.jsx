import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/footer.jsx";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/CartContext";
import "../style/Wishlist.css";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  /* ================= FLY TO CART ANIMATION ================= */
  const handleMoveToCart = (e, item) => {
    // Cart Icon selector (apne Header ke cart icon ki class/ID se adjust kar sakte hain)
    const cartIcon = document.querySelector('.header-cart-icon') || document.querySelector('.fa-bag-shopping') || document.querySelector('.fa-cart-shopping');
    const button = e.currentTarget;
    const card = button.closest('.wishlist-card');
    const img = card ? card.querySelector('img') : null;

    if (cartIcon && img) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      // Duplicate image for flying effect
      const flyingImg = document.createElement('img');
      flyingImg.src = item.image;
      flyingImg.className = 'flying-cart-item';

      flyingImg.style.top = `${imgRect.top}px`;
      flyingImg.style.left = `${imgRect.left}px`;
      flyingImg.style.width = `${imgRect.width}px`;
      flyingImg.style.height = `${imgRect.height}px`;

      document.body.appendChild(flyingImg);

      // Trigger animation frame
      requestAnimationFrame(() => {
        flyingImg.style.top = `${cartRect.top + cartRect.height / 2 - 20}px`;
        flyingImg.style.left = `${cartRect.left + cartRect.width / 2 - 20}px`;
        flyingImg.style.width = '30px';
        flyingImg.style.height = '30px';
        flyingImg.style.opacity = '0.2';
        flyingImg.style.transform = 'rotate(360deg) scale(0.5)';
      });

      // Cleanup & Header Cart Bounce effect
      setTimeout(() => {
        flyingImg.remove();
        cartIcon.classList.add('cart-bounce');
        setTimeout(() => cartIcon.classList.remove('cart-bounce'), 400);
      }, 800);
    }

    // Add to cart & remove from wishlist
    addToCart(item);
    removeFromWishlist(item.id);
  };

  /* ================= EMPTY WISHLIST ================= */

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-wrapper">
        <Header />

        <main className="wishlist-page">
          <div className="wishlist-content">
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">
                <i className="fa-regular fa-heart"></i>
              </div>

              <span className="wishlist-eyebrow">Personal Vault</span>

              <h2 className="wishlist-empty-title">Your Wishlist is Empty</h2>

              <p className="wishlist-empty-desc">
                Explore our curated catalog of luxury unstitched lawns, festive pret, and signature abayas to bookmark your favourite pieces.
              </p>

              <Link to="/collection" className="wishlist-continue-link empty-btn">
                <span>Explore Collection</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /* ================= WISHLIST WITH PRODUCTS ================= */

  return (
    <div className="wishlist-wrapper">
      <Header />

      <main className="wishlist-page">
        <div className="wishlist-content">

          {/* PAGE HEADER */}
          <div className="wishlist-header">
            <div className="wishlist-header-left">
              <span className="wishlist-eyebrow">⭐ Saved Favourites</span>
              <h1 className="wishlist-title">My Wishlist ({wishlistItems.length})</h1>
              <p className="wishlist-subtitle">
                Your personalized selection of timeless pieces ready for checkout.
              </p>
            </div>

            <Link to="/collection" className="wishlist-continue-link">
              <span>Continue Shopping</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          {/* PRODUCT GRID */}
          <div className="wishlist-grid">
            {wishlistItems.map((item, index) => (
              <div
                className="wishlist-card in-view"
                key={item.id}
                style={{ animationDelay: `${index * 0.07}s` }}
              >

                {/* IMAGE */}
                <div className="wishlist-card-image">
                  <img src={item.image} alt={item.name} />

                  {/* REMOVE BUTTON */}
                  <div className="wishlist-card-actions">
                    <button
                      className="wishlist-remove-icon-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove from Wishlist"
                      aria-label="Remove item"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="wishlist-card-info">
                  <span className="wishlist-card-tag">Khan Couture</span>

                  <h3 className="wishlist-card-name">{item.name}</h3>

                  <div className="wishlist-price-row">
                    <span className="wishlist-card-price">
                      Rs. {typeof item.price === "number" ? item.price.toLocaleString() : item.price}
                    </span>
                  </div>

                  {/* MOVE TO BAG */}
                  <div className="wishlist-card-actions-bar">
                    <button
                      className="wishlist-move-btn"
                      onClick={(e) => handleMoveToCart(e, item)}
                    >
                      <i className="fa-solid fa-bag-shopping"></i>
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>  
  );
};

export default Wishlist;