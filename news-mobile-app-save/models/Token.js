const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TokenSchema = new Schema({
 
  token: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model('token', TokenSchema);