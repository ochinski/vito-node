const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const spawn = require('child_process').spawn;
const fs = require('fs');

const parseObject = require('./scripts/parseObject');
const parseObjectDriver = require('./scripts/parseObjectDriver');

const bodyParser = require('body-parser');

const path = require('path');
const scriptFilename = path.join(__dirname, 'scripts', 'test.py');

const parse = require("./scripts/parseObject.js");
const parseDriver = require("./scripts/parseObjectDriver.js");

const mongoose = require('mongoose');

/* GET Order with within days range */
router.get('/orders/:end/:days/:year/:month/:day', function(req, res, next) { 
    var days = req.params.days;
    var tmpEndMonth = req.params.month - 1;
    var tmpStartMonth = req.params.month - 1;
    var date = 0;
    var startDate = 0;

    var tmpEndDate = req.params.end + "T00:00:00.000-08:00";
    var tmpStartDate = req.params.year + "-" + req.params.month + "-" + req.params.day +"T00:00:00.000-08:00";
    var endDate = new Date(tmpEndDate);
    var startDate = new Date(tmpStartDate);

    var est = { timeZone: "America/New_York" };
    endDate.toLocaleString("en-US", est);
    startDate.toLocaleString("en-US", est);

    var endYear = endDate.getFullYear();
    var endMonth = endDate.getMonth() + 1;
    var endDay = endDate.getDate();

    var startYear = startDate.getFullYear();
    var startMonth = startDate.getMonth() + 1;
    var startDay = startDate.getDate();

    if (startMonth < 10 ) startMonth = '0' + startMonth;
    if (endMonth < 10 ) endMonth = '0' + endMonth;

    var sDate = `${startYear}-${startMonth}-${startDay}`;
    var eDate = `${endYear}-${endMonth}-${endDay}`;
    Order.find ({
        date: {
            $gte : sDate,
            $lte : eDate
        }
    }).then (function (order){
        res.send(order);
        console.log('/orders analytics date');
    }).catch(next)
});

/* GET orders  with skip , User order details*/
router.get('/orders/:name/:skip/', function(req, res, next) {
    var parsSkip = parseInt(req.params.skip);
    var parsLimit = parseInt(req.params.limit);
    Order.find({name:req.params.name}).limit().sort({$natural:-1}).skip(parsSkip).then (function (order) { 
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

/* GET all order with DRIVER's req */
router.get('/orders_drivers', function (req, res, next) {
    Order.find({driverReq : true}).limit().sort({$natural:-1}).skip().then (function (order) { 
        console.log('GET drivers Added FALSE / ', req.params);
        res.send(order);
    }).catch (next)
});

/* post new Driver */
router.post('/orders_drivers', function (req, res, next) {
    console.log(req.body);
    Order.update({
        _id: mongoose.Types.ObjectId(req.body.id)
        },
        {
        $set: {
            driver:req.body.driver, driverReq:false
        }
        }, 
        // { new: true }, // If you want to return updated order
        function (err, updatedOrder) { 
        if (err) throw err;
        console.log('UPDATE new driver', updatedOrder);
    })
}); 

/* get non printed Drivers */
router.get('/orders_drivers/print', function (req, res, next) {
    Order.find({isPrinted : false}).limit().sort({$natural:-1}).skip().then (function (order) { 
        console.log('GET drivers Added FALSE / ', req.params);
        res.send(order);
    }).catch (next)
});

/* updated printed Driver */
router.post('/orders_drivers/print', function (req, res, next) {
    Order.updateMany({
        isPrinted: false,driverReq:false
    }, 
    {
        $set: {
            isPrinted: true
        }
        },
        function (err, updatedOrder) { 
            if (err) throw err;
            // console.log('UPDATE order to PRINTED -- TRUE', updatedOrder);
        })
        
}); 
router.post ('/orders_drivers/printRecord',function(req,res,next) {
    console.log('we printer printRecord');
    parseDriver.parseObjectDriver(req.body);
})
    // req.body.forEach( order => {
    //     console.log(order)
    //     console.log(order.id)
    //     Order.update({
    //         _id: mongoose.Types.ObjectId(order)
    //     },
    //     {
    //         $set: {
    //             isPrinted:true,
    //     }
    //     }, 
    //     // { new: true }, // If you want to return updated order
    //     function (err, updatedOrder) { 
    //         if (err) throw err;
    //     console.log('Updated Driver Record - - PRINTED', updatedOrder);
    //     })

/* GET all customer order's */
router.get('/orders/:name/:phone/:page', function (req, res, next) {
    var parsSkip = parseInt(req.params.page);
    if (parsSkip == 0) {
        Order.find({customerName:req.params.name, customerPhone:req.params.phone}).limit(5).sort({$natural:-1}).then (function (order) {
            console.log ('GET ORDER with with limit/', req.params.name, '/', req.params.phone, '/',parsSkip);
            res.send(order);
            res.send(req.params);
        }).catch (next)
    } else {
        Order.find({customerName:req.params.name, customerPhone:req.params.phone}).skip(parsSkip).limit(5).sort({$natural:-1}).then (function (order) {
            console.log ('GET ORDER with with limit/', req.params.name, '/', req.params.phone, '/',parsSkip);
            res.send(order);
        }).catch (next)
    }
});


router.post ('/orders/printer',function(req,res, next) {
    parse.parseObject(req.body);
});


/* POST new orders */
router.post ('/orders',function(req,res, next) {
    Order.create(req.body).then(function (order) {
        res.send (order);
    }).catch (next)
});

module.exports = router;