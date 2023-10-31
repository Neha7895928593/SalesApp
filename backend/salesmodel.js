const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  date: { type: Date, default: Date.now }
});

module.exports= mongoose.model('Sales', salesSchema);


