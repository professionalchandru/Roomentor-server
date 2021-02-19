"use strict";

const bcrypt = require("bcryptjs");
const utils = require("../utils/common");
const ownerModel = require("../model/owner");
const messages = require("../constants/messages");
const jwt = require("jsonwebtoken");

class OwnerController {
  /**
   * CREATE NEW OWNER USING SIGNUP
   * @param {req.body}
   * @returns {owner object_id}
   */
  async signUp({ req }) {
    try {
      //Generate hash password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      let createdBy = utils.createdBy({ req });

      const ownerData = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashPassword,
        type: req.body.type,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        securityQuestion: req.body.securityQuestion,
        securityAnswer: req.body.securityAnswer,
        createdAt: new Date(),
        createdBy: createdBy,
      };

      //To check existing owner
      const ownerEmail = await ownerModel.findOne({
        email: req.body.email,
      });
      const ownerMobile = await ownerModel.findOne({
        mobil: req.body.mobile,
      });

      if (ownerEmail || ownerMobile) {
        let response = {
          status: messages.failure,
          statusCode: 409,
          message: messages.ownerAlreadyExist,
        };
        return response;
      }

      const ownerObj = new ownerModel(ownerData);

      const newOwner = await ownerObj.save();

      let response = {
        status: messages.success,
        statusCode: 200,
        message: newOwner._id,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * UPDATE OWNER DETAILS
   * @param {req.body}
   * @returns {message}
   */
  async editOwner({ req }) {
    try {
      let validOwner = await ownerModel.findOne({ _id: req.params.ownerId });

      if (!validOwner) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidOwner,
        };
        return response;
      }

      //Generate hash password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      let createdBy = utils.createdBy({ req });

      const ownerData = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashPassword,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        securityQuestion: req.body.securityQuestion,
        securityAnswer: req.body.securityAnswer,
        updatedAt: new Date(),
        updatedBy: createdBy,
      };

      await ownerModel.updateOne(
        { _id: req.params.ownerId },
        { $set: ownerData }
      );

      let response = {
        status: messages.success,
        statusCode: 200,
        message: messages.ownerUpdatedSuccessfully,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * DELETE USER BY ID
   * @param {_id}
   * @returns {message}
   */
  async deleteOwner({ req }) {
    try {
      let validOwner = await ownerModel.findOne({ _id: req.params.ownerId });

      if (!validOwner) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidOwner,
        };
        return response;
      }

      await ownerModel.deleteOne({ _id: req.params.ownerId });

      let response = {
        status: messages.success,
        statusCode: 200,
        message: messages.ownerDeletedSuccessfully,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * OWNER SIGNIN
   * @param {req.body}
   * @returns jwt token for authorised owner
   */
  async signIn({ req }) {
    try {
      //To check existing owner
      const ownerEmail = await ownerModel.findOne({
        email: req.body.email,
      });

      if (!ownerEmail) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.ownerNotFound,
        };
        return response;
      }

      const verifyPassword = await bcrypt.compare(
        req.body.password,
        ownerEmail.password
      );

      let token;
      if (!verifyPassword) {
        let response = {
          status: messages.failure,
          statusCode: 403,
          message: messages.invalidPassword,
        };
        return response;
      } else {
        token = await this.tokenGenerator(ownerEmail, verifyPassword);
      }

      if (token == null) {
        let response = {
          status: messages.failure,
          statusCode: 401,
          message: messages.unAuthourized,
        };
        return response;
      }

      let response = {
        status: messages.success,
        statusCode: 200,
        message: token,
      };
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * CREATE JWT TOKEN
   * @param {req.body}
   * @returns {jwt token}
   */
  async tokenGenerator(ownerEmail, verifyPassword) {
    const ownerData = {
      id: ownerEmail._id,
      name: ownerEmail.name,
      email: ownerEmail.email,
      type: ownerEmail.type,
    };

    let issuedAt = Math.round(Date.now() / 1000);

    const tokenParams = {
      iat: issuedAt,
      jti: ownerEmail._id,
      user: ownerData,
    };

    let token = null;
    if (verifyPassword) {
      token = jwt.sign({ tokenParams }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    }
    return token;
  }

  /**
   * UPDATE NO OF ROOMS OF OWNER AND UPDATE ROOM REFERENCE ID
   * @param {_id}
   * @returns {message}
   */
  async updateNoOfRooms(ownerId, roomId, action) {
    try {
      let owner = await ownerModel.findOne({ _id: ownerId });
      let roomsReference = owner.roomsReference;
      let newRoomsReference;
      let index;
      if (roomsReference.includes(roomId)) {
        index = roomsReference.indexOf(roomId);
        newRoomsReference = roomsReference.splice(index, 1);
      } else {
        newRoomsReference = [...roomsReference, roomId];
      }
      let newNoOfRooms;
      let result = null;
      if (action == "add") {
        newNoOfRooms = owner.noOfRooms ? owner.noOfRooms + 1 : 1;
        result = await ownerModel.updateOne(
          { _id: ownerId },
          {
            $set: {
              noOfRooms: newNoOfRooms,
              roomsReference: newRoomsReference,
            },
          }
        );
      } else if (action == "remove") {
        newNoOfRooms = owner.noOfRooms ? owner.noOfRooms - 1 : 0;
        result = await ownerModel.updateOne(
          { _id: ownerId },
          {
            $set: {
              noOfRooms: newNoOfRooms,
              roomsReference: newRoomsReference,
            },
          }
        );
      }
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new OwnerController();
