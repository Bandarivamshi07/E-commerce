import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import CheckoutModal from "../components/checkoutmodal";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // ⭐ New states for reviews
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

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

  const imageURL = product.image?.startsWith("http")
  ? product.image
  : `${import.meta.env.VITE_IMAGE_BASE_URL}${product.image}`;


  // ⭐ Add Review Submit
  const submitReview = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Login required to write a review");
        return;
      }

      const reviewData = {
        username: user.name,
        rating,
        comment,
      };

      const res = await API.post(`/products/${id}/review`, reviewData);

      alert("Review added!");
      setProduct(res.data); // refresh UI
      setRating(5);
      setComment("");
    } catch (err) {
      console.log(err);
      alert("Error adding review");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f6f7f8, #e9ecef)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        {/* 🖼️ Product Image */}
        <img
          src={imageURL}
          alt={product.name}
          width="350"
          height="350"
          style={{
            objectFit: "contain",
            borderRadius: "12px",
            background: "#f8f8f8",
            padding: "10px",
          }}
        />

        {/* 📄 Product Info */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "32px", marginBottom: "10px" }}>
            {product.name}
          </h2>

          {/* ⭐ Rating */}
          <div style={{ marginBottom: "10px" }}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                style={{
                  color: i < product.rating ? "#ffc107" : "#ddd",
                  fontSize: "22px",
                }}
              >
                ★
              </span>
            ))}
            <span style={{ marginLeft: 8, color: "#555" }}>
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          <p style={{ color: "#555" }}>{product.description}</p>
          <h3 style={{ marginTop: "15px", fontSize: "28px" }}>
            ₹{product.price}
          </h3>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={async () => {
                const user = JSON.parse(localStorage.getItem("user"));
                const userId = user?._id || "guest";

                const res = await API.post("/cart", {
                  productId: product._id,
                  qty: 1,
                  userId,
                });

                alert(`${product.name} added to cart!`);
              }}
              style={{
                background: "#000",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                border: "none",
                fontSize: "16px",
              }}
            >
              Add to Cart
            </button>

            <button
              onClick={() => setShowCheckout(true)}
              style={{
                background: "green",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                border: "none",
                fontSize: "16px",
              }}
            >
              Buy Now 🛒
            </button>
          </div>
        </div>
      </div>

      {/* ⭐ Reviews Section */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          background: "#fff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
        }}
      >
        <h2>Customer Reviews</h2>
        <hr />

        {/* List Reviews */}
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((r, i) => (
            <div
              key={i}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <strong>{r.username}</strong>  
              <div>
                {Array.from({ length: 5 }, (_, j) => (
                  <span
                    key={j}
                    style={{
                      color: j < r.rating ? "#ffc107" : "#ddd",
                      fontSize: "18px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>{r.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}

        {/* ✍️ Add Review Form */}
        <h3 style={{ marginTop: "20px" }}>Write a Review</h3>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{
            padding: "8px",
            marginTop: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Terrible</option>
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          style={{
            width: "100%",
            height: "80px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={submitReview}
          style={{
            background: "#007bff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            border: "none",
            fontSize: "16px",
          }}
        >
          Submit Review
        </button>
      </div>

      {showCheckout && (
        <CheckoutModal product={product} onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}
