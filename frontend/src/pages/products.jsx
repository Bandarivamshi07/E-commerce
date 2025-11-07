import React, { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/productcard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>Our Products</h2>

      {products.length === 0 ? (
        <p>No products found 😢</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
