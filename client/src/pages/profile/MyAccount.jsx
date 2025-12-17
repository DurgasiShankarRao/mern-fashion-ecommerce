import React from "react";

export default function MyAccount() {
  return (
    <div className="account-wrapper">
      <h1 className="account-title">👤 My Account</h1>

      {/* USER INFO */}
      <section className="card">
        <h3>Personal Information</h3>
        <div className="info-grid">
          <p><strong>Name:</strong> Sankar</p>
          <p><strong>Email:</strong> sankar@gmail.com</p>
          <p><strong>Phone:</strong> +91 18000 12345</p>
          <p><strong>User ID:</strong> SB-USER-2112</p>
        </div>
      </section>

      {/* ADDRESS BOOK */}
      <section className="card">
        <h3>📍 Address Book</h3>
        <div className="address-box">
          <p><strong>Home</strong></p>
          <p>D.No 12-4, Main Road</p>
          <p>Paralakhemundi, Odisha – 761200</p>
          <p>India</p>
          <button className="outline-btn">Edit Address</button>
        </div>
      </section>

      {/* ACCOUNT STATUS */}
      <section className="card status-card">
        <h3>📊 Account Status</h3>
        <div className="status-grid">
          <p><strong>Account Type:</strong> Regular</p>
          <p><strong>Member Since:</strong> January 2025</p>
          <p>
            <strong>Email Verified:</strong>{" "}
            <span className="verified">✔ Verified</span>
          </p>
        </div>
      </section>


      {/* INLINE CSS */}
      <style>{`
        .account-wrapper {
          max-width: 900px;
          margin: auto;
        }

        .account-title {
          margin-bottom: 25px;
        }

        .card {
          background: #fff;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          animation: fadeUp 0.4s ease;
        }

        .card h3 {
          margin-bottom: 14px;
        }

        .info-grid,
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }

        .address-box {
          line-height: 1.6;
        }

        .status-card {
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        }

        .verified {
          color: green;
          font-weight: bold;
        }

        .outline-btn {
          margin-top: 10px;
          padding: 8px 14px;
          border: 1px solid #000;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
        }

        .outline-btn:hover {
          background: #000;
          color: #fff;
        }

        .security-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .prefs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .prefs label {
          cursor: pointer;
        }

        .muted {
          color: #777;
          font-size: 14px;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
