import express from "express";
import mongoose from "mongoose";
import CartItem from "../models/cartitem.js";

const router = express.Router();

// ✅ Add product to cart
router.post("/", async (req, res) => {
  try {
    const { userId, productId, qty } = req.body;

    console.log("🛒 Add to Cart Request:", req.body);

    if (!productId) {
      return res.status(400).json({ error: "Product ID required" });
    }

    // create or update existing item
    const existingItem = await CartItem.findOne({ userId, productId });

    if (existingItem) {
      existingItem.qty += qty || 1;
      await existingItem.save();
      return res.json({ message: "Cart updated ✅", item: existingItem });
    }

    const item = new CartItem({
      userId: userId || "guest",
      productId,
      qty: qty || 1,
    });

    await item.save();

    console.log("✅ Added to cart:", item);
    res.status(201).json({ message: "Product added to cart ✅", item });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add item to cart", details: err.message });
  }
});

// ✅ Fetch user cart
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.find({ userId }).populate("productId");
    res.json(cartItems);
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// ✅ Delete cart item
router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart ✅" });
  } catch (err) {
    console.error("❌ Error deleting item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});


export default router;
