"use strict";

const mongoose = require("mongoose");

const roomStatusSchema = new mongoose.Schema({
  ownerInfo: {
    type: String,
  },
  roomInfo: {
    type: String,
  },
  customerInfo: {
    type: String,
  },
  noOfDaysBooked: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  roomStatus: {
    type: String, // Either: Booked | Vacated
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
