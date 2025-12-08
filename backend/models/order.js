import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        // ADD THESE 👇👇👇
        name: { 
          type: String, 
          required: true 
        },

        price: { 
          type: Number, 
          required: true 
        },

        image: { 
          type: String, 
          required: true 
        },

        qty: {
          type: Number,
          default: 1,
        },
      },
    ],

    address: { 
      type: String, 
      required: true 
    },

    paymentMethod: { 
      type: String, 
      default: "COD" 
    },

    status: { 
      type: String, 
      default: "Processing" 
    },

    totalPrice: { 
      type: Number, 
      required: true 
    },
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
