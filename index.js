const express = require('express');
const AccountsDB = require('./fakedb/Accounts');
const admin = require('./routes/admin');
const mongoose = require('mongoose');

var path = require('path');
// var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
const app = express();

// connect to mongoDB
mongoose.connect('mongodb://localhost/vitoUsergo');
mongoose.Promise = global.Promise;


app.use(bodyParser.json());


app.use(express.json());      

// initalize routes
app.use('/api', admin);

// error handing middleware
app.use(function(err, req, res, next) {
    res.send({error: err.message})
});

app.listen(8080, () => console.log('Listening on port 8080!'));
