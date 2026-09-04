import React, { useState } from "react";
import "../style/contact.css";
import Header from "../components/Header";
import Footer from "../components/footer";
import { sendContactMessage } from "../context/contactApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setStatusMsg({
        type: "error",
        text: "Please fill out all fields before submitting.",
      });
      return;
    }

    if (phone.replace(/\D/g, "").length < 10) {
      setStatusMsg({
        type: "error",
        text: "Please enter a valid phone number.",
      });
      return;
    }

    setLoading(true);

    try {
      await sendContactMessage(formData);
      setStatusMsg({
        type: "success",
        text: "Thank you! Your message has been sent successfully.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg({ type: "", text: "" }), 5000);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <Header />

      <section className="contact-hero">
        <div className="hero-content">
          <span className="hero-subtitle">We Are Here For You</span>
          <h1 className="hero-title">Get In Touch</h1>
          <p className="hero-description">
            Have a question about our boutique collection or need custom
            assistance? Reach out to us—we'd love to hear from you.
          </p>
        </div>
      </section>

      <main className="contact-main">
        <div className="contact-container">
          <div className="contact-info-section">
            <div className="info-card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="info-text">
                <h3>Call Us Directly</h3>
                <p className="info-sub">Available 7 days a week, 9 AM - 9 PM</p>
                <a href="tel:+923000000000" className="info-link">
                  +92 300 0000000
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrapper">
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div className="info-text">
                <h3>Write To Us</h3>
                <p className="info-sub">
                  Send us an email and we'll reply within 24 hours
                </p>
                <a href="mailto:info@khancollection.pk" className="info-link">
                  info@khancollection.pk
                </a>
                <a href="mailto:support@khancollection.pk" className="info-link">
                  support@khancollection.pk
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="info-text">
                <h3>Visit Our Store</h3>
                <p className="info-sub">Experience luxury fashion in person</p>
                <p className="info-link-static">Main Boulevard, Lahore, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="form-card">
              <h2>Send Us A Message</h2>
              <p className="form-desc">
                Fill out the form below and our team will get back to you
                shortly.
              </p>

              {statusMsg.text && (
                <div className={`status-alert ${statusMsg.type}`}>
                  {statusMsg.type === "error" ? (
                    <i className="fa-solid fa-circle-exclamation"></i>
                  ) : (
                    <i className="fa-solid fa-circle-check"></i>
                  )}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="name">Full Name *</label>
                    <span className="input-highlight"></span>
                  </div>

                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Email Address *</label>
                    <span className="input-highlight"></span>
                  </div>

                  <div className="input-group">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <label htmlFor="phone">Phone Number *</label>
                    <span className="input-highlight"></span>
                  </div>
                </div>

                <div className="input-group textarea-group">
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="message">Your Message *</label>
                  <span className="input-highlight"></span>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;