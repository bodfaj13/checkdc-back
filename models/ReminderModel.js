const mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var reminderSchema = mongoose.Schema({
  createdFor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  prescription: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'prescriptions'
  },
  createdAt: {
    type: Date,
    required: true,
  },
  timetoUse: {
    type: Date,
    required: true,
  },
  used: {
    type: Boolean,
    default: false
  }
});

const Reminder = mongoose.model('reminders', reminderSchema);
module.exports = Reminder;