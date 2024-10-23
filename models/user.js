const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  issuer: String,
  id: String,
  email: String,
});

module.exports = model('User', userSchema);
