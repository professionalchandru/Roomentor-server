"use strict";

const router = require("express").Router();
const owner = require("../controller/owner");
const url = require("../constants/urlConstants");
const response = require("../utils/response");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { validateSignUp } = require("../schema/owner");
const message = require("../constants/messages");

/**
 * TO CREATE ACCOUNT FOR OWNERS
 */
router.post(
  url.ownerSignup,
  validator.body(validateSignUp),
  async (req, res) => {
    try {
      const result = await owner.signUp({ req });
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
