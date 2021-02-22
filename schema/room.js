"use strict";

const Joi = require("joi");

/**
 * VALIDATE ROOM DETAILS WHILE CREATE
 */
const validateAddRoom = Joi.object()
  .keys({
    name: Joi.string().min(3).max(50).trim().required(),
    address: Joi.string().min(3).max(250).trim().required(),
    city: Joi.string().min(3).max(50).trim().required(),
    state: Joi.string().min(3).max(50).trim().required(),
    pincode: Joi.number().integer().required(),
    landMark: Joi.string().min(3).max(50).trim().required(),
    status: Joi.string().valid("available", "booked").trim().required(),
    type: Joi.string().min(3).max(50).trim().required(),
    noOfBeds: Joi.number().integer().required(),
    size: Joi.string().min(3).max(50).trim().required(),
    minimumBookingPeriod: Joi.number().integer().min(1).max(30).required(),
    maximumBookingPeriod: Joi.number().integer().min(1).max(30).required(),
    rentPerDay: Joi.number().integer().required(),
    amenities: Joi.array().required(),
  })
  .required();

/**
 * VALIDATE ROOM DETAILS WHILE EDIT
 */
const validateEditRoom = Joi.object()
  .keys({
    name: Joi.string().min(3).max(50).trim().required(),
    address: Joi.string().min(3).max(250).trim().required(),
    city: Joi.string().min(3).max(50).trim().required(),
    state: Joi.string().min(3).max(50).trim().required(),
    pincode: Joi.number().integer().required(),
    landMark: Joi.string().min(3).max(50).trim().required(),
    type: Joi.string().min(3).max(50).trim().required(),
    noOfBeds: Joi.number().integer().required(),
    size: Joi.string().min(3).max(50).trim().required(),
    minimumBookingPeriod: Joi.number().integer().min(1).max(30).required(),
    maximumBookingPeriod: Joi.number().integer().min(1).max(30).required(),
    rentPerDay: Joi.number().integer().required(),
    amenities: Joi.array().required(),
  })
  .required();

/**
 * VALIDATE LIST ROOM REQUEST
 */
const validateListRoom = Joi.object().keys({
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
});

module.exports = {
  validateAddRoom,
  validateEditRoom,
  validateListRoom,
};
