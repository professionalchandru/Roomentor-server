"use strict";

const messages = require("../constants/messages");

module.exports = {
  send: function ({ result, res }) {
    let statusCode = result.statusCode || 200;
    let data;
    if (result.status == messages.success) {
      data = {
        statusCode: statusCode,
        success: true,
        data: result,
      };
    } else {
      data = {
        statusCode: statusCode,
        success: false,
        data: result,
      };
    }

    return res.status(statusCode).send(data);
  },
};
