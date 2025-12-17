// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/600x800?text=No+Image";

const ProductCard = ({ product, onAddToCart, onToggleWishlist, inWishlist }) => {
  return (
    <div style={styles.card}>
      <div style={styles.imgWrap}>
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            style={styles.img}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </Link>

        {/* Wishlist heart */}
        <button
          onClick={onToggleWishlist}
          style={{
            ...styles.wishBtn,
            background: inWishlist ? "#ff3f6c" : "rgba(0,0,0,0.6)",
          }}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          ♥
        </button>
      </div>

      <Link to={`/products/${product._id}`} style={styles.nameLink}>
        <h3 style={styles.name}>{product.name}</h3>
      </Link>

      <p style={styles.desc}>
        {product.description?.slice(0, 60)}
        {product.description?.length > 60 ? "..." : ""}
      </p>

      <div style={styles.bottom}>
        <div style={styles.price}>₹ {product.price}</div>
        <button style={styles.btn} onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "100%",
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 12,
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  imgWrap: {
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
  },
  wishBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    padding: "6px 9px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    color: "#fff",
  },
  nameLink: {
    textDecoration: "none",
    color: "inherit",
  },
  name: {
    margin: "10px 0 6px",
    fontSize: 16,
  },
  desc: {
    margin: "0 0 8px",
    color: "#555",
    fontSize: 13,
  },
  bottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  price: {
    fontWeight: "700",
    fontSize: 16,
  },
  btn: {
    padding: "8px 12px",
    border: "none",
    background: "#111",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default ProductCard;
