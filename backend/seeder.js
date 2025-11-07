import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Product from "./models/product.js";

dotenv.config();

// ✅ Read the products.json file manually (instead of import assert)
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error seeding products:", err.message);
    process.exit(1);
  });
