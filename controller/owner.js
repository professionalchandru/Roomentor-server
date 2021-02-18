"use strict";

const bcrypt = require("bcryptjs");
const utils = require("../utils/common");
const ownerModel = require("../model/owner");
const messages = require("../constants/messages");

class OwnerController {
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
}

module.exports = new OwnerController();
