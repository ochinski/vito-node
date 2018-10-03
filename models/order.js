//Import the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// define order schema
const orderScheme = new Schema({
    name : { type : String },
    date : { type : String },
    customer : { type : Array },
    orders : { type : Array}
});

const Order = mongoose.model('order',orderScheme);

module.exports = Order;

