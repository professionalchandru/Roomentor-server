"use strict";

const bcrypt = require("bcryptjs");
const utils = require("../utils/common");
const roomModel = require("../model/room");
const owner = require("../controller/owner");
const messages = require("../constants/messages");
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const moment = require("moment");

class RoomController {
  /**
   * ADD NEW ROOM BY OWNER
   * @param {req.body}
   * @returns {room object_id}
   */
  async addRoom({ req }) {
    try {
      let createdBy = utils.createdBy({ req });

      const roomData = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        landMark: req.body.landMark,
        status: "available",
        type: req.body.type,
        noOfBeds: req.body.noOfBeds,
        size: req.body.size,
        minimumBookingPeriod: req.body.minimumBookingPeriod,
        maximumBookingPeriod: req.body.maximumBookingPeriod,
        rentPerDay: req.body.rentPerDay,
        amenities: req.body.amenities,
        // photos: req.body.photos,
        ownerReference: req.body.userId,
        createdAt: new Date(),
        createdBy: createdBy,
      };

      const roomObj = new roomModel(roomData);

      const newRoom = await roomObj.save();

      if (newRoom) {
        await owner.updateNoOfRooms(req.body.userId, newRoom._id, "add");
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: newRoom._id,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * EDIT ROOM BY OWNER USING ROOM ID
   * @param {req.body, _id}
   * @returns {message}
   */
  async editRoom({ req }) {
    try {
      let createdBy = utils.createdBy({ req });

      let validRoom = await roomModel.findOne({ _id: req.params.roomId });

      if (!validRoom) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidRoom,
        };
        return response;
      }

      const roomData = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        landMark: req.body.landMark,
        type: req.body.type,
        noOfBeds: req.body.noOfBeds,
        size: req.body.size,
        minimumBookingPeriod: req.body.minimumBookingPeriod,
        maximumBookingPeriod: req.body.maximumBookingPeriod,
        rentPerDay: req.body.rentPerDay,
        amenities: req.body.amenities,
        // photos: req.body.photos,
        updatedAt: new Date(),
        updatedBy: createdBy,
      };

      await roomModel.updateOne({ _id: req.params.roomId }, { $set: roomData });

      let response = {
        status: messages.success,
        statusCode: 200,
        message: messages.roomUpdatedSuccessfully,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * DELETE ROOM BY OWNER USING ROOM ID
   * @param {_id}
   * @returns {message}
   */
  async deleteRoom({ req }) {
    try {
      let validRoom = await roomModel.findOne({ _id: req.params.roomId });

      if (!validRoom) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidRoom,
        };
        return response;
      }

      if (validRoom.datesBooked.length) {
        let response = {
          status: messages.failure,
          statusCode: 409,
          message: messages.cannotDeleteRooms,
        };
        return response;
      }

      let deleteRoom = await roomModel.deleteOne({ _id: req.params.roomId });

      if (deleteRoom) {
        await owner.updateNoOfRooms(
          req.body.userId,
          req.params.roomId,
          "remove"
        );
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: messages.roomDeletedSuccessfully,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * SELECT ROOM BY ID
   * @param {_id}
   * @returns {room object}
   */
  async selectRoomById({ req }) {
    try {
      let getRoom = await roomModel.findOne({ _id: req.params.roomId });

      if (!getRoom) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidRoom,
        };
        return response;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: getRoom,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * LIST ALL ROOMS
   * @param {}
   * @returns {rooms array}
   */
  async listRooms({ req }) {
    try {
      let limit = req.query.limit ? req.query.limit : 10;
      let offset = req.query.offset ? req.query.offset : 0;
      let getRoom;

      if (!offset) {
        getRoom = await roomModel.find({}).limit(limit);
      } else if (limit && offset) {
        getRoom = await roomModel.find({}).skip(offset).limit(limit);
      } else if (!limit && !offset) {
        getRoom = await roomModel.find({}).limit(10);
      }

      if (!getRoom) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.noRoomsFound,
        };
        return response;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: getRoom,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * LIST ALL ROOMS BASED ON CITY NAME
   * @param {city_name}
   * @returns {rooms array}
   */
  async listRoomsByCity({ req }) {
    try {
      let limit = req.query.limit ? req.query.limit : 10;
      let offset = req.query.offset ? req.query.offset : 0;
      let getRoom;

      if (!offset) {
        getRoom = await roomModel
          .find({ city: req.params.cityName })
          .limit(limit);
      } else if (limit && offset) {
        getRoom = await roomModel
          .find({ city: req.params.cityName })
          .skip(offset)
          .limit(limit);
      } else if (!limit && !offset) {
        getRoom = await roomModel.find({ city: req.params.cityName }).limit(10);
      }

      if (!getRoom) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.noRoomsFound,
        };
        return response;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: getRoom,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * UPLOAD ROOM IMAGES USING ROOM ID
   * @param {_id}
   * @returns {object array}
   */
  async uploadImages({ req }) {
    try {
      const getRoom = await roomModel.findOne({ _id: req.params.roomId });
      if (!getRoom) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidRoom,
        };
        return response;
      }

      // Steps to save images in cloudinary object storage and retrive url and public_id
      const files = req.files;
      let results = [];

      for (const file of files) {
        const output = await cloudinary.uploader.upload(file.path, {
          folder: "Room Images",
        });
        results.push({
          url: output.secure_url,
          id: output.public_id,
        });
      }

      // Step to store retrived url and public id from cloudinary to database
      let roomData = await roomModel.updateOne(
        { _id: req.params.roomId },
        { $push: { photos: results } }
      );

      if (!roomData) {
        let response = {
          status: messages.failure,
          statusCode: 400,
          message: messages.defaultMessage,
        };
        return response;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: messages.uploadedSuccessfully,
      };
      return response;
    } catch (err) {}
  }

  /**
   * DELETE ROOM IMAGES USING ROOM ID
   * @param {_id, req.body}
   * @returns {object}
   */
  async deleteImages({ req }) {
    try {
      const getRoom = await roomModel.findOne({ _id: req.params.roomId });
      if (!getRoom) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidRoom,
        };
        return response;
      }

      // Steps to destory image in cloudinary object storage
      await cloudinary.uploader.destroy(req.body.imageId);

      // Step to remove  url and public id from to database
      let roomData = await roomModel.updateOne(
        { _id: req.params.roomId },
        { $pull: { photos: { id: req.body.imageId } } }
      );

      if (!roomData) {
        let response = {
          status: messages.failure,
          statusCode: 400,
          message: messages.defaultMessage,
        };
        return response;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: messages.removedSuccessfully,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * AVAILABLE DATES FOR ROOM BY ROOM ID
   * @param {_id} objectId_room
   * @returns {array objects}
   */
  async availableDates({ req }) {
    try {
      const getRoom = await roomModel.findOne({ _id: req.params.roomId });
      if (!getRoom) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidRoom,
        };
        return response;
      }

      let oldDatesBooked = getRoom.datesBooked;
      let startDate = moment();
      let endDate = moment().add(60, "days");
      let now = startDate.clone();
      startDate = moment(startDate, "DD-MM-YYYY");
      endDate = moment(endDate, "DD-MM-YYYY");
      now = moment(now, "DD-MM-YYYY");
      let dates = [];

      while (now.isSameOrBefore(endDate)) {
        dates.push(now.format("DD-MM-YYYY"));
        now.add(1, "days");
      }

      let alreadyBookedDates = [];

      // Filter Booked Dates
      for (const obj of oldDatesBooked) {
        let newMomentStartDate = moment(obj.startDate, "DD-MM-YYYY");
        let newMomentEndDate = moment(obj.endDate, "DD-MM-YYYY");

        while (newMomentStartDate.isSameOrBefore(newMomentEndDate)) {
          alreadyBookedDates.push(newMomentStartDate.format("DD-MM-YYYY"));
          newMomentStartDate.add(1, "days");
        }
      }

      // To filter available dates from total dates and booking dates
      let availableDates = [];
      if (alreadyBookedDates.length) {
        availableDates = dates.filter(
          (val) => !alreadyBookedDates.includes(val)
        );
      } else {
        availableDates = dates;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: {
          availableDate: availableDates,
          bookedDates: alreadyBookedDates,
        },
      };
      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new RoomController();
