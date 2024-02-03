const express = require("express");
const product = require("../controllers/product");
const router = express.Router();

router.get("/", product.getAllProducts);

router.get("/category/:productCategory", product.getProductCategory);

router.get("/search", product.searchProduct);

router.get("/:productId", product.getProductById);

module.exports = router;
