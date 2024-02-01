const express = require("express");
const router = express.Router();

const order = require("../controllers/order");

router.post("/", order.createOrder);

module.exports = router;
