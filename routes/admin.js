const express = require('express');
const router = express.Router();
const User = require('../models/user');

// const AcountsDB = require('../fakedb/Accounts');

/* GET all users  */
router.get('/users', function(req, res) {
    User.find({}).then (function (users) {
        res.send(users);
    })
});

/* POT new users */
router.post ('/users',function(req,res, next) {
    User.create(req.body).then(function (user) {
        res.send (user);
    }).catch (next)
});

module.exports = router;