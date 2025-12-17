import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import API from "../services/api";

export default function SearchPage() {
  const location = useLocation();

  const query =
    new URLSearchParams(location.search).get("q") ||
    localStorage.getItem("lastSearch") ||
    "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceRef = useRef(null);

  // ------------------------------------
  // 🔁 PRESERVE LAST SEARCH
  // ------------------------------------
  useEffect(() => {
    if (query.trim()) {
      localStorage.setItem("lastSearch", query);
    }
  }, [query]);

  // ------------------------------------
  // 🔍 DEBOUNCED SEARCH (URL BASED)
  // ------------------------------------
  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await API.get(
          `/api/products/search?q=${encodeURIComponent(query)}`
        );

        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // ------------------------------------
  // 🎯 HIGHLIGHT MATCHED TEXT
  // ------------------------------------
  const highlightText = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "ig");
    return text.replace(regex, `<mark>$1</mark>`);
  };

  return (
    <div className="search-page">
      <h2 className="search-title">
        Search results for <span>"{query}"</span>
      </h2>

      {/* STATUS */}
      {loading && <p className="status">🔍 Searching products...</p>}
      {!loading && error && <p className="status error">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="status">❌ No products found</p>
      )}

      {/* RESULTS */}
      <div className="search-grid">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="search-card"
          >
            <img src={product.image} alt={product.name} />
            <div className="card-body">
              <h3
                dangerouslySetInnerHTML={{
                  __html: highlightText(product.name),
                }}
              />
              <p className="price">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* STYLES */}
      <style>{`
        .search-page {
          padding: 30px 14px;
        }

        .search-title {
          font-size: 1.6rem;
          margin-bottom: 24px;
        }

        .search-title span {
          color: #ff4d6d;
        }

        .status {
          text-align: center;
          margin-top: 30px;
          color: #555;
        }

        .status.error {
          color: red;
        }

        .search-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 22px;
          margin-top: 30px;
        }

        .search-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: #000;
          box-shadow: 0 8px 22px rgba(0,0,0,0.1);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .search-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }

        .search-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .card-body {
          padding: 14px;
          text-align: center;
        }

        .card-body h3 {
          font-size: 1rem;
          margin-bottom: 6px;
        }

        .card-body mark {
          background: #000;
          color: #fff;
          padding: 0 4px;
          border-radius: 4px;
        }

        .price {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
