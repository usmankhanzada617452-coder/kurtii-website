import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/heroSec";
import BestSellers from "../components/best-selling-products";
import Sales from "../components/flashSales";
import Category from "../components/category";
import NewArrivals from "../components/new-arrival";
import Testimonials from "../components/testonomial";
import Newsletter from "../components/newsletter";
import Faq from "../components/service";
import BannerHeading from "../components/BannerHeading";
import Footer from "../components/footer";

const Home = ({ allProducts, productsLoading }) => {
  const location = useLocation();

  // Jab bhi URL me #faq hash aaye (footer se ya kahin se bhi), us section
  // tak scroll kar do. Timeout isliye taake page ke baqi sections (images,
  // products) render/settle ho jayein warna scroll position galat ban sakti hai.
  useEffect(() => {
    if (location.hash === "#faq") {
      const el = document.getElementById("faq");
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <div className="home">
      <Header />
      <HeroSection />
      <BannerHeading />
      <Sales allProducts={allProducts} loading={productsLoading} />
      <Category allProducts={allProducts} loading={productsLoading} />
      <BestSellers allProducts={allProducts} loading={productsLoading} />
      <NewArrivals allProducts={allProducts} loading={productsLoading} />
      <Testimonials />
      <Newsletter />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;