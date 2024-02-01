const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductCategory = async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.productCategory });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const products = await Product.find({
      $or: [{ product_name: { $regex: new RegExp(keyword, "i") } }],
    })
      .limit(5)
      .sort({ "rating.rate": -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Gagal melakukan pencarian produk." });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    res.json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
};
