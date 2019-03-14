"use strict";

var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  contact: String,
  address: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Employee', employeeSchema);