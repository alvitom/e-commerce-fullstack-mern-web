const jwt = require("jsonwebtoken");

const authenticate = (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, "secret-key");
    res.status(200).json({ user: decoded.user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticate;
