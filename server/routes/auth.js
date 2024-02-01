const express = require("express");
const auth = require("../controllers/auth");

const router = express.Router();

router.get("/check-auth", auth.getAuthInfo);

router.post("/login", auth.login);

router.post("/register", auth.register);

module.exports = router;
