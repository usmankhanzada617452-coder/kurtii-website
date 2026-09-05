import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Header.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/wishlistContext";
import { fetchProducts } from "../services/productApi";
import SearchOverlay from "../header-pages/SearchOverlay";

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

const quickLinks = [
  { to: "/collection?filter=newArrival", label: "New Arrivals" },
  { to: "/collection?filter=bestSeller", label: "Best Selling" },
  { to: "/collection?filter=onSale", label: "Sale" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/cart", label: "Cart" },
  { to: "/login", label: "Login" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const unique = [...new Set(data.map((p) => p.category))];
        setCategories(unique);
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
        <div className="header-main-row">
          <div className="mobile-hamburger-wrap">
            <div
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(true)}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>

          <div className="brand-logo-wrap">
            <NavLink to="/" className="brand-logo">
              <span className="brand-logo-en">Khan Collection</span>
              <span className="brand-logo-tagline">
                Premium Pakistani Fashion
              </span>
            </NavLink>
          </div>

          <nav className="desktop-main-nav">
            {mainLinks.slice(0, 2).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setShowCategoryDropdown(true)}
              onMouseLeave={() => setShowCategoryDropdown(false)}
            >
              <span className="nav-dropdown-trigger">
                Categories <i className="fa-solid fa-chevron-down"></i>
              </span>

              {showCategoryDropdown && (
                <div className="nav-dropdown-menu matrix-dropdown">
                  <div className="dropdown-matrix-header">
                    <i className="fa-regular fa-compass"></i>
                    <span>EXPLORE CATEGORY MATRIX</span>
                  </div>

                  <div className="dropdown-matrix-grid">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="nav-dropdown-item matrix-item"
                        onClick={() => handleCategoryClick(cat)}
                      >
                        <span className="matrix-dot"></span>
                        <span className="matrix-label">{cat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mainLinks.slice(2).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-right-icons">
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <NavLink to="/wishlist" className="icon-btn">
              <i className="fa-regular fa-heart"></i>
              {wishlistCount > 0 && (
                <span className="cart-badge">{wishlistCount}</span>
              )}
            </NavLink>

            <NavLink to="/cart" className="icon-btn">
              <i className="fa-solid fa-bag-shopping"></i>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </NavLink>
          </div>
        </div>

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

      <div
        className={`nav-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <div>
            <span className="brand-logo-en side-logo">Khan Collection</span>
            <div className="side-tagline">Premium Pakistani Fashion</div>
          </div>
          <button
            className="side-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <button
          className="mobile-search-trigger"
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(true);
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i> Search Products
        </button>

        <nav>
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
            >
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
          <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>
            Wishlist
          </NavLink>
        </nav>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;