import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/category.css";

const categoryImages = {
  "Unstitched Suits": "/img/png2.jpg",
  "Stitched Kurtis": "/img/png2.jpg",
  "Abayas": "/img/png2.jpg",
  "Shalwar Kameez": "/img/png2.jpg",
  "Kurta": "/img/png2.jpg",
};

const Category = ({ allProducts, loading }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 10) {
        // End tak pahunch gaye, wapas start pe jao
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const scrollCarousel = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  };

  const counts = {};
  allProducts.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  const categories = Object.keys(counts).map((name) => ({
    name,
    products: counts[name],
    img: categoryImages[name] || "/img/png2.jpg",
  }));

  if (loading || categories.length === 0) {
    return <div className="category-container" ref={sectionRef}></div>;
  }

  return (
    <div className="category-container" ref={sectionRef}>
      <h1 className="category-heading-center">Shop By Category</h1>

      <div className="category-scroll-wrapper">
        <button className="category-arrow-side left" onClick={() => scrollCarousel("left")}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div className={`category-productCard ${visible ? "animate-in" : ""}`} ref={scrollRef}>
          {categories.map((cat, i) => (
            <React.Fragment key={cat.name}>
              <div
                className="cards"
                style={{ transitionDelay: `${i * 0.08}s` }}
                onClick={() => navigate(`/collection?category=${encodeURIComponent(cat.name)}`)}
              >
                <div className="cards-img">
                  <img src={cat.img} alt={cat.name} />
                </div>
                <h1>{cat.name}</h1>
              </div>

              {i === Math.floor(categories.length / 2) - 1 && categories.length > 3 && (
                <div className="category-divider"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <button className="category-arrow-side right" onClick={() => scrollCarousel("right")}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Category;