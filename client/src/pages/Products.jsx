// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("authUser");

  // Read category from URL
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category"); // men, women, accessories

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 FILTER PRODUCTS BY CATEGORY
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  // Guest check helper
  const handleGuestAction = (action) => {
    if (!isLoggedIn) {
      showToast("⚠️ Please login/register to continue");
      return;
    }
    action();
  };

  return (
    <div className="page-container">
      <h1>
        {selectedCategory
          ? `${selectedCategory.toUpperCase()} Products`
          : "All Products"}
      </h1>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              inWishlist={wishlist.some((w) => w._id === item._id)}
              onAddToCart={() =>
                handleGuestAction(() =>
                  addToCart({ ...item, quantity: 1 })
                )
              }
              onToggleWishlist={() =>
                handleGuestAction(() => toggleWishlist(item))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
    marginTop: "20px",
  },
};


export default Products;
