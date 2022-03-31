const Joi = require('joi');

const ShopPayloadSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  no_phone : Joi.string().required(),
});

module.exports = { ShopPayloadSchema };