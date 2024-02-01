const User = require("../models/User");
const Cart = require("../models/Cart");

exports.getCartItem = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const cart = await Cart.findOne({ userId: user._id });

    res.status(200).json({ items: cart.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCartItem = async (req, res) => {
  const { userId, productId, productImage, productName, price, stock, quantity } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      cart = new Cart({
        userId: user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, productImage, productName, price, quantity, stock });
    }

    await cart.save();

    res.status(200).json({ items: cart.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.increaseQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    let cart = await Cart.findOne({ userId: user._id });
    cartQuantity = cart.items.map((item) => (item.productId.toString() === productId ? { ...item, quantity: (item.quantity += 1) } : item));

    await cart.save();

    res.status(200).json({ items: cart.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.decreaseQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    let cart = await Cart.findOne({ userId: user._id });
    cartQuantity = cart.items.map((item) => (item.productId.toString() === productId ? { ...item, quantity: Math.max(0, (item.quantity -= 1)) } : item));

    await cart.save();

    res.status(200).json({ items: cart.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    let cart = await Cart.findOne({ userId: user._id });

    cart.items = cart.items.filter((item) => item._id.toString() !== id);

    await cart.save();

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
