const express = require('express');
const router = express.Router();
const Order = require('../models/order');

/* GET all orders  */
router.get('/orders/:name/:limit/:skip', function(req, res, next) {
    var parsSkip = parseInt(req.params.skip);
    var parsLimit = parseInt(req.params.limit);
    Order.find({name:req.params.name}).limit(parsLimit).skip(parsSkip).then (function (order) { 
        console.log('GET / ', req.params);
        res.send(order);
    }).catch (next)
});

/* GET single MAIN order */
router.get('/orders/:date', function (req, res, next) {
    Order.find({date:req.params.date}).then (function (order) {
        console.log ('GET ORDER with /', req.params.date);
        res.send(order);
    }).catch (next)
});

router.get('/orders/:date/:isTime', function (req,res,next) {
    Order.find({orders: { date:req.params.date}}).then (function (order) {
        console.log ('GET ORDER with /', req.params.date);
        res.send(order);
    }).catch (next)
});

/* POST new orders */
router.post ('/orders',function(req,res, next) {
    Order.create(req.body).then(function (order) {
        res.send (order);
    }).catch (next)
});

module.exports = router;