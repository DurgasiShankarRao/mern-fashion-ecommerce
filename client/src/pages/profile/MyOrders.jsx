import { useState } from "react";
import { useOrders } from "../../context/OrderContext";

export default function MyOrders() {
  const { orders } = useOrders();
  const [visibleCount, setVisibleCount] = useState(3); // 👈 load 3 orders first

  // ✅ EMPTY STATE UI
  if (!orders || orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>📦 No Orders Yet</h2>
        <p>You haven’t placed any orders.</p>
        <p>Start shopping to see your orders here.</p>
      </div>
    );
  }

  const visibleOrders = orders.slice(0, visibleCount);

  // ✅ STATUS COLOR LOGIC
  const getStatusColor = (status) => {
    switch (status) {
      case "Placed":
        return "#f4b400"; // yellow
      case "Processing":
        return "#1a73e8"; // blue
      case "Delivered":
        return "#0f9d58"; // green
      case "Cancelled":
        return "#d93025"; // red
      default:
        return "#555";
    }
  };

  return (
    <div>
      <h2>My Orders</h2>

      {visibleOrders.map((order) => (
        <div key={order.id} className="order-card">
          <h4>Order ID: {order.id}</h4>
          <p className="order-date">🗓 {order.date}</p>

          <div className="order-items">
            {order.items.map((item) => (
              <p key={item._id}>
                {item.name} × {item.quantity} — ₹{" "}
                {item.price * item.quantity}
              </p>
            ))}
          </div>

          <p>
            <b>Total:</b> ₹ {order.total}
          </p>

          <p>
            Status:{" "}
            <span
              className="status"
              style={{ color: getStatusColor(order.status) }}
            >
              {order.status}
            </span>
          </p>
        </div>
      ))}

      {/* ✅ LOAD MORE BUTTON */}
      {visibleCount < orders.length && (
        <button className="load-more-btn" onClick={() => setVisibleCount((p) => p + 3)}>
          Load More Orders
        </button>
      )}

      {/* ✅ PAGE-LEVEL CSS (ONLY FOR THIS PAGE) */}
      <style>{`
        .order-card {
          border: 1px solid #ddd;
          padding: 16px;
          margin-bottom: 16px;
          border-radius: 10px;
          background: #fff;
        }

        .order-date {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .order-items {
          margin: 10px 0;
        }

        .status {
          font-weight: bold;
        }

        .load-more-btn {
          background: black;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .empty-orders {
          text-align: center;
          padding: 40px;
          background: #fafafa;
          border-radius: 12px;
        }

        .empty-orders h2 {
          margin-bottom: 10px;
        }

        .empty-orders p {
          color: #555;
        }
      `}</style>
    </div>
  );
}
