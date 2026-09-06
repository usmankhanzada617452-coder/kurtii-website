import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import { loginUser } from "../services/authApi";
import "../style/login.css";

const Login = () => {
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

      if (user.role !== "admin") {
        setError("This account does not have admin access.");
        setLoading(false);
        return;
      }

      localStorage.setItem("kc_token", token);
      localStorage.setItem("kc_user", JSON.stringify(user));
      navigate("/admin-dashboard");
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
          <p className="login-brand-tagline">Admin Portal</p>

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
              {loading ? "Signing in..." : "Admin Sign In"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;