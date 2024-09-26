const express = require("express");
const { registerUser } = require("../controllers/mongo/authController");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;