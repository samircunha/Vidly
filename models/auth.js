const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().min(10).max(255).required().email(),
  password: Joi.string().min(5).max(50).required(),
});

module.exports.validateAuth = function (user) {
  return schema.validate(user);
};
