const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authenticateToken = (req, res, next) => {
  const authToken = req.headers.authorization?.split(' ')[1];

  if (!authToken) res.status(401).json({ message: 'Authorization failed' });
  jwt.verify(authToken, process.env.SECRET_KEY, async (error, user) => {
    if (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
    const foundUser = userModel.findOne({ mobile: user.mobile });
    if (!foundUser) {
      res.status(403).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
