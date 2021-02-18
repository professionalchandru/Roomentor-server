"use strict";

const bcrypt = require("bcryptjs");
const utils = require("../utils/common");
const customerModel = require("../model/customer");
const messages = require("../constants/messages");

class CustomerController {
  async signUp({ req }) {
    try {
      //Generate hash password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      let createdBy = utils.createdBy({ req });

      const customerData = {
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

      //To check existing customer
      const customerEmail = await customerModel.findOne({
        email: req.body.email,
      });
      const customerMobile = await customerModel.findOne({
        mobil: req.body.mobile,
      });

      if (customerEmail || customerMobile) {
        let response = {
          status: messages.failure,
          statusCode: 409,
          message: messages.customerAlreadyExist,
        };
        return response;
      }

      const customerObj = new customerModel(customerData);

      const newCustomer = await customerObj.save();

      let response = {
        status: messages.success,
        statusCode: 200,
        message: newCustomer._id,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new CustomerController();
