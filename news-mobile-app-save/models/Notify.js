const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NotifySchema = new Schema({
 
  token: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
  },
  value:{
    type: Boolean,
  }
});

//module.exports = Notify = mongoose.model('notify', NotifySchema);
module.exports = mongoose.model('notify', NotifySchema);