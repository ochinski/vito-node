//Import the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// define order schema
const customerSchema = new Schema({
    name : { type : String },
    street : { type : String },
    city : { type : String },
    phone : { type : String },
    order : { type : Array }
});

const Customer = mongoose.model('customer',customerSchema);

module.exports = Customer;

