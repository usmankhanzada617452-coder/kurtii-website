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
  createProduct,
  updateProduct,
  deleteProduct,
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

  // Product Form Modal States
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    image: "",
    stock: "",
    sku: "",
    isNewArrival: false,
    onSale: false,
    bestSeller: false,
  });

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

  // Product Actions
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      image: "",
      stock: "",
      sku: "",
      isNewArrival: false,
      onSale: false,
      bestSeller: false,
    });
    setShowProductForm(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      originalPrice: product.originalPrice || "",
      category: product.category || "",
      image: product.image || "",
      stock: product.stock || "",
      sku: product.sku || "",
      isNewArrival: product.isNewArrival || false,
      onSale: product.onSale || false,
      bestSeller: product.bestSeller || false,
    });
    setShowProductForm(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      stock: Number(productForm.stock),
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
      } else {
        await createProduct(payload);
      }
      setShowProductForm(false);
      loadProducts();
    } catch (err) {
      alert("Failed to save product: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const sections = [
    { key: "orders", label: "Orders", icon: "fa-solid fa-box" },
    { key: "products", label: "Products", icon: "fa-solid fa-shirt" },
    { key: "subscribers", label: "Subscribers", icon: "fa-solid fa-envelope" },
    { key: "messages", label: "Messages", icon: "fa-solid fa-comment" },
  ];

  return (
    <div className="admin-wrapper">
      <Header />
      <div className="admin-main">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">Spreadsheet Records for Khan Collection</p>

        {!activeTab && (
          <div className="admin-cards-grid">
            {sections.map((s) => (
              <div className="admin-section-card" key={s.key} onClick={() => openTab(s.key)}>
                <i className={s.icon}></i>
                <h3>{s.label}</h3>
                <p>Manage store {s.label.toLowerCase()}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab && (
          <>
            <button className="admin-back-btn" onClick={() => setActiveTab(null)}>
              <i className="fa-solid fa-arrow-left"></i> Back to Navigation
            </button>

            {loading ? (
              <p>Loading records...</p>
            ) : (
              <>
                {/* ORDERS TAB */}
                {activeTab === "orders" && (
                  <div className="admin-table-wrap">
                    {orders.length === 0 ? (
                      <p style={{ padding: 16 }}>No orders found.</p>
                    ) : (
                      <table className="excel-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Date & Time</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address & City</th>
                            <th>Amount</th>
                            <th>Order Status</th>
                            <th>Items</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, idx) => (
                            <React.Fragment key={order._id}>
                              <tr>
                                <td data-label="#">{idx + 1}</td>
                                <td data-label="Order ID" style={{ fontWeight: 600 }}>#{order._id?.slice(-8).toUpperCase()}</td>
                                <td data-label="Date & Time">{formatDateTime(order.createdAt)}</td>
                                <td data-label="Customer">{order.fullName || order.customerName || "—"}</td>
                                <td data-label="Email">{order.email || "—"}</td>
                                <td data-label="Phone">{order.phone || "—"}</td>
                                <td data-label="Address">{order.address ? `${order.address}${order.city ? `, ${order.city}` : ""}` : "—"}</td>
                                <td data-label="Amount">Rs. {order.totalAmount?.toLocaleString()}</td>
                                <td data-label="Order Status">
                                  <select
                                    className={`excel-select status-${(order.status || 'pending').toLowerCase()}`}
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                  >
                                    {statuses.map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                </td>
                                <td data-label="Items">
                                  <button className="excel-btn-view" onClick={() => toggleExpand(order._id)}>
                                    {expandedId === order._id ? "Hide" : "View"} ({order.items?.length || 0})
                                  </button>
                                </td>
                                <td data-label="Action">
                                  <button className="excel-btn-delete" onClick={() => handleDelete(order._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                              {expandedId === order._id && (
                                <tr className="excel-expanded-row">
                                  <td colSpan="11">
                                    <div className="excel-items-grid">
                                      {order.items?.map((item, i) => (
                                        <div className="excel-item-card" key={i}>
                                          <img src={item.image} alt={item.name} />
                                          <div>
                                            <div style={{ fontWeight: 600, fontSize: 12 }}>{item.name}</div>
                                            <div style={{ fontSize: 11, color: "#666" }}>
                                              {item.size && `Size: ${item.size} | `}Qty: {item.quantity} | Rs. {item.price?.toLocaleString()}
                                            </div>
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
                    <div style={{ padding: "10px 12px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                      <button className="admin-add-btn" onClick={openAddProduct} style={{ margin: 0 }}>
                        <i className="fa-solid fa-plus"></i> Add New Product
                      </button>
                    </div>

                    {products.length === 0 ? (
                      <p style={{ padding: 16 }}>No products found.</p>
                    ) : (
                      <table className="excel-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Rating</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((p, idx) => (
                            <tr key={p._id}>
                              <td data-label="#">{idx + 1}</td>
                              <td data-label="Image"><img src={p.image} alt={p.name} className="excel-product-thumb" /></td>
                              <td data-label="Product Name" style={{ fontWeight: 600 }}>{p.name}</td>
                              <td data-label="Category">{p.category}</td>
                              <td data-label="Price">Rs. {p.price?.toLocaleString()}</td>
                              <td data-label="Stock">{p.stock}</td>
                              <td data-label="Rating">{p.rating || 0} ({p.reviews || 0})</td>
                              <td data-label="Actions">
                                <div className="admin-actions-wrap">
                                  <button className="excel-btn-edit" onClick={() => openEditProduct(p)}>
                                    <i className="fa-solid fa-pen"></i>
                                  </button>
                                  <button className="excel-btn-delete" onClick={() => handleDeleteProduct(p._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </div>
                              </td>
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
                      <p style={{ padding: 16 }}>No subscribers found.</p>
                    ) : (
                      <table className="excel-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Subscriber Email</th>
                            <th>Subscription Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map((s, idx) => (
                            <tr key={s._id}>
                              <td data-label="#">{idx + 1}</td>
                              <td data-label="Subscriber Email">{s.email}</td>
                              <td data-label="Subscription Date">{formatDateTime(s.createdAt)}</td>
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
                      <p style={{ padding: 16 }}>No contact messages found.</p>
                    ) : (
                      <table className="excel-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {messages.map((m, idx) => (
                            <tr key={m._id}>
                              <td data-label="#">{idx + 1}</td>
                              <td data-label="Name" style={{ fontWeight: 600 }}>{m.name}</td>
                              <td data-label="Email">{m.email}</td>
                              <td data-label="Phone">{m.phone || "—"}</td>
                              <td data-label="Message">{m.message}</td>
                              <td data-label="Date">{formatDateTime(m.createdAt)}</td>
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

      {/* PRODUCT FORM MODAL */}
      {showProductForm && (
        <div className="account-overlay">
          <div className="account-overlay-backdrop" onClick={() => setShowProductForm(false)}></div>
          <div className="product-form-panel">
            <button className="account-overlay-close" onClick={() => setShowProductForm(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h3 style={{ margin: "0 0 16px 0", fontSize: 16 }}>{editingProduct ? "Edit Product" : "Add Product"}</h3>

            <form onSubmit={handleProductSubmit} className="product-form">
              <input
                placeholder="Product Name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                required
              />

              <textarea
                placeholder="Description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                required
              />

              <div className="product-form-row">
                <input
                  type="number"
                  placeholder="Price"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Original Price"
                  value={productForm.originalPrice}
                  onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                />
              </div>

              <input
                placeholder="Category"
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                required
              />

              <input
                placeholder="Image URL"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                required
              />

              <div className="product-form-row">
                <input
                  type="number"
                  placeholder="Stock"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  required
                />
                <input
                  placeholder="SKU"
                  value={productForm.sku}
                  onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                  required
                />
              </div>

              <div className="product-form-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={productForm.isNewArrival}
                    onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                  />
                  New Arrival
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={productForm.onSale}
                    onChange={(e) => setProductForm({ ...productForm, onSale: e.target.checked })}
                  />
                  On Sale
                </label>
              </div>

              <button type="submit" className="product-form-submit">
                {editingProduct ? "Update Product" : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;