//Import the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// define user schema
const userSchema = new Schema({
    name : { type : String },
    pin : { type : Number }
});

const User = mongoose.model('user',userSchema);

module.exports = User;

