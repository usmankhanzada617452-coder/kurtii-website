import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import {
  getAllOrders,
  updateStatus,
  deleteOrder,
  getAllSubscribers,
  getAllMessages,
  getAllProducts,
} from "../services/adminApi";
import "../style/adminDashboard.css";

const statuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [orders, setOrders] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kc_user") || "{}");
    if (!user.role || user.role.toString().toLowerCase() !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const loadOrders = () => {
    setLoading(true);
    getAllOrders()
      .then((res) => setOrders(Array.isArray(res) ? res : res?.data || []))
      .catch((err) => console.error("Orders load error:", err))
      .finally(() => setLoading(false));
  };

  const loadSubscribers = () => {
    setLoading(true);
    getAllSubscribers()
      .then((res) => setSubscribers(Array.isArray(res) ? res : res?.data || []))
      .catch((err) => console.error("Subscribers load error:", err))
      .finally(() => setLoading(false));
  };

  const loadMessages = () => {
    setLoading(true);
    getAllMessages()
      .then((res) => setMessages(Array.isArray(res) ? res : res?.data || []))
      .catch((err) => console.error("Messages load error:", err))
      .finally(() => setLoading(false));
  };

  const loadProducts = () => {
    setLoading(true);
    getAllProducts()
      .then((res) => setProducts(Array.isArray(res) ? res : res?.data || []))
      .catch((err) => console.error("Products load error:", err))
      .finally(() => setLoading(false));
  };

  const openTab = (tab) => {
    setActiveTab(tab);
    if (tab === "orders") loadOrders();
    if (tab === "subscribers") loadSubscribers();
    if (tab === "messages") loadMessages();
    if (tab === "products") loadProducts();
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status);
      loadOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await deleteOrder(id);
      loadOrders();
    } catch (err) {
      alert("Failed to delete order");
    }
  };

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const formatDateTime = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sections = [
    { key: "orders", label: "Orders", icon: "fa-solid fa-box" },
    { key: "products", label: "Products", icon: "fa-solid fa-shirt" },
    { key: "subscribers", label: "Subscribers", icon: "fa-solid fa-envelope" },
    { key: "messages", label: "Contact Messages", icon: "fa-solid fa-comment" },
  ];

  return (
    <div className="admin-wrapper">
      <Header />
      <div className="admin-main">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">Manage your store data</p>

        {!activeTab && (
          <div className="admin-cards-grid">
            {sections.map((s) => (
              <div className="admin-section-card" key={s.key} onClick={() => openTab(s.key)}>
                <i className={s.icon}></i>
                <h3>{s.label}</h3>
                <p>View and manage {s.label.toLowerCase()}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab && (
          <>
            <button className="admin-back-btn" onClick={() => setActiveTab(null)}>
              <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
            </button>

            {loading ? (
              <p className="admin-loading">Loading data...</p>
            ) : (
              <>
                {/* ORDERS TAB */}
                {activeTab === "orders" && (
                  <div className="admin-table-wrap">
                    {orders.length === 0 ? (
                      <p className="admin-empty">No orders found.</p>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Date & Time</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <React.Fragment key={order._id}>
                              <tr>
                                <td>#{order._id?.slice(-8).toUpperCase()}</td>
                                <td>{formatDateTime(order.createdAt)}</td>
                                <td>{order.fullName}</td>
                                <td>{order.email || "—"}</td>
                                <td>{order.phone}</td>
                                <td>{order.address}, {order.city}</td>
                                <td>Rs. {order.totalAmount?.toLocaleString()}</td>
                                <td>
                                  <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                  >
                                    {statuses.map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <button className="admin-view-btn" onClick={() => toggleExpand(order._id)}>
                                    {expandedId === order._id ? "Hide" : "View"} ({order.items?.length || 0})
                                  </button>
                                </td>
                                <td>
                                  <button className="admin-delete-btn" onClick={() => handleDelete(order._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                              {expandedId === order._id && (
                                <tr className="admin-expanded-row">
                                  <td colSpan="10">
                                    <div className="admin-items-list">
                                      {order.items?.map((item, i) => (
                                        <div className="admin-item-card" key={i}>
                                          <img src={item.image} alt={item.name} />
                                          <div className="admin-item-details">
                                            <p className="admin-item-name">{item.name}</p>
                                            <p className="admin-item-meta">
                                              {item.size && `Size: ${item.size} • `}
                                              Qty: {item.quantity} • Rs. {item.price?.toLocaleString()} each
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === "products" && (
                  <div className="admin-table-wrap">
                    {products.length === 0 ? (
                      <p className="admin-empty">No products found.</p>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((p) => (
                            <tr key={p._id}>
                              <td><img src={p.image} alt={p.name} className="admin-product-thumb" /></td>
                              <td>{p.name}</td>
                              <td>{p.category}</td>
                              <td>Rs. {p.price?.toLocaleString()}</td>
                              <td>{p.stock}</td>
                              <td>{p.rating || 0} ({p.reviews || 0})</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* SUBSCRIBERS TAB */}
                {activeTab === "subscribers" && (
                  <div className="admin-table-wrap">
                    {subscribers.length === 0 ? (
                      <p className="admin-empty">No subscribers found.</p>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Subscribed On</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map((s) => (
                            <tr key={s._id}>
                              <td>{s.email}</td>
                              <td>{formatDateTime(s.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* MESSAGES TAB */}
                {activeTab === "messages" && (
                  <div className="admin-table-wrap">
                    {messages.length === 0 ? (
                      <p className="admin-empty">No contact messages found.</p>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {messages.map((m) => (
                            <tr key={m._id}>
                              <td>{m.name}</td>
                              <td>{m.email}</td>
                              <td>{m.phone || "—"}</td>
                              <td>{m.message}</td>
                              <td>{formatDateTime(m.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;