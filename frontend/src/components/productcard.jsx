

import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // ✅ Add to Cart function
  const handleAddToCart = async (e) => {
    e.stopPropagation(); // prevent opening product detail page
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id || "guest";

      const res = await API.post("/cart", {
        productId: product._id,
        qty: 1,
        userId,
      });

      console.log("✅ Added to cart:", res.data);
      alert(`${product.name} added to cart 🛒`);
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("❌ Failed to add to cart");
    }
  };

  // ✅ Handle product click (open details)
  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "15px",
        textAlign: "center",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      <img
        src={
          product.image?.startsWith("http")
            ? product.image
            : `http://localhost:5000${product.image}`
        }
        alt={product.name}
        style={{
          width: "160px",
          height: "160px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />

      {/* <h3>{product.name}</h3> */}
      <h3>{product.name.replace(/^Vibe\s*/i, "")}</h3>

      <p>₹{product.price}</p>

      {/* Stop propagation so buttons work independently */}
      <div
        style={{ display: "flex", gap: "8px", justifyContent: "center" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🛒 Add to Cart */}
        <button
          onClick={handleAddToCart}
          style={{
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>

        {/* ⚡ Buy Now */}
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          style={{
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Buy Now ⚡
        </button>
      </div>
    </div>
  );
}
