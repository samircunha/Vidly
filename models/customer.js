const mongoose = require("mongoose");
const Joi = require('joi');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 255,
        required: true
    },
    phone: {
        type: String,
        minLength: 9,
        maxLength: 15,
        required: true,
        unique: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(9).max(15).required(),
    isGold: Joi.boolean()
});

module.exports.Customer = mongoose.model("Customers", customerSchema);
module.exports.validateCustomer = function (customer) {
    return schema.validate(customer);
}