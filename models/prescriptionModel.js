const mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var prescriptionSchema = mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  createdAt: {
    type: Date,
    required: true,
  },
  desc: {
    type: String
  },
  formula: {
    type: String
  },
  interval: {
    type: Number
  },
  name: {
    type: String,
    required: true,
  },
  brandname: {
    type: String
  },
  startTime: {
    type: Date
  },
  nextReminder: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String
  }
});

const Prescription = mongoose.model('prescriptions', prescriptionSchema);
module.exports = Prescription;