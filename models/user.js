const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  issuer: {
    type: String,
  },
  profile: {
    id: {
      type: String,
    },
    displayName: {
      type: String,
    },
    name: {
      familyName: {
        type: String,
      },
      givenName: {
        type: String,
      },
    },
  },
});

module.exports = model('User', userSchema);
