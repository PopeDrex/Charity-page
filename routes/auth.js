const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//might be a problem
router.post("/", authController.handleLogIn);

module.exports = router;