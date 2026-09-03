import React, { useState } from "react";
import "../style/faq.css";

const faqData = [
  {
    question: "How do you guarantee the fabric quality and craftsmanship?",
    answer:
      "Every piece at Khan Collection is crafted from 100% premium grade fabrics and undergoes strict multi-tier quality checks. From thread density to embroidery precision, we ensure long-lasting elegance."
  },
  {
    question: "Do you deliver across Pakistan? What are the delivery charges?",
    answer:
      "Yes, we provide nationwide delivery across all cities in Pakistan. We offer FREE shipping on all orders above Rs. 5,000. For orders below Rs. 5,000, a nominal flat rate of Rs. 250 applies."
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3 to 5 business days for major cities (Karachi, Lahore, Islamabad, etc.) and 5 to 7 business days for remote areas."
  },
  {
    question: "What is your exchange and return policy?",
    answer:
      "We offer a hassle-free 7-day exchange policy. If you receive a damaged product or need a different size, contact our support team with your order details for a seamless replacement."
  },
  {
    question: "Do you offer Cash on Delivery (COD) and international shipping?",
    answer:
      "Yes! Cash on Delivery is available across Pakistan. We also ship worldwide via DHL/FedEx with secure online credit/debit card payments."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        {/* Top Tagline & Main Title */}
        <div className="faq-header">
          <span className="faq-subtag">CUSTOMER SUPPORT</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-title-line"></div>
        </div>

        {/* Accordion List */}
        <div className="faq-list">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? "active" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-bar">
                  <div className="faq-question-left">
                    <span className="faq-icon">
                      <i className="fa-regular fa-circle-question"></i>
                    </span>
                    <h3 className="faq-question-text">{item.question}</h3>
                  </div>
                  <span className={`faq-chevron ${isOpen ? "rotate" : ""}`}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </div>

                <div className="faq-answer-wrapper">
                  <p className="faq-answer-text">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;