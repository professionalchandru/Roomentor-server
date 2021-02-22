"use strict";

const utils = require("../utils/common");
const roomModel = require("../model/room");
const roomStatusModel = require("../model/roomStatus");
const messages = require("../constants/messages");
const moment = require("moment");
class BookRoomsController {
  /**
   * CHECK DATE AND BOOK ROOM BY CUSTOMER
   * @param {req.body, _id}
   * @returns {message}
   */
  async bookRoom({ req }) {
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

      const userStartDate = req.body.startDate;
      const userEndDate = req.body.endDate;
      let admission;
      let discharge;

      // Check no of days user selected
      let noOfDays;
      if (userStartDate == userEndDate) {
        let response = {
          status: messages.failure,
          statusCode: 400,
          message: messages.minumumStayPeriod,
        };
        return response;
      } else {
        admission = moment(userStartDate, "DD-MM-YYYY");
        discharge = moment(userEndDate, "DD-MM-YYYY");
        if (!admission.isValid() || !discharge.isValid()) {
          let response = {
            status: messages.failure,
            statusCode: 400,
            message: messages.inValidDates,
          };
          return response;
        }
        noOfDays = discharge.diff(admission, "days");
      }

      if (
        noOfDays < validRoom.minimumBookingPeriod ||
        noOfDays > validRoom.maximumBookingPeriod
      ) {
        let response = {
          status: messages.failure,
          statusCode: 409,
          message: messages.stayPeriodIncorrect,
        };
        return response;
      } else if (noOfDays < 0) {
        let response = {
          status: messages.failure,
          statusCode: 409,
          message: messages.cannotChoosePreviousDates,
        };
        return response;
      }

      let oldDatesBooked = validRoom.datesBooked;

      for (const obj of oldDatesBooked) {
        let newMomentStartDate = moment(obj.startDate, "DD-MM-YYYY");
        let newMomentEndDate = moment(obj.endDate, "DD-MM-YYYY");

        if (
          admission.isBetween(newMomentStartDate, newMomentEndDate) ||
          discharge.isBetween(newMomentStartDate, newMomentEndDate) ||
          admission.isSame(newMomentStartDate) ||
          admission.isSame(newMomentEndDate) ||
          discharge.isSame(newMomentStartDate) ||
          discharge.isSame(newMomentEndDate) ||
          newMomentStartDate.isBetween(admission, discharge) ||
          newMomentEndDate.isBetween(admission, admission) ||
          newMomentStartDate.isSame(admission) ||
          newMomentStartDate.isSame(discharge) ||
          newMomentEndDate.isSame(admission) ||
          newMomentEndDate.isSame(discharge)
        ) {
          let response = {
            status: messages.failure,
            statusCode: 409,
            message: `Already Booked From ${obj.startDate} to ${obj.endDate}`,
          };
          return response;
        }
      }

      const datesBooked = {
        startDate: userStartDate,
        endDate: userEndDate,
        noOfDays: noOfDays,
        amountToPay: noOfDays * validRoom.rentPerDay,
        customerReference: req.body.userId,
      };

      let roomStatus = await this.roomStatus(validRoom, datesBooked, createdBy);
      if (!roomStatus || roomStatus == null || roomStatus == undefined) {
        let response = {
          status: messages.failure,
          statusCode: 400,
          message: messages.defaultMessage,
        };
        return response;
      }

      datesBooked.roomStatusRef = roomStatus._id;
      await roomModel.updateOne(
        { _id: req.params.roomId },
        {
          $push: { datesBooked },
          $set: { updatedAt: new Date(), updatedBy: createdBy },
        }
      );

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
   * TO CREATE NEW ROOM STATUS AND BOOKING DETAILS FOR OWNER
   * @param {room table data} oldData
   * @param {updated dates} updatedData
   * @param {request createdby} createdBy
   * @returns {object}
   */
  async roomStatus(oldData, updatedData, createdBy) {
    try {
      let newRoomStatus = null;
      let newData = {
        ownerInfo: oldData.ownerReference,
        roomInfo: oldData._id,
        customerInfo: updatedData.customerReference,
        noOfDaysBooked: updatedData.noOfDays,
        totalAmount: updatedData.amountToPay,
        startDate: updatedData.startDate,
        endDate: updatedData.endDate,
        roomStatus: "Booked",
        createdAt: new Date(),
        createdBy: createdBy,
      };

      const roomStatusObj = new roomStatusModel(newData);

      newRoomStatus = await roomStatusObj.save();

      return newRoomStatus;
    } catch (err) {
      throw err;
    }
  }

  /**
   * LIST ROOMS STATUS BY OWNER ID
   * @param {limt and offset}
   * @returns {object}
   */
  async listRoomStatusByOwner({ req }) {
    try {
      let limit = req.query.limit ? req.query.limit : 10;
      let offset = req.query.offset ? req.query.offset : 0;
      let getOwnerById;

      if (!offset) {
        getOwnerById = await roomStatusModel
          .find({ ownerInfo: req.params.ownerId })
          .limit(limit);
      } else if (limit && offset) {
        getOwnerById = await roomStatusModel
          .find({ ownerInfo: req.params.ownerId })
          .skip(offset)
          .limit(limit);
      } else if (!limit && !offset) {
        getOwnerById = await roomStatusModel
          .find({ ownerInfo: req.params.ownerId })
          .limit(10);
      }

      if (!getOwnerById) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidOwner,
        };
        return response;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: getOwnerById,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * LIST BOOKED ROOMS BY CUSTOMER ID
   * @param {limt and offset}
   * @returns {object}
   */
  async listRoomStatusByCustomer({ req }) {
    try {
      let limit = req.query.limit ? req.query.limit : 10;
      let offset = req.query.offset ? req.query.offset : 0;
      let getCustomerById;

      if (!offset) {
        getCustomerById = await roomStatusModel
          .find({ customerInfo: req.params.customerId, roomStatus: "Booked" })
          .limit(limit);
      } else if (limit && offset) {
        getCustomerById = await roomStatusModel
          .find({ customerInfo: req.params.customerId, roomStatus: "Booked" })
          .skip(offset)
          .limit(limit);
      } else if (!limit && !offset) {
        getCustomerById = await roomStatusModel
          .find({ customerInfo: req.params.customerId, roomStatus: "Booked" })
          .limit(10);
      }

      if (!getCustomerById) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidCustomer,
        };
        return response;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: getCustomerById,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * TO CHANGE ROOM STATUS AND VACATE ROOM BY OWNER
   */
  async changeStatus({ req }) {
    try {
      let createdBy = utils.createdBy({ req });

      let getRoomStatus = await roomStatusModel.findOne({
        _id: req.params.statusId,
      });

      if (!getRoomStatus) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.roomStatusNotFound,
        };
        return response;
      }

      // remove already booked dates from room table
      let roomDetails = await roomModel.updateOne(
        {
          _id: getRoomStatus.roomInfo,
        },
        {
          $pull: {
            datesBooked: {
              startDate: getRoomStatus.startDate,
              endDate: getRoomStatus.endDate,
              customerReference: getRoomStatus.customerInfo,
            },
          },
        }
      );

      if (!roomDetails) {
        let response = {
          status: messages.failure,
          statusCode: 400,
          message: messages.defaultMessage,
        };
        return response;
      }

      // Update room status after customer vacate room
      let changeStatus = await roomStatusModel.updateOne(
        { _id: req.params.statusId },
        {
          $set: {
            roomStatus: "Vacated",
            updatedAt: new Date(),
            updatedBy: createdBy,
          },
        }
      );

      if (!changeStatus) {
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
        message: messages.roomStatusUpdatedSuccessFully,
      };

      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new BookRoomsController();
