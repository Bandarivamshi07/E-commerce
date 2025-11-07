import React, { useState, useEffect } from "react";
import API from "../api";

export default function CheckoutModal({ product, onClose }) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [savedAddress, setSavedAddress] = useState(null);
  const [method, setMethod] = useState("");

  // Load existing address
  useEffect(() => {
    const saved = localStorage.getItem("address");
    if (saved) setSavedAddress(JSON.parse(saved));
  }, []);

  const handleSaveAddress = () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
      alert("⚠️ Please fill all fields!");
      return;
    }
    localStorage.setItem("address", JSON.stringify(address));
    setSavedAddress(address);
    alert("✅ Address saved!");
  };

  // ✅ Confirm order
  const handleConfirmOrder = async () => {
    if (!savedAddress) return alert("⚠️ Add address first!");
    if (!method) return alert("⚠️ Choose payment method!");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id || "guest";

      const res = await API.post("/orders", {
        userId,
        items: [
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ],
        totalPrice: product.price,
        address: `${savedAddress.name}, ${savedAddress.street}, ${savedAddress.city} - ${savedAddress.pincode}`,
        paymentMethod: method,
      });

      console.log("✅ Order response:", res.data);
      alert("✅ Order placed successfully!");
      onClose();
    } catch (err) {
      console.error("❌ Order error:", err);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>🛒 Checkout</h2>
        <h4>{product.name}</h4>
        <p>Price: ₹{product.price}</p>

        {/* 🏠 Address Section */}
        <div>
          <h3>Shipping Address</h3>
          {savedAddress ? (
            <div style={{ background: "#f8f8f8", padding: "10px", borderRadius: "8px" }}>
              <p>
                <b>{savedAddress.name}</b> ({savedAddress.phone})<br />
                {savedAddress.street}, {savedAddress.city} - {savedAddress.pincode}
              </p>
              <button
                onClick={() => setSavedAddress(null)}
                style={{
                  background: "gray",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Change Address
              </button>
            </div>
          ) : (
            <>
              {["name", "phone", "street", "city", "pincode"].map((key) => (
                <input
                  key={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={address[key]}
                  onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                  style={{
                    width: "100%",
                    margin: "5px 0",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
              <button
                onClick={handleSaveAddress}
                style={{
                  width: "100%",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              >
                Save Address
              </button>
            </>
          )}
        </div>

        {/* 💳 Payment Section */}
        <div style={{ marginTop: "15px" }}>
          <h3>Payment Method</h3>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Payment Option</option>
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Card</option>
            <option value="GPay">Google Pay</option>
          </select>
        </div>

        <button
          onClick={handleConfirmOrder}
          style={{
            width: "100%",
            background: "green",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            marginTop: "15px",
            cursor: "pointer",
          }}
        >
          Confirm Order ✅
        </button>

        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "gray",
            width: "100%",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
