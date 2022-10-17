const userModel = require('../models/userModel');

const borrow = async (req, res) => {
  const { amount, message, duration, upi } = req.body;

  try {
    const lender = await userModel.findOne({ upi });
    const currentUser = await userModel.findOne({ mobile: req.user?.mobile });
    const borrowerDetails = {
      borrower_id: currentUser._id,
      amount: amount,
      duration: duration,
      lendedDate: new Date(),
    };
    const updatedLender = await userModel.findOneAndUpdate(
      { upi },
      {
        $push: {
          lendedTo: borrowerDetails,
        },
      },
      {
        new: true,
      }
    );
    const updatedCurrentUser = await userModel.findOneAndUpdate(
      { mobile: req.user?.mobile },
      {
        $push: {
          borrowedFrom: {
            lender_id: lender._id,
            amount: amount,
            duration: duration,
            message: message,
            creationDate: new Date(),
          },
        },
      },
      {
        new: true,
      }
    );

    res.status(201).json(updatedCurrentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Request Failed' });
  }
};

module.exports = { borrow };
