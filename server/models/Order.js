const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  total_amount: {
    type: Number,
  },
  order_date: {
    type: Date,
  },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
