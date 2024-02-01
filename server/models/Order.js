const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order: [
    {
      items: [
        {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          image: {
            type: String,
          },
          name: {
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
      total: {
        type: Number,
      },
      orderAt: { type: Date, default: Date.now },
      shippingAddress: {
        name: {
          type: String,
        },
        phone: {
          type: String,
        },
        province: {
          type: String,
        },
        city: {
          type: String,
        },
        subdistrict: {
          type: String,
        },
        postCode: {
          type: String,
        },
        detail: {
          type: String,
        },
      },
      // status: { type: String, default: "pending" },
    },
  ],
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
