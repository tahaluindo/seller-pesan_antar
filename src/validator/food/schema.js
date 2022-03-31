const Joi = require('joi');

const FoodPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price : Joi.number().required(),
});

module.exports = { FoodPayloadSchema };