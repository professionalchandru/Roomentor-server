"use strict";

const router = require("express").Router();
const bookRooms = require("../controller/bookRooms");
const url = require("../constants/urlConstants");
const response = require("../utils/response");
const common = require("../utils/common");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { validateListRoomStatus } = require("../schema/bookRooms");
const messages = require("../constants/messages");

/**
 * CHECK DATES AND BOOK ROOM BY CUSTOMER
 */
router.put(url.bookRoom, common.checkAuth, async (req, res) => {
  try {
    // To check valid token
    if (res.statusCode !== 200) {
      return;
    }

    // Check the access privilage of user
    if (req.body.userType !== "customer") {
      let result = {
        status: messages.failure,
        statusCode: 401,
        message: messages.noAccess,
      };
      return response.send({
        result,
        res,
      });
    }

    const result = await bookRooms.bookRoom({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});

/**
 * LIST ROOM STATUS BY OWNER
 */
router.get(
  url.listRoomStatusByOwner,
  validator.query(validateListRoomStatus),
  common.checkAuth,
  async (req, res) => {
    try {
      // To check valid token
      if (res.statusCode !== 200) {
        return;
      }

      // Check the access privilage of user
      if (req.body.userType !== "owner") {
        let result = {
          status: messages.failure,
          statusCode: 401,
          message: messages.noAccess,
        };
        return response.send({
          result,
          res,
        });
      }

      const result = await bookRooms.listRoomStatusByOwner({ req });
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
 * LIST ROOMS BOOKED BY CUSTOMER
 */
router.get(
  url.listRoomStatusByCustomer,
  validator.query(validateListRoomStatus),
  common.checkAuth,
  async (req, res) => {
    try {
      // To check valid token
      if (res.statusCode !== 200) {
        return;
      }

      // Check the access privilage of user
      if (req.body.userType !== "customer") {
        let result = {
          status: messages.failure,
          statusCode: 401,
          message: messages.noAccess,
        };
        return response.send({
          result,
          res,
        });
      }

      const result = await bookRooms.listRoomStatusByCustomer({ req });
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
 * CLOSE BOOKED ROOM STATUS BY OWNER
 */
router.put(url.changeStatus, common.checkAuth, async (req, res) => {
  try {
    // To check valid token
    if (res.statusCode !== 200) {
      return;
    }

    // Check the access privilage of user
    if (req.body.userType !== "owner") {
      let result = {
        status: messages.failure,
        statusCode: 401,
        message: messages.noAccess,
      };
      return response.send({
        result,
        res,
      });
    }

    const result = await bookRooms.changeStatus({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});
module.exports = router;
