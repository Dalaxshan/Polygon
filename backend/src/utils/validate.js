// src/utils/validate.js
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required()
});

module.exports = { registerSchema, loginSchema, postSchema };