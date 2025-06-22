const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const utils = require('../utils/utils');

exports.createUser = async (username, password) => {

  if(!utils.isStrongPassword(password)){ 
    throw new Error('Password must have at least 8 chars, one number, one uppercase and one lowercase letter.');
  }

  const existing = await User.findOne({ username });
  if (existing) throw new Error('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  return await user.save();
};

exports.validateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};
