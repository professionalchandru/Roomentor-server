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
    required: true,
  },
  status: {
    type: String, // Either available | booked
    required: true,
    min: 3,
    max: 250,
  },
  datesBooked: {
    type: Array,
  },
  type: {
    type: String, // like classic 2x, double bed room, etc
    required: true,
  },
  noOfBeds: {
    type: Number,
    required: true,
  },
  size: {
    type: String, // like 120 sqft
    required: true,
  },
  minimumBookingPeriod: {
    type: Number,
    min: 1,
    max: 30,
    required: true,
  },
  maximumBookingPeriod: {
    type: Number,
    min: 1,
    max: 30,
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
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: Object,
  },
});

module.exports = mongoose.model("roomData", roomSchema);
