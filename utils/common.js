"use strict";

const jwt = require("jsonwebtoken");
const messages = require("../constants/messages");

module.exports = {
  /**
   * TO MAKE CREATEDBY DETAILS
   * @param {req}
   * @returns {string} createdBy
   */
  createdBy: function ({ req }) {
    let info = {};
    info.requestMethod = req.method;
    info.userAgent = req.headers["user-agent"];
    info.remoteAddress =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    info.pathInfo = req.orignialUrl;
    info.user = req.hasOwnProperty("user") ? req.user : "user";
    return JSON.stringify(info);
  },

  /**
   * Authentication middleware to verify user using JWT token
   * @returns {promise}
   * @param {string} jwt_token
   */
  checkAuth: async function (authReq, authRes, next) {
    try {
      const token = authReq.headers.authorization.split(" ")[1];

      if (token == "" || token == undefined) {
        throw new Error();
      }

      await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return authRes.status(401).send({
            status: messages.failure,
            message: err,
          });
        } else {
          authReq.body.userId = decoded.tokenParams.user.id;
        }
      });
      next();
    } catch (err) {
      if (err) {
        console.log(err);
        return authRes.status(400).send({
          status: messages.failure,
          message: messages.tokenVerificationFailed,
        });
      }
    }
  },
};
