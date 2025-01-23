const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("🚀 ~ authMiddleware ~ req:", req);
  console.log("🚀 ~ authMiddleware ~ req:", req);
  const token = req.cookies.jwt;
  console.log("🚀 ~ authMiddleware ~ token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log("🚀 ~ jwt.verify ~ token:", token);
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
