"use strict";

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  email: {
    type: String,
    min: 3,
    max: 50,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String, // TYPE: customer | owner
    required: true,
  },
  address: {
    type: String,
    min: 50,
    max: 250,
  },
  city: {
    type: String,
    min: 3,
    max: 50,
  },
  state: {
    type: String,
    min: 3,
    max: 50,
  },
  pincode: {
    type: Number,
  },
  securityQuestion: {
    type: String,
    required: true,
    min: 3,
    max: 250,
  },
  securityAnswer: {
    type: String,
    required: true,
    min: 3,
    max: 250,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("customerData", customerSchema);
