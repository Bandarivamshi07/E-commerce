import React, { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id || "guest"; // ✅ use same fallback

      console.log("Fetching orders for user:", userId);
      const res = await API.get(`/orders/${userId}`);
      console.log("📦 Orders fetched:", res.data);

      setOrders(res.data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    }
  };
  fetchOrders();
}, []);



  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🧾 Your Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet 🥲</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3>Order ID: {order._id}</h3>
              <p>
                <b>Status:</b> {order.status || "Processing"}
              </p>
              <p>
                <b>Payment:</b> {order.paymentMethod}
              </p>
              <p>
                <b>Address:</b> {order.address}
              </p>

              <h4 style={{ marginTop: "10px" }}>🛒 Items:</h4>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <p>
                    <b>{item.name}</b> — ₹{item.price} × {item.quantity}
                  </p>
                </div>
              ))}

              <h4 style={{ marginTop: "10px", color: "green" }}>
                Total: ₹{order.totalPrice}
              </h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
