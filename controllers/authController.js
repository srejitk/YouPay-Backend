const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ERR = require('../utils/errors.utils');
const signup = async (req, res) => {
  const { name, password, mobile, gender } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      password: hashPassword,
      mobile,
      gender,
      upi: `${mobile}@youpay.com`,
      creditScore: 750,
      funds: 0,
      isAuthenticated: false,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        mobile: newUser.mobile,
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1H',
      }
    );
    res.status(201).json({ newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERR.SIGNUP_FAILED_ERR });
  }
};

const signin = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ mobile }).lean();
    if (!existingUser) {
      return res.status(404).json({ message: ERR.USER_NOT_EXISTS_ERR });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: ERR.PASSWORD_INCORRECT_ERR });
    }

    const token = jwt.sign(
      { mobile: existingUser.mobile, id: existingUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1H',
      }
    );

    res.status(200).json({ existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERR.SIGNIN_FAILED_ERR });
  }
};

module.exports = {
  signup,
  signin,
};
