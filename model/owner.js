"use strict";

const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
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
    required: true,
  },
  city: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  state: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
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
  noOfRooms: {
    type: Number,
  },
  roomsReference: {
    type: Array,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Object,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: Object,
  },
});

module.exports = mongoose.model("ownerData", ownerSchema);
