import React, { useEffect, useState } from "react";
import "../style/service.css";

const services = [
  {
    img: "/img/png7.png",
    fallbackIcon: "fa-solid fa-truck-fast",
    title: "Complimentary Nationwide Delivery",
    desc: "Enjoy free priority delivery on orders above Rs. 5,000.",
  },
  {
    img: "/img/png8.png",
    fallbackIcon: "fa-solid fa-headset",
    title: "Personalized Customer Care",
    desc: "Expert sizing assistance and dedicated support whenever you need it.",
  },
  {
    img: "/img/png9.png",
    fallbackIcon: "fa-solid fa-shield-halved",
    title: "Premium Quality & Easy Returns",
    desc: "100% genuine master threads with hassle-free 30-day money back guarantee.",
  },
];

const Service = () => {
  const [visibleCards, setVisibleCards] = useState({});

  useEffect(() => {
    const cards = document.querySelectorAll(".customer-services-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setVisibleCards((prev) => ({ ...prev, [index]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="customer-services-wrapper">
      <div className="customer-services">
        {services.map((service, i) => (
          <div
            className={`customer-services-card ${visibleCards[i] ? "in-view" : ""}`}
            key={i}
            data-index={i}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="customer-services-card-img">
              {service.img ? (
                <img 
                  src={service.img} 
                  alt={service.title} 
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                />
              ) : null}
              <i className={`${service.fallbackIcon || "fa-solid fa-gem"} service-fallback-icon hidden`}></i>
            </div>
            <h3 className="customer-service-title">{service.title}</h3>
            <p className="customer-service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;