const express = require("express");
const address = require("../controllers/address");

const router = express.Router();

router.get("/:userId", address.getAddressUser);

router.post("/add", address.addAddressUser);

module.exports = router;
