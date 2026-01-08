const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get cart
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.product");
  res.json(user.cart);
});

// Add to cart
router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user.id);
  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  res.json(user.cart);
});

// Update quantity
router.put("/update", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user.id);
  const item = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (item) item.quantity = quantity;
  await user.save();

  res.json(user.cart);
});

// Remove from cart
router.delete("/remove/:id", protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(
    (item) => item.product.toString() !== req.params.id
  );

  await user.save();
  res.json(user.cart);
});

module.exports = router;
