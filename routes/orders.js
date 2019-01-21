const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const spawn = require('child_process').spawn;
const fs = require('fs');

const parseObject = require('./scripts/parseObject');

const bodyParser = require('body-parser');
// express.use(bodyParser.urlencoded({ extended: false }));

const path = require('path');
const scriptFilename = path.join(__dirname, 'scripts', 'test.py');

const parse = require("./scripts/parseObject.js");



/* GET Order with within days range */
router.get('/orders/:end/:days/:year/:month/:day', function(req, res, next) { 
    // var endDate = req.params.end;
    var days = req.params.days;
    var tmpEndMonth = req.params.month - 1;
    var tmpStartMonth = req.params.month - 1;
    var date = 0;
    var startDate = 0;
    console.log(req.params.end);
    console.log('the given day : ',req.params.day);
    // var endDate = new Date(req.params.year,tmpEndMonth,req.params.day);
    var endDate = new Date(req.params.end);
    var startDate = new Date(req.params.year,tmpStartMonth,req.params.day);
    console.log(endDate);
    console.log(startDate);

    var est = { timeZone: "America/New_York" };
    endDate.toLocaleString("en-US", est);
    startDate.toLocaleString("en-US", est);

    // startDate.setDate(endDate.getDate() - days);

    console.log(startDate, ' to ', endDate, ' after ', days,' days');

    var endYear = endDate.getFullYear();
    var endMonth = endDate.getMonth() + 1;
    var endDay = endDate.getDate();
    console.log('end date : ', endDay);

    var startYear = startDate.getFullYear();
    var startMonth = startDate.getMonth() + 1;
    var startDay = startDate.getDate();

    if (startMonth < 10 ) startMonth = '0' + startMonth;
    if (endMonth < 10 ) endMonth = '0' + endMonth;

    console.log(`${startYear}-${startMonth}-${startDay} to ${endYear}-${endMonth}-${endDay}`);

    var sDate = `${startYear}-${startMonth}-${startDay}`;
    var eDate = `${endYear}-${endMonth}-${endDay}`;

    Order.find ({
        date: {
            $gte : sDate,
            $lt : eDate
        }
    }).then (function (order){
        res.send(order);
    }).catch(next)
});

/* GET orders  with skip*/
// router.get('/orders/:name/:skip/', function(req, res, next) {
//     console.log('we in');
//     var parsSkip = parseInt(req.params.skip);
//     var parsLimit = parseInt(req.params.limit);
//     Order.find({name:req.params.name}).limit(10).skip(parsSkip).then (function (order) { 
//         console.log('GET / ', req.params);
//         res.send(order);
//     }).catch (next)
// });

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

// router.get('/orders/:date/:isTime', function (req,res,next) {
//     Order.find({orders: { date:req.params.date}}).then (function (order) {
//         console.log ('GET ORDER with /', req.params.date);
//         res.send(order);
//     }).catch (next)
// });

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