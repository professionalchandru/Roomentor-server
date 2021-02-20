"use strict";

const multer = require("multer");
const path = require("path");
const messages = require("../constants/messages");

/**
 * Multer Config
 */
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error(messages.unSupportedFileFormat), false);
      return;
    }
    cb(null, true);
  },
});
