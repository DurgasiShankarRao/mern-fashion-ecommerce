// src/context/ToastContext.jsx
import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      <div className="toast-wrapper">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        .toast-wrapper {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 9999;
        }

        .toast {
          min-width: 200px;
          max-width: 320px;
          padding: 14px 20px;
          border-radius: 12px;
          color: #fff;
          font-weight: 600;
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
          opacity: 0;
          transform: translateX(100%);
          animation: slideIn 0.4s forwards, fadeOut 0.4s 2.6s forwards;
        }

        .toast-success { background: linear-gradient(135deg, #22c55e, #16a34a); }
        .toast-error   { background: linear-gradient(135deg, #ef4444, #b91c1c); }
        .toast-info    { background: linear-gradient(135deg, #3b82f6, #1e40af); }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }

        @media (max-width: 600px) {
          .toast-wrapper { right: 10px; top: 10px; }
          .toast { min-width: 160px; max-width: 280px; font-size: 14px; }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

// ✅ Hook to use Toast
export const useToast = () => useContext(ToastContext);
