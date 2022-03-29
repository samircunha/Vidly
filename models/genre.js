const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 55,
    required: true,
  },
});

const schema = Joi.object({
  name: Joi.string().min(5).max(55).required(),
});

module.exports.Genres = mongoose.model("Genres", genreSchema);
module.exports.genreSchema = genreSchema;
module.exports.genreValidate = function (genre) {
  return schema.validate(genre);
};
