// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Route untuk login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Temukan pengguna berdasarkan email
    const user = await User.findOne({ username });

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Cocokkan password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat proses login' });
  }
});

// Route untuk sign up
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Periksa apakah email sudah terdaftar
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah terdaftar' });
    }

    // Buat user baru
    const newUser = new User({ username, email, password });

    // Simpan user ke database
    await newUser.save();

    // Buat token JWT
    const token = jwt.sign({ userId: newUser._id }, 'secret-key', { expiresIn: '1h' });

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat proses sign up' });
  }
});

module.exports = router;
