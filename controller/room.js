"use strict";

const bcrypt = require("bcryptjs");
const utils = require("../utils/common");
const roomModel = require("../model/room");
const owner = require("../controller/owner");
const messages = require("../constants/messages");
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

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
   * UPLOAD ROOM IMAGES USING ROOM ID
   * @param {_id}
   * @returns {object}
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
    } catch (err) {}
  }
}

module.exports = new RoomController();
