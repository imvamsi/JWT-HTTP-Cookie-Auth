const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./userModel");
const authMiddleware = require("./authMiddleware");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  console.log("🚀 ~ router.post ~ req:", req);
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "User registration failed", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, { httpOnly: true, secure: false });
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});
console.log("🚀 ~ router.post ~ token:", token);

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out successfully" });
});

// Protected Route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is protected data", user: req.user });
});

module.exports = router;
