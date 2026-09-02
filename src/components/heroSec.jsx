import React, { useState, useEffect, useRef } from "react";
import "../style/heroSec.css";

const heroSlides = [
  {
    image: "/img/png2.jpg",
    tag: "New Summer Collection 2026",
    headingMain: "Up to 10%",
    headingHighlight: "off Voucher",
    desc: "Premium Pakistani fashion for every occasion. Elegant abayas, kurtis and dresses.",
    btnText: "Shop Now",
  },
  {
    image: "/img/png2.jpg",
    tag: "Festive Edit",
    headingMain: "Luxury",
    headingHighlight: "Pret",
    desc: "No fuss, effortless looks for every celebration.",
    btnText: "Explore Now",
  },
  {
    image: "/img/png2.jpg",
    tag: "Limited Time",
    headingMain: "Flat 30%",
    headingHighlight: "Off Sale",
    desc: "Grab your favourite pieces before the sale ends.",
    btnText: "Shop Sale",
  },
];

const VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [current, isPaused]);

  // Video ko manually muted aur play karwana - browser autoplay policy ke liye zaroori
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("Video autoplay blocked:", err);
          });
        }
      }
    });
  }, []);

  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % heroSlides.length);

  return (
    <div
      className="hero-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="hero-banner-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroSlides.map((slide, i) => (
          <div className="hero-banner-slide" key={i}>
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              className="hero-banner-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>

            <div className="hero-banner-overlay"></div>

            <div
              className="hero-banner-content"
              key={current === i ? `active-${i}` : i}
            >
              <span className="hero-tag">{slide.tag}</span>
              <h1>
                {slide.headingMain} <span>{slide.headingHighlight}</span>
              </h1>
              <p className="hero-desc">{slide.desc}</p>
              <button className="hero-btn">
                {slide.btnText} <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-banner-dots">
        {heroSlides.map((_, i) => (
          <span
            key={i}
            className={`hero-dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>

      <div className="hero-banner-arrows">
        <button className="hero-arrow" onClick={goPrev}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="hero-arrow" onClick={goNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;