const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(process.env.DB)
        .then(()=>{
            console.log('Connected on MongoDB');
        }).catch(ex => console.log(ex.message)); 
}
