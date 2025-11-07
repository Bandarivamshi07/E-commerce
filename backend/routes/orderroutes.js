import express from "express";
import Order from "../models/order.js";

const router = express.Router();

// ✅ Place order
router.post("/", async (req, res) => {
  console.log("📦 Incoming order request:", req.body); // 👀 check frontend data
  try {
    const { userId, items, totalPrice, address, paymentMethod } = req.body;

    // Validate inputs
    if (!items || items.length === 0) {
      console.log("❌ Order rejected — empty items");
      return res.status(400).json({ error: "Cart is empty" });
    }

    if (!address) {
      console.log("❌ Order rejected — no address");
      return res.status(400).json({ error: "Address required" });
    }

    // Create order
    const newOrder = new Order({
      userId: userId || "guest",
      items,
      totalPrice,
      address,
      paymentMethod: paymentMethod || "COD",
      status: "Processing",
    });

    await newOrder.save();

    console.log("✅ Order saved successfully:", newOrder);
    res.status(201).json({ message: "Order placed successfully ✅", order: newOrder });
  } catch (err) {
    console.error("❌ Order placement error:", err);
    res.status(500).json({ error: "Failed to place order", details: err.message });
  }
});

// ✅ Get all orders
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId || "guest";
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


export default router;
