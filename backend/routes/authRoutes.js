const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authenticate");
const { getAuth,postAuth,checkLogin} = require("../controller/authController");

router.post("/register", postAuth);

router.get("/login", authenticateToken, getAuth);
router.post("/login", checkLogin); 

module.exports = router;