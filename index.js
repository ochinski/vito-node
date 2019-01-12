const express = require('express');
const mongoose = require('mongoose');

var fs = require('fs');
var url = require('url');

// add routes
const users = require('./routes/users');
const orders = require('./routes/orders');
const customers = require('./routes/customers');

const path = require('path');
const bodyParser = require('body-parser');

// declare express app
const app = express();
const PORT = 8080;


const db = 'mongodb://localhost/vitoUsergo';
var isConnected = true;
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
    if(err) {
        isConnected = false;
        console.log('Connection error');
    }
});

app.use(bodyParser.json());
app.use(express.json());      
app.use(express.static(path.join(__dirname, 'build')));

// initalize routes
app.use('/api',users);
app.use('/api',orders);
app.use('/api',customers);

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// });


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// error handing middleware
app.use(function(err, req, res, next) {
    res.send({error: err.message})
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
