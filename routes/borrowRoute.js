const express = require("express");
const { borrow } = require("../controllers/borrowController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/", authenticateToken, borrow);

module.exports = router;
