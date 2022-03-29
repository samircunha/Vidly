const mongoose = require('mongoose'); 
const Joi = require('joi');
const {genreSchema} = require('./genre');

const movieSchema = mongoose.Schema({
    title: {
        type: String, 
        minlength: 5, 
        maxlength: 255,
        required: true
    },
    genre: {
        type: genreSchema,
        requried: true
    },
    numberInStock: {
        type: Number,
        min: 0, 
        max: 255, 
        required: true
    },
    dailyRentalRate: {
        type: Number,
        min: 5,  
        max: 255, 
        required: true
    }
});

const schema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required().min(0).max(255),
    dailyRentalRate: Joi.number().required().min(5).max(255),
});

module.exports.Movies = mongoose.model("Movies", movieSchema);
module.exports.validateMovie = function(movie){
    return schema.validate(movie);
}
