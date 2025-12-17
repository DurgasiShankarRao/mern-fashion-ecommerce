import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    setLoading(true);

    // Simulate processing delay (realistic UX)
    setTimeout(() => {
      addOrder(cartItems, total);
      clearCart();

      showToast("🎉 Order placed successfully!", "success");

      navigate("/profile/orders", { replace: true });
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No items to checkout 🛒</h2>
        <p>Please add products before proceeding.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container fade-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-card">
        <h3>Order Summary</h3>

        <div className="checkout-items">
          {cartItems.map((item) => (
            <div className="checkout-item" key={item._id}>
              <span className="item-name">
                {item.name} × {item.quantity}
              </span>
              <span className="item-price">
                ₹ {item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="checkout-total">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>

        <button
          className="place-order-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        .checkout-container {
          max-width: 700px;
          margin: 40px auto;
          padding: 20px;
          font-family: "Inter", sans-serif;
        }

        .fade-page {
          animation: fadeIn 0.35s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .checkout-title {
          font-size: 32px;
          margin-bottom: 25px;
          text-align: center;
        }

        .checkout-empty {
          padding: 60px;
          text-align: center;
          color: #666;
        }

        .checkout-empty h2 {
          margin-bottom: 10px;
        }

        .checkout-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }

        .checkout-card h3 {
          margin-bottom: 20px;
          font-size: 22px;
        }

        .checkout-items {
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          padding: 15px 0;
          margin-bottom: 20px;
        }

        .checkout-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 15px;
        }

        .item-name {
          color: #444;
        }

        .item-price {
          font-weight: 600;
        }

        .checkout-total {
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 25px;
        }

        .place-order-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #000, #333);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .place-order-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .place-order-btn:disabled {
          background: #999;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .checkout-card {
            padding: 22px;
          }

          .checkout-title {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
