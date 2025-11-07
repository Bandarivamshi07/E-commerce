import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import productRoutes from "./routes/productroutes.js";
import orderRoutes from "./routes/orderroutes.js";
import authRoutes from "./routes/authroutes.js";
import cartRoutes from "./routes/cartroutes.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ Static files (for product images)
app.use("/images", express.static("public/images"));

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// ✅ Root Route (for Render health check)
app.get("/", (req, res) => {
  res.send("✅ Vibe Commerce Backend is running successfully on Render!");
});

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
