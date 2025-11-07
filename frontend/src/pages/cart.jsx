import React, { useEffect, useState } from "react";
import API from "../api";
import CheckoutModal from "../components/checkoutmodal";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // 🛒 to show modal

  // ✅ Get userId (or guest)
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || "guest";

  // ✅ Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get(`/cart/${userId}`);
        setCartItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch cart:", err);
        setError("Failed to fetch cart");
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  // ✅ Remove item from cart
  const handleRemove = async (id) => {
    if (!window.confirm("Remove this item from cart?")) return;
    try {
      await API.delete(`/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item._id !== id));
      alert("🗑️ Item removed from cart");
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty 😢</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <img
                  src={
                    item.productId?.image?.startsWith("http")
                      ? item.productId.image
                      : `http://localhost:5000${item.productId?.image}`
                  }
                  alt={item.productId?.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <h3>{item.productId?.name}</h3>
                <p>₹{item.productId?.price}</p>
                <p>Quantity: {item.qty}</p>

                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                  <button
                    onClick={() => handleRemove(item._id)}
                    style={{
                      background: "#ff4040",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>

                  {/* 🟢 Buy Now button */}
                  <button
                    onClick={() => setSelectedProduct(item.productId)}
                    style={{
                      background: "green",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Buy Now ⚡
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💰 Total price */}
          <h3 style={{ textAlign: "right", marginTop: "30px" }}>
            Total: ₹
            {cartItems.reduce(
              (sum, item) => sum + (item.productId?.price || 0) * item.qty,
              0
            )}
          </h3>
        </>
      )}

      {/* ✅ Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
