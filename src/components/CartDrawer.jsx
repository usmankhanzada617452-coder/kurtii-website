import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/CartDrawer.css";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price).replace(/[^0-9]/g, "")) || 0;
};

const CartDrawer = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    closeCart,
  } = useCart();

  const total =
    cartTotal !== undefined
      ? cartTotal
      : cartItems.reduce(
          (sum, item) => sum + parsePrice(item.price) * item.quantity,
          0
        );

  const handleDecrease = (item) => {
    if (item.quantity > 1 && updateQuantity) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    if (updateQuantity) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  return (
    <>
      <div
        className={`cd-overlay ${isCartOpen ? "open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      ></div>

      <aside className={`cd-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cd-header">
          <div className="cd-header-title">
            <h3>Shopping Bag</h3>
            <span className="cd-badge">{cartItems.length}</span>
          </div>
          <button
            className="cd-close"
            onClick={closeCart}
            aria-label="Close Shopping Bag"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cd-body">
          {cartItems.length === 0 ? (
            <div className="cd-empty-state">
              <div className="cd-empty-icon">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <h4>Your bag is empty</h4>
              <p>Explore our exclusive styles and add your favorite pieces.</p>
              <button className="cd-empty-btn" onClick={closeCart}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cd-items-list">
              {cartItems.map((item) => (
                <article
                  className="cd-item"
                  key={`${item.id}-${item.size || "default"}`}
                >
                  <div className="cd-item-img-wrap">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>

                  <div className="cd-item-details">
                    <div className="cd-item-top">
                      <h4 className="cd-item-name">{item.name}</h4>
                      <button
                        className="cd-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        title="Remove item"
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>

                    {item.size && (
                      <span className="cd-item-size">Size: {item.size}</span>
                    )}

                    <div className="cd-item-bottom">
                      <div className="cd-qty-selector">
                        <button
                          onClick={() => handleDecrease(item)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item)}
                          aria-label="Increase quantity"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>

                      <span className="cd-item-price">
                        Rs. {(parsePrice(item.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cd-footer">
            <div className="cd-summary">
              <div className="cd-summary-row">
                <span>Subtotal</span>
                <span className="cd-total-amount">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
              <p className="cd-shipping-note">
                Shipping and taxes calculated at checkout.
              </p>
            </div>

            <div className="cd-actions">
              <Link
                to="/checkout"
                className="cd-checkout-btn"
                onClick={closeCart}
              >
                <span>Proceed to Checkout</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>

              <Link to="/cart" className="cd-view-cart-link" onClick={closeCart}>
                View Full Bag
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;