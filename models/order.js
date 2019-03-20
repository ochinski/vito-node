//Import the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define order schema
const orderScheme = new Schema({
    name : { type : String },
    date : { type : String },
    customerName : { type : String },
    customerPhone : { type : String },
    customerStreet : { type : String},
    customerCity : {type : String},
    orders : { type : Array},
    driver : {type : String },
    driverReq : {type : Boolean},
    isPrinted : {type : Boolean},
    deliveryCost : {type : String},
    total : {type : String},
    taxTotal : {type : String},
    finalTotal : {type : String}
});

const Order = mongoose.model('order',orderScheme);

module.exports = Order;

