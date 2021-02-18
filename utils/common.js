"use strict";

module.exports = {
  createdBy: function ({ req }) {
    let info = {};
    info.requestMethod = req.method;
    // info.requestTime = moment().format("MMMM Do YYYY, h:mm:ss a");
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
};
