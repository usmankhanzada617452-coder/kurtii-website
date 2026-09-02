import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./header-pages/home";
import About from "./header-pages/about";
import Contact from "./header-pages/contact";
import Collection from "./header-pages/collection";
import Cart from "./header-pages/card";
import Wishlist from "./header-pages/Wishlist";
import ProductDetail from "./link-pages/productDetail";
import ProductPage from "./link-pages/product-page";
import Checkout from "./link-pages/checkout";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/wishlistContext";
import CartDrawer from "./components/CartDrawer";
import { fetchProducts } from "./services/productApi";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Failed to load products:", err))
      .finally(() => setProductsLoading(false));
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <ScrollToTop />
        <CartDrawer />
        <Routes>
          <Route
            path="/"
            element={
              <Home allProducts={allProducts} productsLoading={productsLoading} />
            }
          />

          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/buy/:id" element={<ProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;