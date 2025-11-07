import React, { useState } from "react";
import API from "../api";

export default function AddressForm({ product, onClose }) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleSubmit = async () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    try {
      const res = await API.post("/checkout", {
        userId: "guest",
        name: address.name,
        email: "guest@example.com",
        address,
        items: [{ product: product._id, qty: 1 }],
        total: product.price,
      });
      alert(`✅ Order Placed Successfully!\nReceipt ID: ${res.data.receipt.id}`);
      onClose();
    } catch (err) {
      console.error("Error placing order:", err);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h3>🏠 Enter Shipping Address</h3>

        {["name", "phone", "street", "city", "pincode"].map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={address[key]}
            onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
            style={{
              width: "100%",
              margin: "8px 0",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        ))}

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handleSubmit}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Confirm ✅
          </button>
          <button
            onClick={onClose}
            style={{
              background: "gray",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel ❌
          </button>
        </div>
      </div>
    </div>
  );
}
