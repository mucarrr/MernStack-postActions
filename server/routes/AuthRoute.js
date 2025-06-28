const express = require("express");
const { register, login } = require("../controllers/AuthControllers.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes - token gerekli
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ 
        message: "Protected route accessed successfully", 
        user: req.user 
    });
});

module.exports = router;