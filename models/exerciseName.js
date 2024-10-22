const { Schema, model } = require('mongoose');

const exerciseNameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model('ExerciseName', exerciseNameSchema);
