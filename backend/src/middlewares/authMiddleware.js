const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userEmail = decoded.userEmail;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
