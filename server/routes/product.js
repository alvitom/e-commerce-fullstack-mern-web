const express = require("express");
const router = express.Router();
const product = require("../controllers/product");

router.get("/", product.getAllProducts);

router.get("/category/:productCategory", product.getProductCategory);

router.get("/search", product.searchProduct);

router.get("/:productId", product.getProductById);

module.exports = router;
