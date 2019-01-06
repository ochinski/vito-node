const express = require('express');
const mongoose = require('mongoose');

// add routes
const users = require('./routes/users');
const orders = require('./routes/orders');
const customers = require('./routes/customers');

const path = require('path');
var bodyParser = require('body-parser');

// declare express app
const app = express();
const PORT = 8080;


// app.listen(9000);

// connect to mongoDB and check for special req
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/vitoUsergo'
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());


app.use(express.json());      
app.use(express.static(path.join(__dirname, 'build')));

// initalize routes
app.use('/api',users);
app.use('/api',orders);
app.use('/api',customers);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

// error handing middleware
app.use(function(err, req, res, next) {
    res.send({error: err.message})
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
