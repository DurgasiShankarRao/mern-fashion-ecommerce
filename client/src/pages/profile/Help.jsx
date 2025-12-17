export default function Help() {
  return (
    <div className="help-page">
      <h2>🆘 Help & Support</h2>

      {/* 📞 Contact Support */}
      <section className="help-card">
        <h3>📞 Contact Support</h3>
        <p>Email: <strong>support@fashora.com</strong></p>
        <p>Phone: <strong>1800-123-456</strong></p>
        <p>Support Hours: 9 AM – 9 PM (Mon–Sat)</p>
      </section>

      {/* ❓ FAQs */}
      <section className="help-card">
        <h3>❓ Frequently Asked Questions</h3>

        <details>
          <summary>How can I track my order?</summary>
          <p>You can track your order from <b>Profile → My Orders</b>.</p>
        </details>

        <details>
          <summary>How do I cancel an order?</summary>
          <p>Order cancellation will be available before shipment.</p>
        </details>

        <details>
          <summary>What payment methods are supported?</summary>
          <p>UPI, Cards, Net Banking & Cash on Delivery.</p>
        </details>
      </section>

      {/* 🔄 Returns & Refunds */}
      <section className="help-card">
        <h3>🔄 Returns & Refunds</h3>
        <p>✔ Easy 7-day return policy</p>
        <p>✔ Refunds processed within 3-5 business days</p>
        <p>✔ Exchange available for selected items</p>
      </section>

      {/* 🧠 Tips */}
      <section className="help-card tips">
        <h3>💡 Helpful Tips</h3>
        <ul>
          <li>Save items to Wishlist for later</li>
          <li>Check size chart before ordering</li>
          <li>Enable notifications for order updates</li>
        </ul>
      </section>

      {/* 📄 Legal */}
      <section className="help-card info">
        <p>
          <a href="#">Terms & Conditions</a> ·{" "}
          <a href="#">Privacy Policy</a> ·{" "}
          <a href="#">Shipping Policy</a>
        </p>
      </section>

      {/* ✅ CSS (INLINE & SAFE) */}
      <style>{`
        .help-page {
          max-width: 850px;
          margin: auto;
        }

        h2 {
          margin-bottom: 20px;
        }

        .help-card {
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .help-card h3 {
          margin-bottom: 10px;
        }

        .help-card p,
        .help-card li {
          color: #444;
          margin: 6px 0;
        }

        details {
          margin-bottom: 8px;
          cursor: pointer;
        }

        summary {
          font-weight: 600;
          cursor: pointer;
        }

        summary::marker {
          color: #000;
        }

        .tips ul {
          padding-left: 18px;
        }

        .info {
          text-align: center;
          font-size: 14px;
          color: #666;
        }

        a {
          color: #000;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
