import React, { useState, useEffect } from 'react';
import ProductCard from "../components/productcard.jsx"; // Ensure correct filename case

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from your backend API
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container" style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Latest Products</h1>

      {/* ✅ Grid container for product cards */}
      <div
        className="product-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
