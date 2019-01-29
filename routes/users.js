const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET all users  */
router.get('/users', function(req, res, next) {
    User.find({}).then (function (users) {
        console.log('/ user req');
        res.send(users);
    })
    .catch(function(error){
        console.log('Error getting the posts');
    });
});

// GET Drivers
router.get('/users/drivers', function(req,res,next) {
    console.log(' USERS / get DRIVERS');
    User.find({ driver : true})
    .then (function (users) {
        console.log('/ user / drivers req');
        res.send(users);
    })
    .catch(function(error) {
        console.log('Error getting the posts');
    })
})

/* DELETE specific USER */
router.delete('/users/:name' , function (req, res) {
    User.deleteOne({name: req.params.name})
    .exec()
    .catch (err => res.status(500).send(err) )
    .then (function () {
        console.log('/ user delete:name');
        console.log('DELETED / ', req.params.name);
    })
});

/* POST new users */
router.post ('/users',function(req,res, next) {
    User.create(req.body).then(function (user) {
        console.log('/ user post');
        res.send (user);
    }).catch (next)
});

module.exports = router;