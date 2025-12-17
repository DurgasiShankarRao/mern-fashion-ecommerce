import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const Cart = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const { showToast } = useToast();

  // ✅ Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("authUser");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  // 🚫 Guest guard for cart actions
  const handleGuestAction = (action) => {
    if (!isLoggedIn) {
      showToast("⚠️ Please login/register to continue");
      return;
    }
    action();
  };

  const handleRemove = (id) => {
    handleGuestAction(() => {
      removeFromCart(id);
      showToast("Item removed from cart ❌", "info");
    });
  };

  const handleClear = () => {
    handleGuestAction(() => {
      clearCart();
      showToast("Cart cleared 🧹", "info");
    });
  };

  const handleCheckout = () => {
    handleGuestAction(() => navigate("/checkout"));
  };

  const handleIncrease = (id) => {
    handleGuestAction(() => increaseQty(id));
  };

  const handleDecrease = (id) => {
    handleGuestAction(() => decreaseQty(id));
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th className="left">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="cart-row">
                  <td className="left">{item.name}</td>
                  <td>₹ {item.price}</td>

                  <td>
                    <div className="qty-box">
                      <button
                        onClick={() => handleDecrease(item._id)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item._id)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="total">Total: ₹ {totalPrice}</h3>

          <div className="cart-actions">
            <button className="clear-btn" onClick={handleClear}>
              Clear Cart
            </button>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}

      {/* ================= CSS ================= */}
      <style>{`
        .cart-container {
          padding: 20px;
          animation: pageFade 0.4s ease;
        }

        .empty-cart {
          margin-top: 20px;
          color: #777;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .cart-table th,
        .cart-table td {
          padding: 14px;
          border-bottom: 1px solid #e5e5e5;
          text-align: center;
        }

        .left {
          text-align: left;
          font-weight: 500;
        }

        .qty-box {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #f5f5f5;
          padding: 6px 10px;
          border-radius: 20px;
        }

        .qty-btn {
          border: none;
          background: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          transition: 0.2s;
        }

        .qty-btn:hover {
          background: #000;
          color: white;
        }

        .remove-btn {
          background: #ff4d4f;
          color: white;
          border: none;
          padding: 7px 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s;
        }

        .remove-btn:hover {
          background: #d9363e;
        }

        .total {
          margin-top: 25px;
          font-size: 20px;
          text-align: right;
        }

        .cart-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          gap: 15px;
        }

        .clear-btn {
          background: #222;
          color: white;
          padding: 12px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: 0.2s;
        }

        .clear-btn:hover {
          background: #000;
        }

        .checkout-btn {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          padding: 12px 22px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          transition: 0.25s;
        }

        .checkout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .cart-row {
          animation: fadeInRow 0.3s ease;
        }

        @keyframes fadeInRow {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pageFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Cart;
