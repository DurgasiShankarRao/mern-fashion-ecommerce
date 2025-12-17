const Product = require("../models/Product");

// ======================================================
// ADVANCED SEARCH CONTROLLER
// Route: GET /api/products/search
// Example:
// /api/products/search?q=shirt&category=men,women&min=200&max=999
// &sort=price_low&page=1&limit=12
// ======================================================
// ======================================================
// SEARCH PRODUCTS (NAME + CATEGORY ONLY)
// Route: GET /api/products/search?q=red
// ======================================================
const searchProducts = async (req, res) => {
  try {
    let {
      q,
      page = 1,
      limit = 12,
      sort,
      min,
      max,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    let filter = {};

    // -----------------------------
    // 🔍 NAME + CATEGORY SEARCH (CASE-INSENSITIVE)
    // -----------------------------
    if (q && q.trim() !== "") {
      const keyword = q.trim();

      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { category: { $regex: `^${keyword}$`, $options: "i" } },
      ];
    }

    // -----------------------------
    // 💰 PRICE FILTER (optional)
    // -----------------------------
    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    // -----------------------------
    // 🔃 SORTING
    // -----------------------------
    let sortOption = { createdAt: -1 };

    if (sort === "price_low") sortOption = { price: 1 };
    if (sort === "price_high") sortOption = { price: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    // -----------------------------
    // 📄 PAGINATION
    // -----------------------------
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return res.json({
      success: true,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });

  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({
      success: false,
      message: "Search failed. Try again later.",
    });
  }
};

// ======================================================
// GET ALL PRODUCTS
// ======================================================
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    next(error);
  }
};

// ======================================================
// GET PRODUCT BY ID
// ======================================================
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.error("Get Product Error:", error);
    next(error);
  }
};

// ======================================================
// CREATE PRODUCT
// ======================================================
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image, countInStock, tags } =
      req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      countInStock,
      tags,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    next(error);
  }
};

// ======================================================
// UPDATE PRODUCT
// ======================================================
const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image, countInStock, tags } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;
    product.countInStock = countInStock || product.countInStock;
    product.tags = tags || product.tags;

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (error) {
    console.error("Update Product Error:", error);
    next(error);
  }
};

// ======================================================
// DELETE PRODUCT
// ======================================================
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.remove();
    res.json({ message: "Product removed" });

  } catch (error) {
    console.error("Delete Product Error:", error);
    next(error);
  }
};

// EXPORTS
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
