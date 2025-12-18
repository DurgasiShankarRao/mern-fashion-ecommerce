// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M"); // default size
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProduct = async () => {
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
    // Add product to cart with size & qty meta
    addToCart({ ...product, selectedSize: size, quantity: qty });
    // optionally feedback toast later
  };

  const onBuyNow = () => {
    onAddToCart();
    navigate("/cart");
  };

  // Simple star rendering from product.rating (if present)
  const renderStars = (rating = 4.2) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return (
      <div style={{ color: "#f59e0b", display: "inline-block" }}>
        {Array.from({ length: full }).map((_, i) => <span key={i}>★</span>)}
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
        <h2 style={{ marginTop: 0 }}>{product.name}</h2>

        <div style={{ margin: "8px 0" }}>
          {renderStars(product.rating || 4.2)}{" "}
          <span style={{ color: "#666", marginLeft: 8 }}>
            ({product.numReviews || 12} reviews)
          </span>
        </div>

        <h3 style={{ color: "#111" }}>₹ {product.price}</h3>

        <p style={{ color: "#444" }}>{product.description}</p>

        <div style={{ marginTop: 12 }}>
          <strong>Size: </strong>
          {["S", "M", "L", "XL"].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                ...styles.sizeBtn,
                borderColor: size === s ? "#111" : "#ddd",
                background: size === s ? "#111" : "#fff",
                color: size === s ? "#fff" : "#111",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <strong>Quantity: </strong>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={styles.qtyBtn}>-</button>
            <div style={{ minWidth: 28, textAlign: "center" }}>{qty}</div>
            <button onClick={() => setQty((q) => q + 1)} style={styles.qtyBtn}>+</button>
          </div>
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
          <button onClick={onAddToCart} style={styles.primaryBtn}>Add to Cart</button>
          <button onClick={onBuyNow} style={styles.outlineBtn}>Buy Now</button>

          <button
            onClick={() => toggleWishlist(product)}
            style={{
              ...styles.wishToggle,
              background: inWish ? "#ff3f6c" : "#fff",
              color: inWish ? "#fff" : "#ff3f6c",
              border: "1px solid #ff3f6c",
            }}
          >
            {inWish ? "♥ Wishlisted" : "♡ Add to Wishlist"}
          </button>
        </div>

        <div style={{ marginTop: 18, color: "#777" }}>
          <div>Category: <strong>{product.category || "General"}</strong></div>
          <div>Stock: <strong>{product.countInStock || 0}</strong></div>
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
    alignItems: "flex-start",
  },
  left: {
    flex: "0 0 480px",
  },
  image: {
    width: "100%",
    height: 560,
    objectFit: "cover",
    borderRadius: 8,
  },
  right: {
    flex: 1,
  },
  sizeBtn: {
    marginLeft: 8,
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  qtyBtn: {
    padding: "6px 10px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    borderRadius: 4,
  },
  primaryBtn: {
    padding: "10px 18px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    borderRadius: 6,
  },
  outlineBtn: {
    padding: "10px 18px",
    border: "1px solid #111",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    borderRadius: 6,
  },
  wishToggle: {
    padding: "10px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default ProductDetail;
