import React, { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id || "guest";

        const res = await API.get(`/orders/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // 🔥 Cancel Order Handler
const cancelOrder = async (orderId) => {
  try {
    const res = await API.put(`/orders/cancel/${orderId}`);

    // Remove from UI immediately
    setOrders((prev) => prev.filter((o) => o._id !== orderId));

    alert("Order removed successfully!");
  } catch (err) {
    console.error("❌ Cancel Order Error:", err);
    alert("Failed to cancel order");
  }
};




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
              <p><b>Status:</b> {order.status}</p>
              <p><b>Payment:</b> {order.paymentMethod}</p>
              <p><b>Address:</b> {order.address}</p>

              <h4 style={{ marginTop: "10px" }}>🛒 Items:</h4>
              
{order.items.map((item, idx) => {
  
  const product = item.productId; // could be NULL

  const imagePath = product?.image
    ? `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/70x70?text=No+Image";

  const productName = product?.name || "Unknown Product";
  const productPrice = product?.price || 0;

  return (
    <div
      key={idx}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderBottom: "1px solid #ddd",
        paddingBottom: "8px",
        marginBottom: "8px",
      }}
    >
      <img
        src={imagePath}
        alt={productName}
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />

      <div>
        <p><b>{productName}</b></p>
        <p>₹{productPrice} × {item.qty}</p>
      </div>
    </div>
  );
})}


              <h4 style={{ marginTop: "10px", color: "green" }}>
                Total: ₹{order.totalPrice}
              </h4>

              {/* ❌ Cancel Button — Only if status == Processing */}
              {order.status !== "Cancelled" && (
   <button
     onClick={() => cancelOrder(order._id)}
     style={{
       marginTop: "10px",
       background: "red",
       color: "white",
       padding: "10px 15px",
       border: "none",
       borderRadius: "8px",
       cursor: "pointer",
       fontWeight: "bold",
     }}
   >
     Cancel Order
   </button>
)}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
