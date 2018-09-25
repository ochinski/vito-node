const express = require('express');
const mongoose = require('mongoose');

// add routes
const admin = require('./routes/admin');
const order = require('./routes/order');

var path = require('path');
var bodyParser = require('body-parser');

// declare express app
const app = express();

// connect to mongoDB and check for special req
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/vitoUsergo'
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());


app.use(express.json());      

// initalize routes
app.use('/api',admin);
app.use('/api',order);

// error handing middleware
app.use(function(err, req, res, next) {
    res.send({error: err.message})
});

app.listen(8080, () => console.log('Listening on port 8080!'));
