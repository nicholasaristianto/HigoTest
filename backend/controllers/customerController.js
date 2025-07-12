const Customer = require("../models/customerModel");

exports.getSummary = async (req, res) => {
  const genderCount = await Customer.aggregate([
    { $group: { _id: "$gender", count: { $sum: 1 } } },
  ]);
  res.json({ genderCount });
};

exports.getAll = async (req, res) => {
  const customers = await Customer.find().limit(500);
  res.json(customers);
};