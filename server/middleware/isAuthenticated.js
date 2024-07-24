require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get('Authorization');

    if (!headerToken) {
      console.log('ERROR IN auth middleware');
      res.sendStatus(401);
      return;
    }

    try {
      jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    next();
  }
};
