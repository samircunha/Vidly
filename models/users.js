const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: { 
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true
    },
    email: { 
        type: String,
        unique: true,
        minLength: 10,
        maxlength: 255,
        required: true
    },
    password: { 
        type: String,
        required: true,
        minLength: 5, 
        maxLength: 1024,
    },
    isAdmin: { 
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWTPRIVATEKEY);
    return token;
}

const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(5).max(50).required(),
    isAdmin: Joi.boolean(),
});

module.exports.Users = mongoose.model('Users', userSchema);
module.exports.validateUser = function (user) {
    return schema.validate(user);
}