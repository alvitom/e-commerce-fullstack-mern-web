const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");

router.get("/category/:productCategory", async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.productCategory });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    res.json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/:productId/add-to-cart", async (req, res) => {
  // try {
  //   const existingCartItem = await Cart.findOne({ product_id: req.params.productId });

  //   if (existingCartItem) {
  //     // Jika produk sudah ada di keranjang, tingkatkan jumlahnya
  //     existingCartItem.quantity += quantity;
  //     const updatedCartItem = await existingCartItem.save();
  //     res.json(updatedCartItem);
  //   } else {
  //     // Jika produk belum ada di keranjang, tambahkan ke keranjang
  //     Cart.insertMany(req.body, () => {
  //       alert("Produk Berhasil ditambahkan ke keranjang");
  //     });

  //     const savedCartItem = await newCartItem.save();
  //     res.json(savedCartItem);
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Internal Server Error" });
  // }

  try {
    const { productId, quantity } = req.body;

    // Lakukan validasi atau verifikasi produk di sini jika diperlukan

    const existingCartItem = await Cart.findOne({ productId: productId });

    if (existingCartItem) {
      // Jika produk sudah ada di keranjang, tingkatkan jumlahnya
      existingCartItem.quantity += quantity;
      const updatedCartItem = await existingCartItem.save();
      res.json(updatedCartItem);
    } else {
      // Jika produk belum ada di keranjang, tambahkan ke keranjang
      const newCartItem = new Cart({
        productId: productId,
        quantity: quantity,
      });

      const savedCartItem = await newCartItem.save();
      res.json(savedCartItem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
