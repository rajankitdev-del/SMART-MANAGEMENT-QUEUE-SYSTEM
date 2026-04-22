const Joi = require('joi');

const schemas = {
  // Token creation schema
  tokenGenerate: Joi.object({
    locationId: Joi.string().required(),
    serviceType: Joi.string().valid('General', 'Premium', 'VIP').required(),
  }),

  // Optional: User schema (placeholder)
  userLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
};

module.exports = schemas;
