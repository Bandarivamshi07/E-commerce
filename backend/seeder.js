import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "./models/product.js";

dotenv.config();

const __dirname = path.resolve(); // get root dir
const dataPath = path.join(__dirname, "data", "products.json"); // ✅ FIXED path

const products = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
