const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign({ user }, "secret-key", { expiresIn: "7d" });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat proses login" });
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Periksa apakah email sudah terdaftar
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username sudah terdaftar" });
    }

    // Buat user baru
    const newUser = new User({ username, email, password });

    // Simpan user ke database
    await newUser.save();

    const cart = new Cart({
      userId: newUser._id,
      items: [],
    });

    await cart.save();

    // Buat token JWT
    const token = jwt.sign({ user: newUser }, "secret-key", { expiresIn: "7d" });

    res.status(200).json({ token, userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat proses sign up" });
  }
};
