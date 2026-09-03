import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../style/cart.css";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price).replace(/[^0-9]/g, "")) || 0;
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="cart-page-wrapper">
      <Header />

      <main className="cart-page">
        {cartItems.length === 0 ? (
          <section className="cart-empty-state">
            <div className="cart-empty-icon">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <h1 className="cart-empty-title">Your Shopping Bag is Empty</h1>
            <p className="cart-empty-subtitle">
              Explore our latest premium arrivals and add your favorite pieces to the bag.
            </p>
            <Link to="/collection" className="cart-empty-btn">
              Explore Collection
            </Link>
          </section>
        ) : (
          <div className="cart-container">
            <div className="cart-header-title">
              <h1>Shopping Bag</h1>
              <span className="cart-count-badge">
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            <div className="cart-layout-grid">
              {/* Product List Section */}
              <section className="cart-items-list" aria-label="Shopping Bag Items">
                {cartItems.map((item) => (
                  <article className="cart-item-card" key={item.id}>
                    <div className="cart-item-image-wrap">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>

                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <div className="cart-item-info">
                          {item.category && (
                            <span className="cart-item-category">{item.category}</span>
                          )}
                          <h2 className="cart-item-title">{item.name}</h2>
                          {item.size && (
                            <p className="cart-item-meta">
                              <span>Size:</span> {item.size}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from bag`}
                          title="Remove item"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>

                      <div className="cart-item-footer">
                        <div className="quantity-selector">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => handleDecrease(item)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => handleIncrease(item)}
                            aria-label="Increase quantity"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>

                        <div className="cart-item-pricing">
                          <span className="price-label">Total:</span>
                          <span className="price-amount">
                            Rs. {(parsePrice(item.price) * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              {/* Order Summary Sidebar */}
              <aside className="cart-summary-card" aria-label="Order Summary">
                <h2 className="summary-card-title">Order Summary</h2>

                <div className="summary-breakdown">
                  <div className="summary-line-item">
                    <span>Subtotal</span>
                    <span className="summary-value">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="summary-line-item">
                    <span>Estimated Shipping</span>
                    <span className="summary-value free-tag">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="summary-divider" role="separator"></div>

                  <div className="summary-line-item summary-total-line">
                    <span>Grand Total</span>
                    <span className="total-amount">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="summary-actions">
                  <Link to="/checkout" className="btn-primary-checkout">
                    <span>Proceed to Checkout</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>

                  <Link to="/collection" className="btn-secondary-continue">
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Continue Shopping</span>
                  </Link>
                </div>

                <div className="cart-trust-badges">
                  <div className="trust-badge-item">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="trust-badge-item">
                    <i className="fa-solid fa-truck-fast"></i>
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;