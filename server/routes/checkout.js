const express = require("express");
const checkout = require("../controllers/checkout");

const router = express.Router();

router.get("/:userId", checkout.getCheckoutItem);

router.post("/", checkout.addCheckoutItem);

router.delete("/:checkoutId", checkout.removeCheckoutItem);

module.exports = router;
