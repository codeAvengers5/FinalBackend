
const DataTypes = require('sequelize');
const { sequelize } = require('../models/index')
const User= require('../models/User')(sequelize, DataTypes);
exports.registerUser = async (req, res) => {

    const {email} = req.body;
    console.log(req.body)
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    console.log(existingUser);
    console.log(email)
    try {
    const newUser = await User.create(req.body );
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
};