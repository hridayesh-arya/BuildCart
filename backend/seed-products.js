const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

console.log("SEED SCRIPT STARTED");

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description:
      "Premium noise-canceling headphones with 30-hour battery life and crystal clear sound quality.",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    stock: 25,
    category: "Electronics",
  },
  {
    name: "Smart Fitness Watch",
    price: 199.99,
    description:
      "Track your health metrics, receive notifications, and stay connected with this sleek smartwatch.",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    stock: 15,
    category: "Electronics",
  },
  {
    name: "Minimalist Leather Backpack",
    price: 129.99,
    description:
      "Handcrafted genuine leather backpack with laptop compartment and multiple pockets.",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    stock: 8,
    category: "Fashion",
  },
  {
    name: "Organic Coffee Beans",
    price: 24.99,
    description:
      "Single-origin Arabica beans, ethically sourced and freshly roasted for the perfect cup.",
    imageUrl:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    stock: 50,
    category: "Food & Drink",
  },
  {
    name: "Ceramic Plant Pot Set",
    price: 45.99,
    description:
      "Set of 3 handmade ceramic pots in earth tones, perfect for succulents and small plants.",
    imageUrl:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    stock: 20,
    category: "Home & Garden",
  },
  {
    name: "Vintage Desk Lamp",
    price: 89.99,
    description:
      "Industrial-style adjustable desk lamp with warm LED bulb included. Brass finish.",
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    stock: 0,
    category: "Home & Garden",
  },
  {
    name: "Running Sneakers Pro",
    price: 149.99,
    description:
      "Lightweight performance running shoes with responsive cushioning and breathable mesh.",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    stock: 35,
    category: "Fashion",
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    description:
      "Waterproof wireless speaker with 360° sound and 12-hour playtime. Perfect for outdoors.",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    stock: 3,
    category: "Electronics",
  },
];

async function seedProducts() {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI =", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const countBefore = await Product.countDocuments();
    console.log("Products before delete:", countBefore);

    await Product.deleteMany();
    console.log("Existing products removed");

    await Product.insertMany(products);
    console.log("Products inserted");

    const countAfter = await Product.countDocuments();
    console.log("Products after insert:", countAfter);

    process.exit();
  } catch (error) {
    console.error("SEED ERROR:", error);
    process.exit(1);
  }
}

seedProducts(); 
