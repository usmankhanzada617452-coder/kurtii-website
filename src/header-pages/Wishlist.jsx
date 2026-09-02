import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/CartContext";
import "../style/Wishlist.css";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is Empty</h2>
        <p>Save items you love by tapping the heart icon on any product.</p>
        <Link to="/collection" className="wishlist-shop-btn">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">My Wishlist ({wishlistItems.length})</h2>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="wishlist-card-info">
              <p className="wishlist-card-name">{item.name}</p>
              <p className="wishlist-card-price">Rs. {item.price}</p>

              <div className="wishlist-card-actions">
                <button
                  className="wishlist-move-btn"
                  onClick={() => handleMoveToCart(item)}
                >
                  Add to Cart
                </button>
                <button
                  className="wishlist-remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;