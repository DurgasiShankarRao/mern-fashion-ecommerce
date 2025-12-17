import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const logout = () => {
    // Remove auth info from localStorage
    localStorage.removeItem("authUser");

    // Optionally, clear cart or wishlist if needed
    // localStorage.removeItem("cartItems");
    // localStorage.removeItem("wishlistItems");

    // Redirect to home
    navigate("/", { replace: true });
  };

  return (
    <div className="profile-container">
      
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <h2 className="profile-title">My Profile</h2>

        <NavLink end to="/profile">👤 My Account</NavLink>
        <NavLink to="/profile/orders">🧾 My Orders</NavLink>
        <NavLink to="/profile/settings">⚙️ Settings</NavLink>
        <NavLink to="/profile/help">❓ Help</NavLink>
        <NavLink to="/profile/about">ℹ️ About Us</NavLink>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      {/* Content */}
      <section className="profile-content">
        <Outlet />
      </section>
    </div>
  );
}
