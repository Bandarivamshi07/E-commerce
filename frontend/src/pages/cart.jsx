import React, { useEffect, useState } from "react";
import API from "../api";
import CheckoutModal from "../components/checkoutmodal";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ✅ Get user ID
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.user?._id || "guest";

  // ✅ Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get(`/cart/${userId}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch cart:", err);
        setError("Failed to fetch cart");
      } finally {
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

  // ✅ Increase / decrease quantity
  const updateQuantity = async (id, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          const newQty =
            type === "increase"
              ? item.qty + 1
              : item.qty > 1
              ? item.qty - 1
              : 1;
          return { ...item, qty: newQty };
        }
        return item;
      })
    );

    try {
      await API.put(`/cart/${id}`, { type }); // Update in backend (optional)
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "30px", background: "#f9fafb", minHeight: "90vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty 😢</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
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
                {/* 🖼️ Image */}
                <img
                  src={
                    item.productId?.image?.startsWith("http")
                      ? item.productId.image
                      : `${BACKEND_URL}${item.productId?.image}`
                  }
                  alt={item.productId?.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    marginBottom: "10px",
                    backgroundColor: "#f3f3f3",
                    borderRadius: "8px",
                  }}
                />

                {/* 📦 Product Name & Price */}
                <h3 style={{ marginBottom: "6px", color: "#333" }}>
                  {item.productId?.name}
                </h3>
                <p style={{ color: "#444", marginBottom: "8px" }}>
                 <h4> Price :   {item.productId?.price}</h4>
                </p>

                {/* 🔢 Quantity Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item._id, "decrease")}
                    style={{
                      padding: "4px 10px",
                      background: "#ddd",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: "bold" }}>{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item._id, "increase")}
                    style={{
                      padding: "4px 10px",
                      background: "#febd69",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* 🧾 Total for this product */}
                <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Subtotal: ₹{(item.productId?.price || 0) * item.qty}
                </p>

                {/* 🛠️ Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
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
          <h3
            style={{
              textAlign: "right",
              marginTop: "30px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
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
