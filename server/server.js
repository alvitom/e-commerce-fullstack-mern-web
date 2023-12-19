const express = require("express");
const cors = require("cors");

require("./utils/db-connection");
const Product = require("./models/Product");
const User = require("./models/User");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

// Main
app.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
