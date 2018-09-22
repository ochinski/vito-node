const express = require('express');
const AccountsDB = require('./fakedb/Accounts');
const admin = require('./routes/admin');
const mongoose = require('mongoose');

var path = require('path');
// var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
const app = express();

// connect to mongoDB
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds263832.mlab.com:63832/heroku_d7j8xzvr');
mongoose.Promise = global.Promise;


app.use(bodyParser.json());


app.use(express.json());      

// initalize routes
app.use('/api', admin);
app.get ('/', function (req, res) {
    res.send('Hello World!');
})
// error handing middleware
app.use(function(err, req, res, next) {
    res.send({error: err.message})
});

app.listen(8080, () => console.log('Listening on port 8080!'));
