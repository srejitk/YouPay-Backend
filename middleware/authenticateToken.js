const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const ERR = require('../utils/errors.utils');

const authenticateToken = (req, res, next) => {
  const authToken = req.headers.authorization?.split(' ')[1];

  if (!authToken) res.status(401).json({ message: ERR.AUTH_TOKEN_MISSING });
  jwt.verify(authToken, process.env.SECRET_KEY, async (error, user) => {
    if (error) {
      res.status(403).json({ message: ERR.INVALID_TOKEN_ERR });
    }
    const foundUser = userModel.findOne({ mobile: user.mobile });
    if (!foundUser) {
      res.status(403).json({ message: ERR.USER_NOT_EXISTS_ERR });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
