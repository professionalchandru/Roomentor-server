"use strict";

const mongoose = require("mongoose");

const roomStatusSchema = new mongoose.Schema({
  ownerInfo: {
    type: String,
  },
  roomInfo: {
    type: String,
  },
  ownerInfo: {
    type: String,
  },
  customerInfo: {
    type: String,
  },
  daysOfBooked: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  roomStatus: {
    type: String, // Either: Booked | Available
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

module.exports = mongoose.model("roomStatus", roomStatusSchema);
