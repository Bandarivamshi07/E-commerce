import express from 'express';
import Product from '../models/product.js';

const router = express.Router();


// ⭐ FIRST → ADD REVIEW ROUTE
router.post('/:id/review', async (req, res) => {
  try {
    const { username, rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = product.reviews.find(
      (r) => r.username === username
    );

    if (alreadyReviewed)
      return res.status(400).json({ message: "You already reviewed this" });

    product.reviews.push({
      username,
      rating,
      comment,
    });

    // ⭐ update average rating
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Review Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ⭐ SECOND → GET PRODUCT BY ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error('API ERROR fetching single product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// ⭐ LAST → GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('API ERROR fetching all products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
