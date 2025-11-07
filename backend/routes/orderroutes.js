import express from "express";
import Order from "../models/order.js"; // ✅ lowercase

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, items, totalPrice, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      address,
      paymentMethod,
      status: "Processing",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
