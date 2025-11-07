import express from "express";
import CartItem from "../models/cartitem.js"; // ✅ lowercase

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { productId, userId, qty } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ error: "Missing product or user ID" });
    }

    const newItem = new CartItem({ productId, userId, qty });
    await newItem.save();

    res.status(201).json({ message: "Item added to cart", item: newItem });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const cart = await CartItem.find({ userId: req.params.userId });
    res.json(cart);
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

export default router;
