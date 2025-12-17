import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Profile
import Profile from "./pages/profile/Profile";
import MyAccount from "./pages/profile/MyAccount";
import MyOrders from "./pages/profile/MyOrders";
import Settings from "./pages/profile/Settings";
import Help from "./pages/profile/Help";
import ProfileAbout from "./pages/profile/About";

// Context
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";

function FadeWrapper({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-fade">
      {children}

      <style>{`
        .page-fade {
          animation: fadePage 0.35s ease;
        }

        @keyframes fadePage {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <WishlistProvider>
          <Router>
            <Navbar />

            {/* ✅ IMPORTANT: no inline padding here */}
            <main className="app-main">
              <FadeWrapper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route path="/profile" element={<Profile />}>
                    <Route index element={<MyAccount />} />
                    <Route path="orders" element={<MyOrders />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="help" element={<Help />} />
                    <Route path="about" element={<ProfileAbout />} />
                  </Route>
                </Routes>
              </FadeWrapper>
            </main>
          </Router>
        </WishlistProvider>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
