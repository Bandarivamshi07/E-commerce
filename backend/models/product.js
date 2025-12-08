import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  price: { type: Number, required: true },

  description: { type: String },

  image: { type: String, required: true },

  // ⭐ Average rating
  rating: {
    type: Number,
    default: 4.5, // You can change to 0
  },

  // ⭐ List of reviews
  reviews: {
    type: [reviewSchema],
    default: []
  }
});

export default mongoose.model("Product", productSchema);
