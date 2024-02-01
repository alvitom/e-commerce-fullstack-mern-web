const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
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
      quantity: {
        type: Number,
      },
    },
  ],
//   total: { type: Number, required: true },
  //   createdAt: { type: Date, default: Date.now },
});

const Checkout = mongoose.model("checkouts", checkoutSchema);

module.exports = Checkout;
