import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import CheckoutModal from "../components/checkoutmodal"; // ✅ renamed for clarity

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          gap: "30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          maxWidth: "900px",
        }}
      >
        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `http://localhost:5000${product.image}`
          }
          alt={product.name}
          width="300"
          height="300"
          style={{ objectFit: "contain", borderRadius: "10px" }}
        />

        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>₹{product.price}</h3>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                background: "black",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>

            <button
              onClick={() => setShowCheckout(true)}
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Buy Now 🏠
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Checkout popup for address & payment */}
      {showCheckout && (
        <CheckoutModal
          product={product}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
