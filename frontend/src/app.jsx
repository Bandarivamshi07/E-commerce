import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧩 Components
import Navbar from "./components/navbar";
import HeroSection from "./components/herosection";

// 🛍️ Pages
import ProductList from "./pages/products";
import Cart from "./pages/cart";
import Orders from "./pages/order";
import Login from "./pages/login";
import Register from "./pages/register";
import ProductDetails from "./pages/productdetails";

// 🔒 Auth Protection
import ProtectedRoute from "./components/protectroute";

function App() {
  return (
    <Router>
      {/* 🧭 Combined Navbar (Main + Secondary inside one component) */}
      <Navbar />

      {/* 🌍 Page Routing */}
      <Routes>
        {/* 🏠 Home Page — Hero + Products */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ProductList />
            </>
          }
        />

        {/* 🛍️ Products Page */}
        <Route
          path="/products"
          element={
            <>
              <HeroSection />
              <ProductList />
            </>
          }
        />

        {/* 🛒 Cart Page (Protected) */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* 📦 Orders Page (Protected) */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* 🔑 Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🧾 Product Details Page */}
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
