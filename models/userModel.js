const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  creditScore: {
    type: Number,
  },
  funds: {
    type: Number,
  },
  isAuthenticated: {
    type: Boolean,
  },
  password: {
    type: String,
    required: true,
  },
  upi: {
    type: String,
  },
  borrowedFrom: [
    {
      lender_id: {
        type: String,
      },
      amount: {
        type: Number,
      },
      reason: {
        type: String,
      },
      duration: {
        type: String,
      },
      creationDate: {
        type: Date,
      },
    },
  ],
  lendedTo: [
    {
      borrower_id: {
        type: String,
      },
      amount: {
        type: Number,
      },
      duration: {
        type: String,
      },
      lendedDate: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model('Users', UserSchema);
