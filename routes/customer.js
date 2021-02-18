"use strict";

const router = require("express").Router();
const customer = require("../controller/customer");
const url = require("../constants/urlConstants");
const response = require("../utils/response");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { validateSignUp } = require("../schema/customer");
const message = require("../constants/messages");

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

module.exports = router;
