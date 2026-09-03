import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/productApi";
import "../style/searchOverlay.css";

const popularSearches = [
  "Lawn",
  "Unstitched",
  "Stitched",
  "Kurti",
  "Abaya",
  "Shalwar Kameez",
  "Kurta",
  "Embroidered",
  "Printed",
  "Cotton",
  "Chiffon",
  "Formal",
];

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [suggested, setSuggested] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      fetchProducts()
        .then((data) => setSuggested(data.slice(0, 5)))
        .catch(() => {});
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const goToSearch = (term) => {
    if (!term.trim()) return;
    navigate(`/collection?search=${encodeURIComponent(term.trim())}`);
    setQuery("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToSearch(query);
  };

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-overlay-backdrop" onClick={onClose}></div>

      <div className="search-overlay-panel">
        <div className="search-overlay-header">
          <h2>Search</h2>
          <button className="search-overlay-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form className="search-overlay-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <div className="search-overlay-section">
          <p className="search-overlay-label">Popular Searches</p>
          <div className="search-overlay-pills">
            {popularSearches.map((term) => (
              <span
                key={term}
                className="search-overlay-pill"
                onClick={() => goToSearch(term)}
              >
                {term}
              </span>
            ))}
          </div>
        </div>

        {suggested.length > 0 && (
          <div className="search-overlay-section">
            <p className="search-overlay-label">You Might Be Interested In</p>
            <div className="search-overlay-products">
              {suggested.map((product) => (
                <div
                  key={product._id}
                  className="search-overlay-product"
                  onClick={() => goToProduct(product._id)}
                >
                  <img src={product.image} alt={product.name} />
                  <p className="search-overlay-product-category">{product.category}</p>
                  <p className="search-overlay-product-name">{product.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;