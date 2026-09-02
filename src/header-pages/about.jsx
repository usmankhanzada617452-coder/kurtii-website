import React from 'react'
import Header from '../components/Header'
import Footer from '../components/footer';
import '../style/about.css'
const About = () => {
  return (
    <>
    
    <div className="about-container">
      <Header />

      <div className="story-side">
        <div className="story-side-left">
          <h1>Our Story</h1>
          <p>Launced in 2015, Exclusive is South Asia’s premier online shopping <br /> makterplace with an active presense in Bangladesh. Supported <br /> by wide range of tailored marketing, data and service solutions, <br /> Exclusive has 10,500 sallers and 300 brands and serves 3 <br /> millioons customers across the region. </p>
          <p>Exclusive has more than 1 Million products to offer, growing at a <br /> very fast. Exclusive offers a diverse assotment in categories <br /> ranging  from consumer.</p>
        </div>
        <div className="story-side-right">
          <div className="story-side-right-img">
            <img src="./img/png2.jpg" alt="image" />
          </div>
        </div>
      </div>

      <div className="customer-review">
        <div className="cards">
          <div className="cardsimg">
            <img src="/img/png3.png" alt="" />
          </div>
          <h1>10.5K</h1>
          <h3>Sallers active our site</h3>
        </div>
        <div className="cards">
          <div className="cardsimg">
            <img src="/img/png4.png" alt="" />
          </div>
          <h1>33K</h1>
          <h3>Mothly Product Sale</h3>
        </div>
        <div className="cards">
          <div className="cardsimg">
            <img src="/img/png5.png" alt="" />
          </div>
          <h1>45.5K</h1>
          <h3>Customer active our site</h3>
        </div>
        <div className="cards">
          <div className="cardsimg">
            <img src="/img/png6.png" alt="" />
          </div>
          <h1>25K</h1>
          <h3>Annual gross sale in our site</h3>
        </div>
      </div>

      <div className="company-owner">
        <div className="owner-cards">
          <div className="owner-cards-img">
            <img src="/img/png2.jpg" alt="image" />
          </div>
          <h1>Usman Khan</h1>
          <p>Founders and Chairman</p>
        </div>
        <div className="owner-cards">
          <div className="owner-cards-img">
            <img src="/img/png2.jpg" alt="" />
          </div>
          <h1>Usman Khan</h1>
          <p>Managing Director</p>
        </div>
        <div className="owner-cards">
          <div className="owner-cards-img">
            <img src="/img/png2.jpg" alt="" />
          </div>
          <h1>Usman Khan</h1>
          <p>Product and Designer</p>
        </div>
      </div>

      <div className="customer-services">
        
        <div className="customer-services-card">
          <div className="customer-services-card-img">
            <img src="/img/png7.png" alt="" />
          </div>
          <h1>FREE AND FAST DELIVERY</h1>
          <p>Free delivery for all orders above 5000</p>
        </div>

        <div className="customer-services-card">
          <div className="customer-services-card-img">
            <img src="/img/png8.png" alt="" />
          </div>
          <h1>24/7 Customer Service</h1>
          <p>Friendly 24/7 customer support</p>
        </div>

        <div className="customer-services-card">
          <div className="customer-services-card-img">
            <img src="/img/png9.png" alt="" />
          </div>
          <h1>Money Back Guarantee</h1>
          <p>We return money with in 30 days</p>
        </div>
      </div>

      <div className="location">
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.5!2d67.0!3d24.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS2FyYWNoaQ!5e0!3m2!1sen!2spk!4v1"
  width="100%"
  height="300"
  style={{border: 0}}
  allowFullScreen
  loading="lazy"
/>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default About;