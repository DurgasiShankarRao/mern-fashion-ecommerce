export default function Settings() {
  return (
    <div className="settings-page">
      <h2>⚙️ Settings</h2>

      {/* 🔐 Security */}
      <section className="settings-card">
        <h3>🔐 Security</h3>
        <p>Change password (coming soon)</p>
        <p>
          Two-Factor Authentication: <span className="badge pending">Disabled</span>
        </p>
        <p>Last login: Today, 9:10 PM</p>
      </section>

      {/* 🔔 Notifications */}
      <section className="settings-card">
        <h3>🔔 Notifications</h3>
        <label><input type="checkbox" defaultChecked /> Order updates</label>
        <label><input type="checkbox" defaultChecked /> Wishlist alerts</label>
        <label><input type="checkbox" /> Promotional emails</label>
        <label><input type="checkbox" /> SMS notifications</label>
      </section>

      {/* 🎨 Appearance */}
      <section className="settings-card">
        <h3>🎨 Appearance</h3>
        <p>Theme: <span className="badge">Light</span></p>
        <p>Layout: Comfortable</p>
        <p>Font Size: Medium</p>
      </section>

      {/* 🌍 Language & Region */}
      <section className="settings-card">
        <h3>🌍 Language & Region</h3>
        <p>Language: English</p>
        <p>Currency: ₹ INR</p>
        <p>Timezone: Asia/Kolkata</p>
      </section>

      {/* 🔒 Privacy Controls */}
      <section className="settings-card">
        <h3>🔒 Privacy Controls</h3>
        <label><input type="checkbox" defaultChecked /> Public profile</label>
        <label><input type="checkbox" /> Share usage data</label>
        <label><input type="checkbox" defaultChecked /> Cookie preferences</label>
      </section>

      {/* 🚨 Account Actions */}
      <section className="settings-card danger">
        <h3>🚨 Account Actions</h3>
        <button className="outline">Download account data</button>
        <button className="outline danger-btn">Deactivate account</button>
      </section>

      {/* 📄 App Info */}
      <section className="settings-card info">
        <p>App Version: <strong>v1.0.0</strong></p>
        <p>
          <a href="#">Terms of Service</a> · <a href="#">Privacy Policy</a>
        </p>
      </section>

      {/* ✅ CSS (INLINE & SAFE) */}
      <style>{`
        .settings-page {
          max-width: 800px;
          margin: auto;
        }

        h2 {
          margin-bottom: 20px;
        }

        .settings-card {
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .settings-card h3 {
          margin-bottom: 10px;
        }

        .settings-card p,
        .settings-card label {
          margin: 6px 0;
          display: block;
          color: #444;
        }

        .settings-card input {
          margin-right: 8px;
        }

        .badge {
          background: #000;
          color: #fff;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .badge.pending {
          background: orange;
        }

        .danger {
          border: 1px solid #ffdddd;
        }

        .outline {
          background: transparent;
          border: 1px solid #ccc;
          padding: 8px 14px;
          margin-right: 10px;
          border-radius: 6px;
          cursor: pointer;
        }

        .danger-btn {
          border-color: red;
          color: red;
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
