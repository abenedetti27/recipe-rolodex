const mongoose = require('mongoose');

const { Schema } = mongoose;

const familiesSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

const Category = mongoose.model('Families', familiesSchema);

module.exports = Families;
