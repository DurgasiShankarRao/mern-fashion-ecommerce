import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import "./WishlistPage.css";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // ✅ Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("authUser");

  // 🚫 Guest guard helper
  const handleGuestAction = (action) => {
    if (!isLoggedIn) {
      showToast("⚠️ Please login/register to continue");
      return;
    }
    action();
  };

  if (wishlist.length === 0) {
    return <h2 className="wishlist-empty">Your wishlist is empty ❤️</h2>;
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">My Wishlist ❤️</h1>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div className="wishlist-card" key={product._id}>
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="wishlist-img"
              />
            </Link>

            <div className="wishlist-info">
              <h3>{product.name}</h3>
              <p className="wishlist-price">₹ {product.price}</p>
              <p className="wishlist-rating">⭐ {product.rating || 4.3}</p>

              <div className="wishlist-actions">
                <button
                  className="cart-btn"
                  onClick={() =>
                    handleGuestAction(() =>
                      addToCart({ ...product, quantity: 1 })
                    )
                  }
                >
                  Move to Cart 🛒
                </button>

                <button
                  className="remove-btn"
                  onClick={() =>
                    handleGuestAction(() =>
                      removeFromWishlist(product._id)
                    )
                  }
                >
                  Remove ❌
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: You can keep toast animations global in your app */}
    </div>
  );
};

export default WishlistPage;
