"use strict";

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  address: {
    type: Text,
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
  landMark: {
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
    min: 3,
    max: 50,
    required: true,
  },
  status: {
    type: String, // Either available | booked
    required: true,
    min: 3,
    max: 250,
  },
  roomStatusId: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  type: {
    type: String, // like classic 2x, double bed room, etc
    required: true,
  },
  size: {
    type: String, // like 120 sqft
    required: true,
  },
  minimumBookingPeriod: {
    type: Number,
    required: true,
  },
  MaximumBookingPeriod: {
    type: Number,
    required: true,
  },
  rentPerDay: {
    type: Number,
    required: true,
  },
  amenities: {
    type: Array,
    required: true,
  },
  photos: {
    type: Array,
  },
  ownerReference: {
    type: String,
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

module.exports = mongoose.model("roomData", roomSchema);
