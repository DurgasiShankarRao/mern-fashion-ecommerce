
# 👕 MERN Fashion E-Commerce Platform 🛍️

A **full-stack fashion e-commerce web application** built using the **MERN stack**, featuring a modern UI, real-world backend integration, and production-ready deployment.

🌐 **Live Demo:** [https://mern-fashion-ecommerce.vercel.app](https://mern-fashion-ecommerce.vercel.app) 

💻 **Source Code:** [https://github.com/DurgasiShankarRao/mern-fashion-ecommerce](https://github.com/DurgasiShankarRao/mern-fashion-ecommerce)

---

## 🚀 Project Overview

This project simulates a real-world online fashion store where users can browse products, view detailed product pages, manage cart & wishlist, and experience a smooth shopping flow across **desktop and mobile devices**.

> ⚠️ Built with **production deployment best practices** — no hardcoded URLs, centralized API handling, and mobile-safe networking.

---

## ✨ Key Features

🛍️ Browse all fashion products
🔍 View detailed product information
❤️ Add / remove products from wishlist
🛒 Add products to cart with size & quantity
📱 Fully responsive (mobile & desktop friendly)
⚙️ Centralized API service using environment variables
🚀 Deployed on modern cloud platforms

---

## 🧠 Major Learning Highlights

💡 Learned how **production differs from localhost development**
💡 Solved mobile-only API blocking issues
💡 Implemented centralized API architecture
💡 Understood real-world deployment & debugging
💡 Hands-on experience with Vercel & Render

---

## 🛠️ Tech Stack

### 🌐 Frontend

* ⚛️ React.js
* ⚡ Vite
* 🌍 React Router
* 🔗 Axios
* 🎨 CSS

### 🖥️ Backend

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB
* 🔐 JWT Authentication

### ☁️ Deployment

* ▲ Vercel (Frontend)
* ☁️ Render (Backend)

---

## 📁 Project Structure

```bash
mern-fashion-ecommerce/
│
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/     # Centralized API logic
│   └── vercel.json
│
├── server/               # Backend (Node + Express)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── config/
│
└── README.md
```

---

## 🔑 Environment Variables

### Frontend (`client/.env`)

```env
VITE_BACKEND_URL=https://mern-fashion-backend.onrender.com
```

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/DurgasiShankarRao/mern-fashion-ecommerce.git
cd mern-fashion-ecommerce
```

### 2️⃣ Start Backend

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Start Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🙌 Acknowledgements

This project was built as part of my **full-stack learning journey**, focusing on **real-world bugs, deployment challenges, and scalable architecture**.

---

## 👨‍💻 Author

**Durgasi Sankar Rao**
🎓 B.Tech – Electronics & Communication Engineering

💡 Aspiring Full Stack Developer


---

⭐ If you like this project, don’t forget to **star the repo** — it motivates me to build more!

