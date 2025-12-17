import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaArrowLeft,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { useToast } from "../context/ToastContext";
import { useState } from "react";

export default function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = !!localStorage.getItem("authUser");

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const isHome = location.pathname === "/";

  const handleBack = () => {
    const checkoutFlowRoutes = ["/cart", "/checkout", "/profile/orders"];
    checkoutFlowRoutes.includes(location.pathname)
      ? navigate("/products")
      : navigate(-1);
  };

  const requireAuth = (path) => {
    if (!isLoggedIn) {
      showToast("⚠️ Please login/register to continue", "error");
      return;
    }
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    showToast("✅ Logged out successfully");
    navigate("/", { replace: true });
  };

  // 🔍 SEARCH HANDLER
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  return (
    <header className="main-navbar">
      <div className="nav-container">
        {/* LEFT */}
        <div className="nav-left">
          {!isHome && (
            <button className="back-btn" onClick={handleBack}>
              <FaArrowLeft />
            </button>
          )}
          <div className="nav-logo">FASHORA 🛍️</div>
        </div>

        {/* CENTER – SEARCH */}
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search fashion..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {/* RIGHT */}
        <nav className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/products" className="nav-item">Shop</Link>

          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="nav-item">Register</Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <div
                className="nav-icon"
                onClick={() => requireAuth("/wishlist")}
              >
                <FaHeart />
              </div>

              <div
                className="nav-icon cart-icon"
                onClick={() => requireAuth("/cart")}
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </div>

              <div
                className="nav-icon"
                onClick={() => requireAuth("/profile")}
              >
                <FaUser />
              </div>

              <div className="nav-icon" onClick={handleLogout}>
                <FaSignOutAlt />
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
