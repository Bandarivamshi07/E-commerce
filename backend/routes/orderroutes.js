import express from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";

const router = express.Router();

/* ✅ Create new order */
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalPrice, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 🔥 STEP 1: Fetch full product info from database
  const enrichedItems = await Promise.all(
  items.map(async (item) => {
    const product = await Product.findById(item.productId);

    const fullImagePath = product.image.startsWith("http")
      ? product.image
      : `http://localhost:5173${product.image}`;

    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: fullImagePath,
      qty: item.qty,
    };
  })
);



    // 🔥 STEP 2: Save enriched items into the order
    const newOrder = new Order({
      userId,
      items: enrichedItems, // <--- FIXED
      totalPrice,
      address,
      paymentMethod,
      status: "Processing",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});


/* ✅ Get all orders for a user with product details */
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("items.productId", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/* ✅ Cancel an order */
/* ❌ Cancel Order = Delete Order */
router.put("/cancel/:orderId", async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.orderId);

    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json({ message: "Order removed successfully" });
  } catch (err) {
    console.error("❌ Error removing order:", err);
    res.status(500).json({ error: "Failed to remove order" });
  }
});


export default router;  