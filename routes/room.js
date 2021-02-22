"use strict";

const router = require("express").Router();
const room = require("../controller/room");
const url = require("../constants/urlConstants");
const response = require("../utils/response");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  validateAddRoom,
  validateEditRoom,
  validateListRoom,
} = require("../schema/room");
const messages = require("../constants/messages");
const common = require("../utils/common");
const upload = require("../utils/multer");

/**
 * ADD NEW ROOM
 */
router.post(
  url.addRoom,
  validator.body(validateAddRoom),
  common.checkAuth,
  async (req, res) => {
    try {
      // To check valid token
      if (res.statusCode !== 200) {
        return;
      }

      // Check the access privilage of user
      let accessCheck = await checkAccess(req.body.userType);
      if (!accessCheck) {
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
      // To check valid token
      if (res.statusCode !== 200) {
        return;
      }

      // Check the access privilage of user
      let accessCheck = await checkAccess(req.body.userType);
      if (!accessCheck) {
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
    // To check valid token
    if (res.statusCode !== 200) {
      return;
    }

    // Check the access privilage of user
    let accessCheck = await checkAccess(req.body.userType);
    if (!accessCheck) {
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

    const result = await room.deleteRoom({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});

/**
 * LIST ROOMS
 */
router.get(
  url.listRooms,
  validator.query(validateListRoom),
  common.checkAuth,
  async (req, res) => {
    try {
      // To check valid token
      if (res.statusCode !== 200) {
        return;
      }
      const result = await room.listRooms({ req });
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
 * LIST ROOMS BASED ON CITY NAME
 */
router.get(
  url.listRoomsByCity,
  validator.query(validateListRoom),
  common.checkAuth,
  async (req, res) => {
    try {
      // To check valid token
      if (res.statusCode !== 200) {
        return;
      }
      const result = await room.listRoomsByCity({ req });
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
 * SELECT ROOM BY ID
 */
router.get(url.selectRoom, common.checkAuth, async (req, res) => {
  try {
    // To check valid token
    if (res.statusCode !== 200) {
      return;
    }
    const result = await room.selectRoomById({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});

/**
 * UPLOAD ROOM IMAGES
 */
router.put(
  url.uploadImages,
  upload.array("image"),
  common.checkAuth,
  async (req, res) => {
    try {
      // To check valid token
      if (res.statusCode !== 200) {
        return;
      }

      // Check the access privilage of user
      let accessCheck = await checkAccess(req.body.userType);
      if (!accessCheck) {
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

      const result = await room.uploadImages({ req });
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
 * DELETE ROOM IMAGES
 */
router.delete(url.deleteImages, common.checkAuth, async (req, res) => {
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

    const result = await room.deleteImages({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});

/**
 * AVAILABLITY CALENDER FOR ROOM BY ROOM ID
 */
router.get(url.availablityCalender, common.checkAuth, async (req, res) => {
  try {
    // To check valid token
    if (res.statusCode !== 200) {
      return;
    }

    const result = await room.availableDates({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});

// Function to check the access privilage of user
const checkAccess = async (userType) => {
  let isOwner = false;
  if (userType == "owner") {
    isOwner = true;
  }
  return isOwner;
};

module.exports = router;
