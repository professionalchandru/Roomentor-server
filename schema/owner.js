"use strict";

const Joi = require("joi");

/**
 * VALIDATE OWNER DETAILS WHILE SIGNUP
 */
const validateSignUp = Joi.object()
  .keys({
    name: Joi.string().min(3).max(50).trim().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      })
      .min(3)
      .max(50)
      .trim()
      .required(),
    mobile: Joi.number().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .max(30)
      .trim()
      .required(),
    confirmPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .max(30)
      .trim()
      .required(),
    type: Joi.string().valid("owner").trim().required(),
    address: Joi.string().min(3).max(250).trim().required(),
    city: Joi.string().min(3).max(50).trim().required(),
    state: Joi.string().min(3).max(50).trim().required(),
    pincode: Joi.number().integer().required(),
    securityQuestion: Joi.string().min(3).max(250).trim().required(),
    securityAnswer: Joi.string().min(3).max(250).trim().required(),
    noOfRooms: Joi.number().default(0),
  })
  .required();

/**
 * VALIDATE OWNER DETAILS WHILE EDIT
 */
const validateEdit = Joi.object()
  .keys({
    name: Joi.string().min(3).max(50).trim().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      })
      .min(3)
      .max(50)
      .trim()
      .required(),
    mobile: Joi.number().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .max(30)
      .trim()
      .required(),
    address: Joi.string().min(3).max(250).trim().required(),
    city: Joi.string().min(3).max(50).trim().required(),
    state: Joi.string().min(3).max(50).trim().required(),
    pincode: Joi.number().integer().required(),
    securityQuestion: Joi.string().min(3).max(250).trim().required(),
    securityAnswer: Joi.string().min(3).max(250).trim().required(),
  })
  .required();

/**
 * VALIDATE OWNER CREDENTIALS WHILE SIGNIN
 */
const validateSignIn = Joi.object()
  .keys({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      })
      .min(3)
      .max(50)
      .trim()
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .max(30)
      .trim()
      .required(),
    type: Joi.string().valid("owner").trim().required(),
  })
  .required();

module.exports = { validateSignUp, validateSignIn, validateEdit };
