const mongoose = require('mongoose');

const { Schema } = mongoose;

const familySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

const Category = mongoose.model('Families', familySchema);

module.exports = Family;
