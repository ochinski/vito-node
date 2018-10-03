const express = require('express');
const router = express.Router();
const User = require('../models/user');

// const AcountsDB = require('../fakedb/Accounts');

/* GET all users  */
router.get('/users', function(req, res, next) {
    User.find({}).then (function (users) {
        res.send(users);
    }).catch (next)
});

/* DELETE specific USER */
router.delete('/users/:name' , function (req, res) {
    User.deleteOne({name: req.params.name})
    .exec()
    .catch (err => res.status(500).send(err) )
    .then (function () {
        console.log('DELETED / ', req.params.name);
    })
});

/* POST new users */
router.post ('/users',function(req,res, next) {
    User.create(req.body).then(function (user) {
        res.send (user);
    }).catch (next)
});

module.exports = router;