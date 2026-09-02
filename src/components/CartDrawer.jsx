import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/CartDrawer.css";

const CartDrawer = () => {
  const { cartItems, removeFromCart, cartTotal, isCartOpen, closeCart } = useCart();

  const total =
    cartTotal !== undefined
      ? cartTotal
      : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {isCartOpen && <div className="cd-overlay" onClick={closeCart}></div>}

      <div className={`cd-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cd-header">
          <h3>Your Cart ({cartItems.length})</h3>
          <button className="cd-close" onClick={closeCart}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cd-items">
          {cartItems.length === 0 && (
            <p className="cd-empty">Your cart is empty.</p>
          )}

          {cartItems.map((item) => (
            <div className="cd-item" key={`${item.id}-${item.size}`}>
              <img src={item.image} alt={item.name} />
              <div className="cd-item-info">
                <p className="cd-item-name">{item.name}</p>
                {item.size && <span className="cd-item-size">Size: {item.size}</span>}
                <div className="cd-item-bottom">
                  <span className="cd-item-qty">Qty: {item.quantity}</span>
                  <span className="cd-item-price">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                className="cd-remove"
                onClick={() => removeFromCart(item.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="cd-footer">
            <div className="cd-total-row">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="cd-checkout-btn" onClick={closeCart}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;