import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import { loginUser } from "../services/authApi";
import "../style/login.css";

const Login = () => {
  const [mode, setMode] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const res = await loginUser(email, password);
    const { token, user } = res.data;

    // Admin tab se sirf admin allow, Customer tab se sirf non-admin allow
    if (mode === "admin" && user.role !== "admin") {
      setError("This account does not have admin access.");
      setLoading(false);
      return;
    }

    if (mode === "customer" && user.role === "admin") {
      setError("Admin accounts should use Admin Login.");
      setLoading(false);
      return;
    }

    localStorage.setItem("kc_token", token);
    localStorage.setItem("kc_user", JSON.stringify(user));

    if (mode === "admin") navigate("/admin-dashboard");
    else navigate("/my-orders");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-wrapper">
      <Header />

      <div className="login-main">
        <div className="login-card">
          <div className="login-logo-circle">KC</div>
          <h1 className="login-brand-name">Khan Collection</h1>
          <p className="login-brand-tagline">Secure Member Portal</p>

          <div className="login-tabs">
            <button
              className={`login-tab ${mode === "customer" ? "active" : ""}`}
              onClick={() => { setMode("customer"); setError(""); }}
            >
              Customer Login
            </button>
            <button
              className={`login-tab ${mode === "admin" ? "active" : ""}`}
              onClick={() => { setMode("admin"); setError(""); }}
            >
              Admin Login
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? "Signing in..." : mode === "admin" ? "Admin Sign In" : "Sign In"}
            </button>
          </form>

          {mode === "customer" && (
            <p className="login-footer-note">
              New here? Your order history links automatically by email —
              just checkout as usual and log in anytime with the same email.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;