const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
  
  category: {
    type: String,
    required: true
  },
  
});

//module.exports = Category = mongoose.model('category', CategorySchema);
module.exports = mongoose.model('category', CategorySchema);