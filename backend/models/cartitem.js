import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
