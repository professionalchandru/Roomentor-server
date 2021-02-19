"use strict";

const router = require("express").Router();
const owner = require("../controller/owner");
const url = require("../constants/urlConstants");
const response = require("../utils/response");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  validateSignUp,
  validateSignIn,
  validateEdit,
} = require("../schema/owner");
const common = require("../utils/common");
const messages = require("../constants/messages");

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

/**
 * TO SIGNIN AS OWNER
 *
 */
router.post(
  url.ownerSignin,
  validator.body(validateSignIn),
  async (req, res) => {
    try {
      const result = await owner.signIn({ req });
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
 * EDIT EXISTITNG OWNER ACCOUNT DETAILS
 */
router.put(
  url.ownerEdit,
  validator.body(validateEdit),
  common.checkAuth,
  async (req, res) => {
    try {
      const result = await owner.editOwner({ req });
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
 * DELETE OWNER ACCOUNT USING ID
 */
router.delete(url.ownerDelete, common.checkAuth, async (req, res) => {
  try {
    const result = await owner.deleteOwner({ req });
    return response.send({
      result,
      res,
    });
  } catch (err) {
    throw err;
  }
});
module.exports = router;
