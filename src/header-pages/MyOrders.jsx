import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import { getMyOrders } from "../services/orderApi";
import "../style/myOrders.css";

const statusColors = {
  pending: "status-pending",
  confirmed: "status-confirmed",
  processing: "status-processing",
  shipped: "status-shipped",
  delivered: "status-delivered",
  cancelled: "status-cancelled",
};

const MyOrders = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const result = await getMyOrders(email.trim());
      setOrders(result.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="myorders-wrapper">
      <Header />

      <section className="myorders-hero">
        <div className="myorders-hero-content">
          <h1>Track Your Orders</h1>
          <p>Enter the email address you used at checkout to view your order history.</p>
        </div>
      </section>

      <main className="myorders-main">
        <form className="myorders-search-form" onSubmit={handleSearch}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "View My Orders"}
          </button>
        </form>

        {error && <p className="myorders-error">{error}</p>}

        {searched && !loading && !error && orders.length === 0 && (
          <div className="myorders-empty">
            <p>No orders found for this email address.</p>
          </div>
        )}

        {orders.length > 0 && (
          <div className="myorders-list">
            {orders.map((order) => (
              <div className="myorders-card" key={order._id}>
                <div className="myorders-card-header">
                  <div>
                    <p className="myorders-card-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="myorders-card-date">
                      {new Date(order.createdAt).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className={`myorders-status ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="myorders-card-items">
                  {order.items.map((item, i) => (
                    <div className="myorders-item-row" key={i}>
                      <img src={item.image} alt={item.name} />
                      <div className="myorders-item-info">
                        <p className="myorders-item-name">{item.name}</p>
                        <p className="myorders-item-meta">
                          {item.size && `Size: ${item.size} • `}Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="myorders-item-price">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="myorders-card-footer">
                  <span>Delivering to: {order.address}, {order.city}</span>
                  <span className="myorders-total">
                    Total: Rs. {order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyOrders;