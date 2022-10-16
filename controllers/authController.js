const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
  const { name, password, mobile, gender } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const result = new userModel({
      name,
      password: hashPassword,
      mobile,
      gender,
      upi: `${mobile}@youpay.com`,
      creditScore: 750,
      funds: 0,
      isAuthenticated: false,
    });
    await result.save();
    const token = jwt.sign(
      {
        mobile: result.mobile,
        id: result._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1H',
      }
    );
    res.status(201).json({ result: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong with signup' });
  }
};

const signin = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ mobile });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: 'Password Incorrect' });
    }

    const token = jwt.sign(
      { mobile: existingUser.mobile, id: existingUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1H',
      }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong with signin' });
  }
};

module.exports = {
  signup,
  signin,
};
