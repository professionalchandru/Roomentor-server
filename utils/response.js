"use strict";

const messages = require("../constants/messages");

module.exports = {
  /**
   * COMMON FUNCTION TO SEND RESPONSE TO CLIENT
   * @param {response}
   */
  send: function ({ result, res }) {
    let statusCode = result.statusCode || 200;
    let data;
    if (result.status == messages.success) {
      delete result.statusCode;
      delete result.status;
      data = {
        // statusCode: statusCode,
        success: true,
        data: result,
      };
    } else {
      delete result.statusCode;
      delete result.success;
      data = {
        // statusCode: statusCode,
        success: false,
        data: result,
      };
    }

    return res.status(statusCode).send(data);
  },
};
