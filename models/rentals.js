const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = mongoose.Schema({
  customer: mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 255,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
}),
  movie: mongoose.Schema({
    title: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    dailyRentalRate: {
      type: Number,
      min: 5,
      max: 255,
      required: true,
    },
    dateOut: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  }),
});

const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
})

module.exports.Rentals = mongoose.model("Rentals", rentalSchema);
module.exports.validateRental = function (rental) {
    return schema.validate(rental);
}