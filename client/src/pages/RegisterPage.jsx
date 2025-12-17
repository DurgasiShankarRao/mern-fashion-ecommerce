// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const validateEmail = (email) => {
    return /.+@(gmail\.com|fashion\.com)$/i.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email (e.g., user@gmail.com)");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((u) => u.email === email);

    if (emailExists) {
      setError("This email is already registered. Try login!");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("authUser", JSON.stringify(newUser));
    showToast("✅ Registration successful! Logged in automatically.");
    navigate("/"); // Redirect to home
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="auth-form">
        <label>
          Email
          <input
            type="email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <div className="password-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="auth-btn">
          Register
        </button>
      </form>

      <p className="switch-auth">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login here</span>
      </p>

      {/* ================= CSS ================= */}
      <style>{`
        .auth-container {
          max-width: 400px;
          margin: 80px auto;
          padding: 30px;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 12px 25px rgba(0,0,0,0.12);
          font-family: "Inter", sans-serif;
          text-align: center;
        }

        h1 {
          margin-bottom: 20px;
          font-size: 28px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        label {
          display: flex;
          flex-direction: column;
          text-align: left;
          font-weight: 500;
        }

        input {
          width: 100%;
          padding: 10px 12px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
        }

        .password-wrap {
          position: relative;
        }

        .toggle-eye {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #555;
        }

        .auth-btn {
          padding: 12px;
          background: linear-gradient(135deg, #000, #333);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .auth-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
        }

        .error {
          color: red;
          font-size: 14px;
          margin-top: -10px;
        }

        .switch-auth {
          margin-top: 15px;
          font-size: 14px;
          color: #555;
        }

        .switch-auth span {
          color: #111;
          font-weight: bold;
          cursor: pointer;
        }

        .switch-auth span:hover {
          text-decoration: underline;
        }

        @media(max-width: 500px) {
          .auth-container {
            margin: 40px 20px;
            padding: 22px;
          }

          h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
