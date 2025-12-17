import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">✨ Fashion • Comfort • Confidence</span>
          <h1>FASHORA</h1>
          <p className="tagline">Redefining Everyday Style</p>
          <p className="hero-text">
            A contemporary fashion hub for stylish, affordable, and quality wear.
          </p>

          <div className="hero-actions">
            <button onClick={() => navigate("/")}>Explore Store</button>
            <button
              className="outline"
              onClick={() => navigate("/profile/help")}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="hero-glow" />
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="section">
        <h2>Who We Are</h2>
        <p>
          Fashora is a modern e-commerce fashion platform built to make style
          accessible for everyone. We focus on simplicity, quality, and a smooth
          shopping experience — without unnecessary complexity.
        </p>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="section grid">
        <div className="card">
          <h3>🎯 Our Mission</h3>
          <p>
            To deliver fashionable, affordable clothing with a seamless digital
            shopping experience.
          </p>
        </div>
        <div className="card">
          <h3>🚀 Our Vision</h3>
          <p>
            To become a trusted online fashion brand powered by technology and
            customer-first thinking.
          </p>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="section">
        <h2>What We Offer</h2>
        <ul className="list">
          <li>👕 Trendy Men & Women Fashion</li>
          <li>👜 Accessories & Essentials</li>
          <li>💰 Affordable Pricing</li>
          <li>🚚 Smooth Shopping Experience</li>
        </ul>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="section">
        <h2>Why Choose Us</h2>
        <div className="grid">
          <div className="card">✔ Quality-first products</div>
          <div className="card">✔ Secure shopping</div>
          <div className="card">✔ Easy cart & wishlist</div>
          <div className="card">✔ Modern UI & UX</div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats">
        <div>
          <h3>10K+</h3>
          <p>Happy Users</p>
        </div>
        <div>
          <h3>500+</h3>
          <p>Products</p>
        </div>
        <div>
          <h3>98%</h3>
          <p>Satisfaction</p>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="section">
        <h2>Tech Behind SBFashion</h2>
        <div className="tech">
          <span>⚛ React</span>
          <span>🧠 Context API</span>
          <span>🛣 React Router</span>
          <span>🎨 Modern CSS</span>
          <span>⚡ Vite</span>
        </div>
      </section>

      {/* ================= AUTHOR ================= */}
      <section className="section author">
        <h2>Built By</h2>
        <p className="author-name">👨‍💻 Durgasi Sankar Rao</p>
        <p>Engineering Student (ECE)</p>
        <p>📧 shankarrao4038@gmail.com</p>
        <p>📞 +91 96684 87554</p>
        <p className="author-note">
          Built with passion to demonstrate real-world full-stack e-commerce
          workflows.
        </p>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <h2>Need Help?</h2>
        <p>Our support team is always here for you.</p>
        <button onClick={() => navigate("/profile/help")}>
          Contact Support
        </button>
      </section>

      {/* ================= POLICIES ================= */}
      <section className="policies">
        <p>📄 Terms & Conditions</p>
        <p>🔐 Privacy Policy</p>
        <p>↩ Refund Policy</p>
      </section>

      {/* ================= CSS ================= */}
<style>{`
  * {
    box-sizing: border-box;
  }

  body {
    background: #fafafa;
  }

  .about-container {
    max-width: 1100px;
    margin: auto;
    padding: 24px;
    font-family: "Inter", sans-serif;
  }

  /* ================= HERO ================= */
  .hero {
    position: relative;
    overflow: hidden;
    border-radius: 22px;
    background: linear-gradient(135deg, #111, #000);
    color: white;
    padding: 90px 48px;
    margin-bottom: 80px;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 620px;
  }

  .hero-badge {
    display: inline-block;
    background: rgba(255,255,255,0.14);
    padding: 7px 16px;
    border-radius: 30px;
    font-size: 13px;
    margin-bottom: 18px;
    letter-spacing: 0.4px;
  }

  .hero h1 {
    font-size: 56px;
    margin-bottom: 12px;
    font-weight: 800;
  }

  .tagline {
    font-size: 20px;
    font-weight: 500;
    color: #e5e5e5;
  }

  .hero-text {
    margin-top: 18px;
    line-height: 1.7;
    color: #d1d1d1;
    font-size: 16px;
  }

  .hero-actions {
    margin-top: 28px;
    display: flex;
    gap: 16px;
  }

  .hero-actions button {
    padding: 13px 22px;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .hero-actions button:hover {
    transform: translateY(-3px);
  }

  .hero-actions .outline {
    background: transparent;
    color: white;
    border: 1px solid rgba(255,255,255,0.4);
  }

  .hero-glow {
    position: absolute;
    right: -140px;
    top: -140px;
    width: 340px;
    height: 340px;
    background: radial-gradient(circle, #ff3f6c, transparent 70%);
    opacity: 0.35;
  }

  /* ================= SECTIONS ================= */
  .section {
    margin: 80px 0;
  }

  .section h2 {
    font-size: 30px;
    margin-bottom: 16px;
    font-weight: 700;
  }

  .section p {
    color: #555;
    line-height: 1.75;
    font-size: 16px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
  }

  .card {
    padding: 26px;
    border-radius: 18px;
    background: white;
    border: 1px solid #eee;
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.08);
  }

  .list li {
    margin-bottom: 12px;
    font-size: 16px;
  }

  /* ================= STATS (DO NOT CHANGE DESIGN) ================= */
  .stats {
    display: flex;
    justify-content: space-around;
    text-align: center;
    background: linear-gradient(135deg, #111, #000);
    color: white;
    padding: 48px;
    border-radius: 22px;
  }

  .stats h3 {
    font-size: 34px;
    font-weight: 800;
  }

  /* ================= TECH ================= */
  .tech {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  .tech span {
    padding: 10px 18px;
    background: #f2f2f2;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 500;
  }

  /* ================= AUTHOR ================= */
  .author {
    text-align: center;
    background: white;
    padding: 48px;
    border-radius: 22px;
    border: 1px solid #eee;
  }

  .author-name {
    font-size: 24px;
    font-weight: 800;
  }

  .author-note {
    margin-top: 12px;
    color: #666;
    font-size: 15px;
  }

  /* ================= CTA ================= */
  .cta {
    text-align: center;
    padding: 56px;
    background: #000;
    color: white;
    border-radius: 22px;
  }

  .cta button {
    margin-top: 20px;
    padding: 14px 26px;
    background: white;
    color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
  }

  /* ================= POLICIES ================= */
  .policies {
    margin-top: 48px;
    display: flex;
    justify-content: center;
    gap: 22px;
    color: #777;
    font-size: 14px;
  }

  /* ================= MOBILE ================= */
  @media (max-width: 768px) {
    .hero {
      padding: 64px 28px;
    }

    .hero h1 {
      font-size: 42px;
    }

    .stats {
      flex-direction: column;
      gap: 28px;
    }
  }
`}</style>
    </div>
  );
}
