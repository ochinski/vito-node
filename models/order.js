//Import the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// define order schema
const orderScheme = new Schema({
    name : { type : String },
    date : { type : String },
    customerName : { type : String },
    customerPhone : { type : String },
    orders : { type : Array}
});

const Order = mongoose.model('order',orderScheme);

module.exports = Order;

