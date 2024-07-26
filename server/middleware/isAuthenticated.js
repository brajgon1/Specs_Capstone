require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided!");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = isAuthenticated;
