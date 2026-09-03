import React from "react";
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
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <Sales allProducts={allProducts} loading={productsLoading} />
      <Category allProducts={allProducts} loading={productsLoading} />
      <BestSellers allProducts={allProducts} loading={productsLoading} />
      <NewArrivals allProducts={allProducts} loading={productsLoading} />
      <Testimonials />
      <Newsletter />
      <Faq />
      <BannerHeading />
      <Footer />
    </div>
  );
};

export default Home;