const User = require("../models/User");
const Checkout = require("../models/Checkout");

exports.getCheckoutItem = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const checkout = await Checkout.findOne({ userId: user._id });

    const checkoutItems = checkout.items.map((item) => ({
      id: item.productId,
      image: item.productImage,
      name: item.productName,
      price: item.price,
      quantity: item.quantity,
    }));

    res.status(200).json(checkoutItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCheckoutItem = async (req, res) => {
  const { userId, selectedItems, productId, productImage, productName, price, quantity } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    let checkout = await Checkout.findOne({ userId: user._id });

    if (!checkout) {
      checkout = new Checkout({
        userId: user._id,
        items: selectedItems || [{ productId, productImage, productName, price, quantity }],
      });
    }

    await checkout.save();

    res.status(200).json(checkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeCheckoutItem = async (req, res) => {
  try {
    await Checkout.deleteOne({ _id: req.params.checkoutId });

    res.status(200).json({ message: "Checkout berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
