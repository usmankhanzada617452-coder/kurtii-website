import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Header.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/wishlistContext";
import { fetchProducts } from "../services/productApi";

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

const quickLinks = [
  { to: "/", label: "New Arrivals" },
  { to: "/", label: "Best Selling" },
  { to: "/", label: "Sale" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/cart", label: "Cart" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (Array.isArray(data)) {
          const unique = [...new Set(data.map((p) => p.category).filter(Boolean))];
          setCategories(unique);
        }
      })
      .catch(() => {});
  }, []);

  const handleCategoryClick = (cat) => {
    setShowCategoryDropdown(false);
    navigate(`/collection?category=${encodeURIComponent(cat)}`);
  };

  return (
    <>
      <header className="header-container">
        {/* ROW 1: Straight Single Line (Logo Left/Center, Nav Links Center, Icons Right) */}
        <div className="header-main-row">
          {/* Mobile Hamburger (Visible only on Mobile) */}
          <div className="mobile-hamburger-wrap">
            <div 
              className={`hamburger ${menuOpen ? "open" : ""}`} 
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            >
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>

          {/* Logo Section */}
          <div className="brand-logo-wrap">
            <NavLink to="/" className="brand-logo">
              <span className="brand-logo-en">Khan Collection</span>
              <span className="brand-logo-tagline">Premium Pakistani Fashion</span>
            </NavLink>
          </div>

          {/* Desktop Navigation Links (Center in Straight Line) */}
          <nav className="desktop-main-nav">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Home
            </NavLink>

            <NavLink
              to="/collection"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Shop
            </NavLink>

            {/* Categories Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setShowCategoryDropdown(true)}
              onMouseLeave={() => setShowCategoryDropdown(false)}
            >
              <span className="nav-dropdown-trigger">
                Categories <i className="fa-solid fa-chevron-down"></i>
              </span>

              {showCategoryDropdown && (
                <div className="nav-dropdown-menu">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <span
                        key={cat}
                        className="nav-dropdown-item"
                        onClick={() => handleCategoryClick(cat)}
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span className="nav-dropdown-item">All Categories</span>
                  )}
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Contact Us
            </NavLink>
          </nav>

          {/* Right Action Icons (Search, Wishlist, Cart) */}
          <div className="header-right-icons">
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <i className="fa-brands fa-sistrix"></i>
            </div>

            <NavLink to="/wishlist" className="icon-btn" title="Wishlist">
              <i className="fa-regular fa-heart"></i>
              {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
            </NavLink>

            <NavLink to="/cart" className="icon-btn" title="Cart">
              <i className="fa-solid fa-bag-shopping"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </div>
        </div>

        {/* ROW 2: Bottom Sub-Nav Line (New Arrivals, Best Selling, Sale, etc.) */}
        <div className="header-bottom-pills-row">
          <div className="quicklinks-inner">
            {quickLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "quicklink-pill active" : "quicklink-pill"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`nav-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Drawer Menu */}
      <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <div className="side-brand-wrap">
            <span className="brand-logo-en side-logo">Khan Collection</span>
            <span className="side-tagline">Premium Fashion</span>
          </div>
          <button className="side-close-btn" onClick={() => setMenuOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav>
          {mainLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          {categories.map((cat) => (
            <NavLink
              key={cat}
              to={`/collection?category=${encodeURIComponent(cat)}`}
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </NavLink>
          ))}
          <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</NavLink>
          <NavLink to="/cart" onClick={() => setMenuOpen(false)}>Cart</NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Header;