const express = require('express');
const router = express.Router();
const Order = require('../models/order');

/* GET all orders  */
router.get('/orders/:name/:skip', function(req, res, next) {
    console.log('we in');
    var parsSkip = parseInt(req.params.skip);
    var parsLimit = parseInt(req.params.limit);
    Order.find({name:req.params.name}).limit(10).skip(parsSkip).then (function (order) { 
        console.log('GET / ', req.params);  ``
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

/* GET all customer order's */
router.get('/orders/:name/:phone/:page', function (req, res, next) {
    console.log(res.body);
    console.log(req.params.page);
    var parsSkip = parseInt(req.params.page);
    if (parsSkip == 0) {
        console.log(parsSkip);
        Order.find({customerName:req.params.name, customerPhone:req.params.phone}).limit(5).sort({$natural:-1}).then (function (order) {
            console.log ('GET ORDER with with limit/', req.params.name, '/', req.params.phone, '/',parsSkip);
            res.send(order);
            res.send(req.params);
        }).catch (next)
    } else {
        console.log('called second');
        Order.find({customerName:req.params.name, customerPhone:req.params.phone}).skip(parsSkip).limit(5).sort({$natural:-1}).then (function (order) {
            console.log ('GET ORDER with with limit/', req.params.name, '/', req.params.phone, '/',parsSkip);
            res.send(order);
        }).catch (next)
    }
    // Order.find({customerName:req.params.name, customerPhone:req.params.phone}).then (function (order) {
    //     console.log ('GET ORDER with /', req.params.name, ' and ', req.params.phone);
    //     res.send(order);
    // }).catch (next)
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