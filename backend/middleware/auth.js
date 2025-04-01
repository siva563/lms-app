const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

console.log("JWT_SECRET:" + JWT_SECRET);
const auth = (req, res, next) => {
  console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET); 
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // userId, role, institutionId
    next();
  } catch (err) {
    console.error("JWT error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
