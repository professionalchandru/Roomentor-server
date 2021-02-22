"use strict";

const Joi = require("joi");

/**
 * VALIDATE LIST ROOM REQUEST
 */
const validateListRoomStatus = Joi.object().keys({
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
});

module.exports = {
  validateListRoomStatus,
};
