const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema } = mongoose;

const orderSchema = new Schema({
name: {
  type: String,
  required: true,
  unique: true,
  trim: true
},
photo: {
  type: String,
  required: true,
  trim: true
},
cookingTime: {
  type: Number,
  required: true,
},
instructions:{
  type: String,
  required: true
},
ingredients: {
  type: String,
  required: true
},
serving_size: {
  type: Number,
  required: true
},
author:{ 
  type: String,
  required: true
},
createdAt:{
  type: Date,
  default: Date.now,
  get: (timestamp) => dateFormat(timestamp),
},
families: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Families'
  }
]
});

const Order = mongoose.model('Recipies', orderSchema);

module.exports = Recipies;
