const express = require('express');
const router = express.Router();
const Order = require('../models/order');

/* GET all orders  */
router.get('/orders/:name/:limit/:skip', function(req, res) {
    var parsSkip = parseInt(req.params.skip);
    var parsLimit = parseInt(req.params.limit);
    Order.find({name:req.params.name}).limit(parsLimit).skip(parsSkip).then (function (orders) { 
        console.log('GET / ', req.params);
        res.send(orders);
    })
});

/* POST new orders */
router.post ('/orders',function(req,res, next) {
    Order.create(req.body).then(function (order) {
        res.send (order);
    }).catch (next)
});

module.exports = router;