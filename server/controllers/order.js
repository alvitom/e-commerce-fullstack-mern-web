const midtransClient = require("midtrans-client");

const Product = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Order = require("../models/Order");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

exports.createOrder = async (req, res) => {
  const { userId, items, total, shippingAddress } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    for (const item of items) {
      const productId = item.id;
      const quantity = item.quantity;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Produk tidak ditemukan." });
      }

      if (product.quantity < quantity) {
        return res.status(400).json({ error: "Stok produk tidak mencukupi." });
      }

      product.stock -= quantity;
      await product.save();
    }

    for (const item of items) {
      const productId = item.id;
      let cart = await Cart.findOne({ userId: user._id });

      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

      await cart.save();
    }

    let order = await Order.findOne({ userId: user._id });

    if (!order) {
      order = new Order({
        userId: user._id,
        order: [],
      });
    }

    order.order.push({ items, total, shippingAddress });

    await order.save();

    const latestOrder = order.order[order.order.length - 1]._id;

    let parameter = {
      transaction_details: {
        order_id: latestOrder,
        gross_amount: total,
      },
      credit_card: {
        secure: true,
      },
      item_details: items,
      customer_details: {
        first_name: shippingAddress.name,
        phone: shippingAddress.phone,
        billing_address: shippingAddress,
        shipping_address: shippingAddress,
      },
    };

    const token = await snap.createTransactionToken(parameter);

    res.status(200).json({ latestOrder, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
