import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../style/checkout.css";

const API_URL = "https://kurtii-api.vercel.app/api/orders";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price).replace(/[^0-9]/g, "")) || 0;
};

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [onlineProvider, setOnlineProvider] = useState("easypaisa");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const handleNameChange = (e) => {
    if (e.target.value.length <= 100) setFullName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) setPhone(value);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      return;
    }

    if (phone.length !== 11) {
      setError("Phone number exactly 11 digits ka hona chahiye");
      return;
    }

    setPlacing(true);
    setError("");

    const orderPayload = {
      fullName,
      email,
      phone,
      address,
      city,
      paymentMethod: paymentMethod === "online" ? `Online (${onlineProvider})` : "COD",
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        image: item.image,
        price: parsePrice(item.price),
        quantity: item.quantity,
        size: item.size || "",
      })),
      totalAmount: subtotal,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Order place nahi ho saka");
      }

      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      setError(err.message || "Kuch ghalat ho gaya, dobara try karein");
    } finally {
      setPlacing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page-wrapper">
        <Header />
        <main className="checkout-page">
          <div className="order-success">
            <div className="order-success-icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className="order-success-text">
              <h2>Order Placed Successfully!</h2>
              <p>
                Thank you, <strong>{fullName}</strong>. Your order will be delivered to your address soon
                {paymentMethod === "cod" ? " (Cash on Delivery)." : " (Please transfer payment to given account details)."}
              </p>
            </div>
            <div className="order-success-action">
              <Link to="/" className="continue-link-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page-wrapper">
        <Header />
        <main className="checkout-page">
          <div className="cart-empty">
            <i className="fa-solid fa-bag-shopping empty-cart-icon"></i>
            <p className="cart-empty-title">Your bag is empty</p>
            <p className="cart-empty-text">
              Add something to your bag before checking out.
            </p>
            <Link to="/" className="cart-empty-btn">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page-wrapper">
      <Header />

      <main className="checkout-page">
        <div className="checkout-heading">
          <h1>Checkout</h1>
          <p>Complete your shipping details below</p>
        </div>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          <div className="checkout-form">
            <div className="form-section">
              <h3 className="form-section-title">
                <i className="fa-solid fa-truck-fast"></i> Shipping Details
              </h3>

              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-user input-icon"></i>
                  <input
                    type="text"
                    value={fullName}
                    onChange={handleNameChange}
                    placeholder="Your full name"
                    maxLength={100}
                    required
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-envelope input-icon"></i>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-phone input-icon"></i>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="03XXXXXXXXX"
                      maxLength={11}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <div className="input-with-icon textarea-icon-wrap">
                  <i className="fa-solid fa-location-dot input-icon"></i>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House no, street, area"
                    rows={3}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label>City</label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-city input-icon"></i>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Karachi"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">
                <i className="fa-solid fa-credit-card"></i> Payment Method
              </h3>

              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="payment-option-text">
                    <span className="payment-title">Cash on Delivery</span>
                    <span className="payment-desc">Pay cash upon delivery to your address</span>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === "online" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  <div className="payment-option-text">
                    <span className="payment-title">Online Payment</span>
                    <span className="payment-desc">EasyPaisa / JazzCash Mobile Account</span>
                  </div>
                </label>
              </div>

              {/* Online Payment Options Slide Box */}
              {paymentMethod === "online" && (
                <div className="online-payment-slide">
                  <div className="provider-selector">
                    <button
                      type="button"
                      className={`provider-btn ${onlineProvider === "easypaisa" ? "active" : ""}`}
                      onClick={() => setOnlineProvider("easypaisa")}
                    >
                      EasyPaisa
                    </button>
                    <button
                      type="button"
                      className={`provider-btn ${onlineProvider === "jazzcash" ? "active" : ""}`}
                      onClick={() => setOnlineProvider("jazzcash")}
                    >
                      JazzCash
                    </button>
                  </div>

                  <div className="account-details-box">
                    <p className="acc-info-title">
                      Send payment to this {onlineProvider === "easypaisa" ? "EasyPaisa" : "JazzCash"} Account:
                    </p>
                    <div className="acc-detail-row">
                      <span>Account Title:</span>
                      <strong>Khan Collection</strong>
                    </div>
                    <div className="acc-detail-row">
                      <span>Account Number:</span>
                      <strong>{onlineProvider === "easypaisa" ? "0300 1234567" : "0312 9876543"}</strong>
                    </div>
                    <p className="acc-note">
                      *Please transfer <strong>Rs. {subtotal.toLocaleString()}</strong> and save the receipt screenshot for confirmation.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="form-error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="cart-summary checkout-summary">
            <h3 className="summary-label">
              <i className="fa-solid fa-receipt"></i> Order Summary
            </h3>

            <div className="checkout-summary-items">
              {cartItems.map((item) => (
                <div className="checkout-summary-item" key={item.id}>
                  <div className="item-name-qty">
                    <span>{item.name}</span>
                    <small>Qty: {item.quantity}</small>
                  </div>
                  <span className="item-price">
                    Rs. {(parsePrice(item.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-tag">FREE</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="checkout-actions">
              <button type="submit" className="checkout-btn" disabled={placing}>
                {placing ? "Placing Order..." : "Place Order"}
              </button>
              <Link to="/cart" className="continue-link">
                <i className="fa-solid fa-arrow-left"></i> Back to Cart
              </Link>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;