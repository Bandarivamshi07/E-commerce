import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user info & listen for changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  // 💅 Common link style
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
  };

  return (
    <>
      {/* 🟦 Main Navbar */}
     <div
  style={{
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "#0f1111",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    flexWrap: "wrap",
  }}
>

        {/* 🔹 Logo */}
        <Link
          to="/"
          style={{
            color: "#00aaff",
            fontWeight: "bold",
            fontSize: "22px",
            textDecoration: "none",
          }}
        >
          🛍️ Vibe Commerce
        </Link>

        {/* 🔍 Search Bar */}
        <div
          style={{
            flex: 0.6,
            minWidth: "200px",
            maxWidth: "450px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft:"1.5em"
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            style={{
              flex: 1,
              padding: "8px 14px",
              border: "2px solid #febd69",
              borderRadius: "25px 0 0 25px",
              fontSize: "15px",
              outline: "none",
            }}
          />
          <button
            style={{
              backgroundColor: "#febd69",
              border: "2px solid #febd69",
              padding: "8px 16px",
              borderRadius: "0 25px 25px 0",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            🔍
          </button>
        </div>

      {/* 🛒 Cart & 🧾 Orders Section (Perfectly Aligned) */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "18px",
    paddingLeft: "1.5em",
    fontSize: "18px",
    lineHeight: "1.5", // helps keep equal height
  }}
>
  <Link
    to="/cart"
    style={{
      ...linkStyle,
      display: "flex",
      alignItems: "center",
      gap: "5px",
    }}
  >
    <span style={{ fontSize: "20px" }}>🛒</span>
    <span>Cart</span>
  </Link>

  <Link
    to="/orders"
    style={{
      ...linkStyle,
      display: "flex",
      alignItems: "center",
      gap: "5px",
      marginTop: "2px", // 👈 slight correction for text height
    }}
  >
    <span>🧾</span>
    <span>Orders</span>
  </Link>
</div>


        {/* 👤 Auth Section (Right Side) */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {user ? (
            <>
              <span style={{ fontSize: "14px" }}>
                Hello, <b>{user.name}</b>
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: "#ff4040",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
              <Link to="/register" style={linkStyle}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 🟨 Divider Line */}
      <div
        style={{
          height: "2px",
          width: "100%",
          background: "linear-gradient(to right, #232f3e, #febd69, #232f3e)",
        }}
      ></div>

      {/* 🟫 Secondary Navbar */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px 25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "25px",
          fontSize: "15px",
          flexWrap: "wrap",
          background: "linear-gradient(to right, #232f3e, #efba60, #232f3e)",
        }}
      >
        <span style={{ cursor: "pointer" }}>☰ All</span>
        <span style={{ cursor: "pointer" }}>Mobiles</span>
        <span style={{ cursor: "pointer" }}>Fashion</span>
        <span style={{ cursor: "pointer" }}>Watches</span>
        <span style={{ cursor: "pointer" }}>Electronics</span>
        <span style={{ cursor: "pointer" }}>Home & Kitchen</span>
        <span style={{ cursor: "pointer" }}>Books</span>
        <span style={{ cursor: "pointer" }}>Computers</span>
        <span style={{ cursor: "pointer" }}>Deals</span>
      </div>
    </>
  );
}
