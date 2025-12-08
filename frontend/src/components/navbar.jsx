import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  // ✅ Listen for changes in localStorage (login/logout events)
  useEffect(() => {
    const handleStorage = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser || null);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
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
            paddingLeft: "1.5em",
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

        {/* 🛒 Cart & Orders */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            paddingLeft: "1.5em",
            fontSize: "18px",
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
            <span style={{ fontSize: "17px" }}>Cart</span>
          </Link>

          <Link
            to="/orders"
            style={{
              ...linkStyle,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span style={{ fontSize: "18px" }}>🧾</span>
            <span style={{ fontSize: "16px" }}>Orders</span>
          </Link>
        </div>

        {/* 👤 Auth Section */}
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
              <Link
                to="/login"
                style={{ fontSize: "20px", color: "white", textDecoration: "none" }}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={{ fontSize: "20px", color: "white", textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 🟨 Divider */}
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
          background: "linear-gradient(to right, #232f3e, #efba60, #232f3e)",
          color: "white",
          padding: "10px 25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "25px",
          fontSize: "15px",
          flexWrap: "wrap",
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
