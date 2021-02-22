"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const message = require("./constants/messages");
const routes = require("./routes");

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Origin",
    "Accept",
    "Accept-version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Authorization",
    "upload-length",
    "upload-metadata",
  ],
};

/**
 * Middlewares declaration and use
 */
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

/**
 * Routing middlewares
 */
app.use("/", routes.owner);
app.use("/", routes.customer);
app.use("/", routes.room);
app.use("/", routes.bookRooms);

/** Middleware to return a error message of JOI validation */
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    });
  } else {
    next(err);
  }
});

/**
 * Db connection
 */
const port = process.env.PORT || 5000;

let dbOptions = {
  dbName: "roomentor",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true,
};

mongoose.connect(process.env.DB_URI, dbOptions, (err) => {
  if (err) {
    console.log(message.dbConnectionError);
    console.log(err);
  } else {
    console.log(message.dbConnectionSuccess);
  }
});

app.listen(port, () => console.log(message.appListening, port));
