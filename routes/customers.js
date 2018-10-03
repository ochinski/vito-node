const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');


// /* GET all users  */
// router.get('/users', function(req, res, next) {
//     User.find({}).then (function (users) {
//         res.send(users);
//     }).catch (next)
// });

/* GET ALL customers */
router.get('/customers', function(req,res,next) {
    Customer.find({}).then(function (customer) {
        res.send(customer);
    }).catch(next)
})

/* POST new customer */
router.post ('/customers',function(req,res, next) {
    Customer.create(req.body).then(function (customer) {
        res.send (customer);
    }).catch (next)
});

// const CustomerDB = require('../fakedb/Customers');

/* GET all customer information page. */
// router.get('/customers', function(req, res) {
//     res.json (CustomerDB);
// });


module.exports = router;