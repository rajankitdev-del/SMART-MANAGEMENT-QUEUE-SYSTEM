const Joi = require("joi");

const tokenSchema = Joi.object({
  userId: Joi.string().required(),
  queueId: Joi.string().required()
});

module.exports = tokenSchema;