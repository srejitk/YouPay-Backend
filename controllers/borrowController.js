const userModel = require('../models/userModel');

const borrow = async (req, res) => {
  const { amount, message, duration, upi } = req.body;

  try {
    const currentUser = await userModel.findOne({ mobile: req.user?.mobile });
    const borrowerDetails = {
      borrower_id: currentUser._id,
      amount: amount,
      duration: duration,
      lendedDate: new Date().getTime(),
    };
    const lender = await userModel.findOne({ upi });

    await lender.updateOne({
      $push: {
        lendedTo: borrowerDetails,
      },
    });

    await currentUser.updateOne({
      $push: {
        borrowedFrom: {
          lender_id: lender._id,
          amount: amount,
          duration: duration,
          message: message,
          creationDate: new Date().getTime(),
        },
      },
    });

    res.status(201).json({ message: 'Request sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Request Failed' });
  }
};

module.exports = { borrow };
