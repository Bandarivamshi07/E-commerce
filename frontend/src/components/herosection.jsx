import React from "react";

export default function HeroSection() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/ecom.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "48vh",
        // width:"100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "white",
        filter: "brightness(0.99)",
        paddingLeft:"1em",
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
          color:""
        }}
      >
        🛍️ Vibe Commerce
      </h1>
      <p style={{ fontSize: "20px", marginTop: "10px" }}>
        Discover the latest fashion & lifestyle trends. Shop now with style!
      </p>

      <button
        onClick={() => (window.location.href = "/products")}
        style={{
          marginTop: "20px",
          background: "linear-gradient(90deg, #ff3c3c, #ff7a00)",
          color: "white",
          padding: "12px 25px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          transition: "0.3s",
        }}
      >
        Explore Products →
      </button>
    </div>
  );
}
