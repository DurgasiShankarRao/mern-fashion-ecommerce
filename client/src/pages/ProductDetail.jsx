// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import API from "../services/api"; // ✅ IMPORTANT FIX

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Product detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Loading product...</p>;
  if (!product) return <p style={{ padding: 20 }}>Product not found.</p>;

  const inWish = isInWishlist(product._id);

  const onAddToCart = () => {
    addToCart({ ...product, selectedSize: size, quantity: qty });
  };

  const onBuyNow = () => {
    onAddToCart();
    navigate("/cart");
  };

  const renderStars = (rating = 4.2) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return (
      <div style={{ color: "#f59e0b", display: "inline-block" }}>
        {Array.from({ length: full }).map((_, i) => (
          <span key={i}>★</span>
        ))}
        {half && <span>☆</span>}
      </div>
    );
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </div>

      <div style={styles.right}>
        <h2>{product.name}</h2>

        <div style={{ margin: "8px 0" }}>
          {renderStars(product.rating || 4.2)}
          <span style={{ color: "#666", marginLeft: 8 }}>
            ({product.numReviews || 12} reviews)
          </span>
        </div>

        <h3>₹ {product.price}</h3>
        <p>{product.description}</p>

        <div style={{ marginTop: 12 }}>
          <strong>Size:</strong>
          {["S", "M", "L", "XL"].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                ...styles.sizeBtn,
                background: size === s ? "#111" : "#fff",
                color: size === s ? "#fff" : "#111",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <strong>Quantity:</strong>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)}>+</button>
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
          <button onClick={onAddToCart} style={styles.primaryBtn}>
            Add to Cart
          </button>
          <button onClick={onBuyNow} style={styles.outlineBtn}>
            Buy Now
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            style={styles.wishToggle}
          >
            {inWish ? "♥ Wishlisted" : "♡ Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrap: {
    display: "flex",
    gap: 40,
    padding: 24,
    maxWidth: 1100,
    margin: "0 auto",
  },
  left: { flex: "0 0 480px" },
  image: {
    width: "100%",
    height: 560,
    objectFit: "cover",
    borderRadius: 8,
  },
  right: { flex: 1 },
  sizeBtn: {
    marginLeft: 8,
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  primaryBtn: {
    padding: "10px 18px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },
  outlineBtn: {
    padding: "10px 18px",
    border: "1px solid #111",
    background: "#fff",
    borderRadius: 6,
  },
  wishToggle: {
    padding: "10px 14px",
    borderRadius: 6,
    border: "1px solid #ff3f6c",
    color: "#ff3f6c",
    background: "#fff",
  },
};

export default ProductDetail;
