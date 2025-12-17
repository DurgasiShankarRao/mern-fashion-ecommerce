// src/context/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem("wishlist");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // 🔒 Normalize product before saving
  const normalizeProduct = (product) => ({
    _id: product._id,
    name: product.name,
    image: product.image,
    price: Number(product.price), // IMPORTANT
    category: product.category || "",
    stock: product.stock ?? 1,
    rating: product.rating ?? 4.3,
  });

  const addToWishlist = (product) => {
    const safeProduct = normalizeProduct(product);

    setWishlist((prev) => {
      if (prev.find((p) => p._id === safeProduct._id)) return prev;
      return [...prev, safeProduct];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p._id !== id));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find((p) => p._id === product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some((p) => p._id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
