const express = require("express");
const cart = require("../controllers/cart");

const router = express.Router();

router.get("/:userId", cart.getCartItem);

router.post("/add", cart.addCartItem);

router.post("/increase-quantity", cart.increaseQuantity);

router.post("/decrease-quantity", cart.decreaseQuantity);

router.delete("/:userId/:id", cart.removeCartItem);

module.exports = router;
