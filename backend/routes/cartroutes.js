import express from "express";
import CartItem from "../models/cartitem.js";

const router = express.Router();

/* ✅ 1. Add Item to Cart */
router.post("/", async (req, res) => {
  try {
    const { productId, userId, qty } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ error: "Missing product or user ID" });
    }

    // Check if item already exists in cart
    let existingItem = await CartItem.findOne({ userId, productId });

    if (existingItem) {
      existingItem.qty += qty || 1;
      await existingItem.save();
      return res.status(200).json({ message: "Quantity updated", item: existingItem });
    }

    // Otherwise, create new item
    const newItem = new CartItem({ productId, userId, qty: qty || 1 });
    await newItem.save();

    res.status(201).json({ message: "Item added to cart", item: newItem });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

/* ✅ 2. Get Cart Items (with populated product details) */
router.get("/:userId", async (req, res) => {
  try {
    const cart = await CartItem.find({ userId: req.params.userId })
      .populate("productId", "name price image"); // populate name, price, image

    res.json(cart);
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

/* ✅ 3. Update Quantity (+ or -) */
router.put("/:id", async (req, res) => {
  try {
    const { type } = req.body;
    const item = await CartItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (type === "increase") item.qty += 1;
    if (type === "decrease" && item.qty > 1) item.qty -= 1;

    await item.save();
    res.json({ message: "Quantity updated", item });
  } catch (err) {
    console.error("❌ Error updating quantity:", err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

/* ✅ 4. Remove Item */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await CartItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Cart item not found" });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("❌ Error removing item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

export default router;
