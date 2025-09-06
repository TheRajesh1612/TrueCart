const express = require("express");
const { register, login, protect, getMe } = require("../controllers/autheController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe); // Add this route to get current user

module.exports = router;