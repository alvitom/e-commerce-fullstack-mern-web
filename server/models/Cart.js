const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      product_name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  price: {
    type: Number,
  },
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;
