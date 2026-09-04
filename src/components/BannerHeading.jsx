import React from "react";
import "../style/BannerHeading.css";

const badges = [
  "🚚 Free delivery on orders above Rs. 5,000",
  "💵 Cash on Delivery Available",
  "⭐ 100% Original Quality Guaranteed",
  "🔄 Easy 7-Day Returns",
];

function BannerHeading() {
  // content ko 2 baar duplicate kar rahe hain taake seamless infinite loop bane
  const marqueeContent = [...badges, ...badges];

  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        {marqueeContent.map((text, index) => (
          <span className="marquee-item" key={index}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BannerHeading;