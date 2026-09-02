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
          <div className="cart-empty">
            <p className="cart-empty-title">Your Bag is Empty</p>
            <p className="cart-empty-text">
              Looks like you haven't found your favourite piece yet.
            </p>
            <Link to="/" className="cart-empty-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <p className="cart-label">Your Bag ({cartItems.length})</p>

            <div className="cart-layout">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-row" key={item.id}>
                    <div className="cart-row-img">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-row-details">
                      <div className="cart-row-info">
                        <h3 className="cart-row-name">{item.name}</h3>
                        {item.size && (
                          <p className="cart-row-size">Size: {item.size}</p>
                        )}
                      </div>

                      <div className="cart-row-controls">
                        <div className="cart-qty-control">
                          <button onClick={() => handleDecrease(item)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncrease(item)}>+</button>
                        </div>

                        <div className="cart-row-price">
                          Rs. {(parsePrice(item.price) * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <button
                      className="cart-row-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <p className="summary-label">Order Summary</p>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>

                <Link to="/checkout" className="checkout-btn">
                  Proceed to Checkout
                </Link>

                <Link to="/" className="continue-link">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;