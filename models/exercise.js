const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  serial: {
    type: Number,
    required: true,
  },
});

module.exports = model('Exercise', exerciseSchema);
