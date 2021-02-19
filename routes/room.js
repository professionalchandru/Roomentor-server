"use strict";

const router = require("express").Router();
const room = require("../controller/room");
const url = require("../constants/urlConstants");
const response = require("../utils/response");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { validateAddRoom, validateEditRoom } = require("../schema/room");
const messages = require("../constants/messages");
const common = require("../utils/common");

/**
 * ADD NEW ROOM
 */
router.post(
  url.addRoom,
  validator.body(validateAddRoom),
  common.checkAuth,
  async (req, res) => {
    try {
      const result = await room.addRoom({ req });
      return response.send({
        result,
        res,
      });
    } catch (err) {
      throw err;
    }
  }
);

/**
 * EDIT EXISTITNG ROOM DETAILS
 */
router.put(
  url.editRoom,
  validator.body(validateEditRoom),
  common.checkAuth,
  async (req, res) => {
    try {
      const result = await room.editRoom({ req });
      return response.send({
        result,
        res,
      });
    } catch (err) {
      throw err;
    }
  }
);

/**
 * DELETE ROOM USING ID
 */
router.delete(url.deleteRoom, common.checkAuth, async (req, res) => {
  try {
    const result = await room.deleteRoom({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
