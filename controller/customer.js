"use strict";

const bcrypt = require("bcryptjs");
const utils = require("../utils/common");
const customerModel = require("../model/customer");
const messages = require("../constants/messages");
const jwt = require("jsonwebtoken");
const roomStatusModel = require("../model/roomStatus");

class CustomerController {
  /**
   * CREATE NEW CUSTOMER USING SIGNUP
   * @param {req.body}
   * @returns {customer object_id}
   */
  async signUp({ req }) {
    try {
      // Check Password And Confirm password are Same
      if (req.body.password != req.body.confirmPassword) {
        let response = {
          status: messages.failure,
          statusCode: 409,
          message: messages.passwordMissMatch,
        };
        return response;
      }

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
        mobile: req.body.mobile,
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

  /**
   * UPDATE CUSTOMER DETAILS
   * @param {req.body}
   * @returns {message}
   */
  async editCustomer({ req }) {
    try {
      let validCustomer = await customerModel.findOne({
        _id: req.params.customerId,
      });

      if (!validCustomer) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidCustomer,
        };
        return response;
      }

      //Generate hash password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      let createdBy = utils.createdBy({ req });

      const customerData = {
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

      await customerModel.updateOne(
        { _id: req.params.customerId },
        { $set: customerData }
      );

      let response = {
        status: messages.success,
        statusCode: 200,
        message: messages.customerUpdatedSuccessfully,
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
  async deleteCustomer({ req }) {
    try {
      let validCustomer = await customerModel.findOne({
        _id: req.params.customerId,
      });

      if (!validCustomer) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.invalidCustomer,
        };
        return response;
      }
      let customerRoomStatus = await roomStatusModel.findOne({
        customerInfo: req.params.customerId,
        roomStatus: "Booked",
      });
      if (customerRoomStatus) {
        let response = {
          status: messages.failure,
          statusCode: 400,
          message: messages.cannotDeleteCustomer,
        };
        return response;
      }
      await customerModel.deleteOne({ _id: req.params.customerId });

      let response = {
        status: messages.success,
        statusCode: 200,
        message: messages.customerDeletedSuccessfully,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * CUSTOMER SIGNIN
   * @param {req.body}
   * @returns jwt token for authorised customer
   */
  async signIn({ req }) {
    try {
      //To check existing customer
      const customerEmail = await customerModel.findOne({
        email: req.body.email,
      });

      if (!customerEmail) {
        let response = {
          status: messages.failure,
          statusCode: 404,
          message: messages.customerNotFound,
        };
        return response;
      }

      const verifyPassword = await bcrypt.compare(
        req.body.password,
        customerEmail.password
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
        token = await this.tokenGenerator(customerEmail, verifyPassword);
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
   * @returns {customer object_id}
   */
  async tokenGenerator(customerEmail, verifyPassword) {
    const customerData = {
      id: customerEmail._id,
      name: customerEmail.name,
      email: customerEmail.email,
      type: customerEmail.type,
    };

    let issuedAt = Math.round(Date.now() / 1000);

    const tokenParams = {
      iat: issuedAt,
      jti: customerEmail._id,
      user: customerData,
    };

    let token = null;
    if (verifyPassword) {
      token = jwt.sign({ tokenParams }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    }
    return token;
  }
}

module.exports = new CustomerController();
