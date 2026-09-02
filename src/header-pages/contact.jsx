import React, { useState } from "react";
import "../style/contact.css";
import Header from "../components/Header";
import Footer from "../components/footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || phone.length < 11) {
      alert("Please fill all fields!");
      return;
    }
    console.log({ name, email, phone, message });
    alert("Message sent!");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <>
      <Header />
      <div className="contact-container">
        <div className="contact-left">
          <div className="contact-info-card">
            <div className="contact-icon">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div>
              <h3>Call To Us</h3>
              <p>We are available 24/7, 7 days a week</p>
              <p>Phone: +92 300 0000000</p>
            </div>
          </div>

          <div className="contact-divider"></div>

          <div className="contact-info-card">
            <div className="contact-icon">
              <i className="fa-regular fa-envelope"></i>
            </div>
            <div>
              <h3>Write To Us</h3>
              <p>Fill out our form and we will contact you within 24 hours</p>
              <p>info@khancollection.pk</p>
              <p>support@khancollection.pk</p>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="input-line"></span>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="input-line"></span>
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <span className="input-line"></span>
              </div>
            </div>

            <div className="input-group textarea-group">
              <textarea
                placeholder="Your Message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <span className="input-line"></span>
            </div>

            <div className="form-btn-row">
              <button type="submit" className="send-btn">
                Send Message
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
