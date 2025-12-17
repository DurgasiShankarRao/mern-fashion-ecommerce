const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("JWT_SECRET LOADED =", process.env.JWT_SECRET);
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("Fashion E-Commerce API is running...");
});

// Temporary DB test route
app.get("/testdb", async (req, res) => {
  try {
    const count = await mongoose.connection.db.collection("users").countDocuments();
    res.json({ message: "DB connected!", usersCount: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB test failed", error: err.message });
  }
});

// Error handling middleware (NEW)
app.use((err, req, res, next) => {
  console.error("Error Middleware:", err);
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
});

// Connect to DB then start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  if (!MONGO_URI) {
    console.error("Missing MONGO_URI in .env. Add your MongoDB connection string.");
    process.exit(1);
  }
  await connectDB(MONGO_URI);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
