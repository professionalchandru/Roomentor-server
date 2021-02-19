"use strict";

const router = require("express").Router();
const customer = require("../controller/customer");
const url = require("../constants/urlConstants");
const response = require("../utils/response");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  validateSignUp,
  validateSignIn,
  validateEdit,
} = require("../schema/customer");
const messages = require("../constants/messages");
const common = require("../utils/common");

/**
 * TO CREATE ACCOUNT FOR CUSTOMERS
 */
router.post(
  url.customerSignup,
  validator.body(validateSignUp),
  async (req, res) => {
    try {
      const result = await customer.signUp({ req });
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
 * EDIT EXISTITNG CUSTOMER ACCOUNT DETAILS
 */
router.put(
  url.customerEdit,
  validator.body(validateEdit),
  common.checkAuth,
  async (req, res) => {
    try {
      const result = await customer.editCustomer({ req });
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
 * DELETE CUSTOMER ACCOUNT USING ID
 */
router.delete(url.customerDelete, common.checkAuth, async (req, res) => {
  try {
    const result = await customer.deleteCustomer({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});

/**
 * TO SIGNIN AS CUSTOMER
 *
 */
router.post(
  url.customerSignin,
  validator.body(validateSignIn),
  async (req, res) => {
    try {
      const result = await customer.signIn({ req });
      return response.send({
        result,
        res,
      });
    } catch (err) {
      throw err;
    }
  }
);

module.exports = router;
