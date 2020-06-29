const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  reminder: {
    type: String,
    required: true,
    minlength: 2
  },
  isComplete: {
    type: Boolean,
    default: false
  }
},);

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;