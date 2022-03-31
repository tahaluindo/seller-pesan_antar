const Joi = require('joi');

const DrinkPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price : Joi.number().required(),
});

module.exports = { DrinkPayloadSchema };