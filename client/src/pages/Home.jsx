import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import HeroSlider from "../components/HeroSlider";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data.slice(-4).reverse()); // 🔥 4 latest
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <HeroSlider />

      {/* FEATURED CATEGORIES */}
      <section className="section">
        <h2 className="section-title">Featured Categories</h2>
        <div className="categories">
          <div onClick={() => navigate("/products?category=men")}>Men</div>
          <div onClick={() => navigate("/products?category=women")}>Women</div>
          <div onClick={() => navigate("/products?category=accessories")}>Accessories</div>
          <div onClick={() => navigate("/products")}>New Arrivals</div>
        </div>
      </section>

      {/* WHY SHOP */}
      <section className="section why">
        <h2 className="section-title">Why Shop With Us</h2>
        <div className="why-grid">
          <div className="why-card">🚚 Fast & Reliable Delivery</div>
          <div className="why-card">💳 Secure Payments</div>
          <div className="why-card">💎 Premium Quality</div>
          <div className="why-card">❤️ Customer First</div>
        </div>
      </section>

      {/* LATEST PRODUCTS */}
      <section className="section">
        <h2 className="section-title">Latest Products</h2>

        <div className="products-grid">
          {loading
            ? [...Array(4)].map((_, i) => <div key={i} className="skeleton" />)
            : products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
        </div>

        <div className="center">
          <button onClick={() => navigate("/products")} className="view-all">
            View All Products →
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials">
        <h2 className="section-title">What Customers Say</h2>
        <div className="testimonial">
          <p>
            “Amazing quality and smooth experience with Premium feel.”
          </p>
          <span>   —  Aditya, Bangalore</span>
        </div>
      </section>

      {/* CSS */}
      <style>{`
        .section {
          padding: 50px 20px;
        }

        .section-title {
          font-size: 28px;
          margin-bottom: 25px;
          text-align: center;
        }

        /* Categories */
        .categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          max-width: 900px;
          margin: auto;
        }

        .categories div {
          padding: 30px;
          background: #bbaeae20;
          border-radius: 14px;
          text-align: center;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          
        }

        .categories div:hover {
          transform: translateY(-4px);
          background: #1b1a1aff;
          color: white;
        }

        /* Why */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: auto;
        }

        .why-card {
          padding: 25px;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          text-align: center;
          font-weight: 500;
        }

        /* Products */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 25px;
        }

        .view-all {
          margin-top: 30px;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          background: black;
          color: white;
          cursor: pointer;
          font-size: 15px;
        }

        .center {
          text-align: center;
        }

        /* Skeleton */
        .skeleton {
          height: 300px;
          border-radius: 14px;
          background: linear-gradient(
            90deg,
            #eee 25%,
            #ddd 37%,
            #eee 63%
          );
          animation: shimmer 1.4s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        /* Testimonials */
        .testimonials {
          background: #fafafa;
        }

        .testimonial {
          max-width: 600px;
          margin: auto;
          text-align: center;
          font-style: italic;
        }

        .testimonial span {
          display: block;
          margin-top: 10px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Home;
