const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      productImage: {
        type: String,
      },
      productName: {
        type: String,
      },
      price: {
        type: Number,
      },
      stock: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;
