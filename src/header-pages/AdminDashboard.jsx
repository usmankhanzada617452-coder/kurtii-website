import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import { getAllOrders, updateStatus, deleteOrder } from "../services/adminApi";
import "../style/adminDashboard.css";

const statuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kc_user") || "{}");
    if (user.role !== "admin") {
      navigate("/login");
      return;
    }
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getAllOrders()
      .then((res) => setOrders(res.data))
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (id, status) => {
    await updateStatus(id, status);
    loadOrders();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    await deleteOrder(id);
    loadOrders();
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="admin-wrapper">
      <Header />
      <div className="admin-main">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">{orders.length} total orders</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="admin-table-wrap">
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
                      <td data-label="Order ID">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>
                      <td data-label="Date & Time">
                        {formatDateTime(order.createdAt)}
                      </td>
                      <td data-label="Customer">{order.fullName}</td>
                      <td data-label="Email">{order.email || "—"}</td>
                      <td data-label="Phone">{order.phone}</td>
                      <td data-label="Address">
                        {order.address}, {order.city}
                      </td>
                      <td data-label="Total">
                        Rs. {order.totalAmount.toLocaleString()}
                      </td>
                      <td data-label="Status">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td data-label="Items">
                        <button
                          className="admin-view-btn"
                          onClick={() => toggleExpand(order._id)}
                        >
                          {expandedId === order._id ? "Hide" : "View"} (
                          {order.items.length})
                        </button>
                      </td>
                      <td data-label="Action">
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(order._id)}
                          aria-label="Delete order"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>

                    {expandedId === order._id && (
                      <tr className="admin-expanded-row">
                        <td colSpan="10">
                          <div className="admin-items-list">
                            {order.items.map((item, i) => (
                              <div className="admin-item-card" key={i}>
                                <img src={item.image} alt={item.name} />
                                <div className="admin-item-details">
                                  <p className="admin-item-name">{item.name}</p>
                                  <p className="admin-item-meta">
                                    {item.size && `Size: ${item.size} • `}
                                    Qty: {item.quantity} • Rs.{" "}
                                    {item.price.toLocaleString()} each
                                    {item.quantity > 1 &&
                                      ` (Total: Rs. ${(
                                        item.price * item.quantity
                                      ).toLocaleString()})`}
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
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;