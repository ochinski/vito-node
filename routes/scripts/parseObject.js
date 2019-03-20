//File A
// const myLib = require('myLib'); // gets cached don't worry about multiple files requiring the same module
const spawn = require('child_process').spawn;
const fs = require('fs');

function parseObject ( data ){
    console.log(data);
    console.log('creating print order');
    var driver = data.driver;
    var name = data.name;
    var date = data.date;
    var dateWT = data.dateWT;
    var tagDate = data.tagDate;
    var custName = data.customerName;
    var custPhone = data.customerPhone;
    var custStreet = data.customerStreet;
    var custCity = data.customerCity;
    var deliveryCost = data.deliveryCost;
    var order = data.order;
    var total = data.total;
    var taxTotal = data.taxTotal
    var finalTotal = data.finalTotal;
    var cleanOrder = [];
    console.log('var created.. building doc..\n');
    cleanOrder.push (
        name
    )
    cleanOrder.push (
        '\n'
    )
    cleanOrder.push (
        dateWT
    )
    cleanOrder.push (
        '\n'
    )
    cleanOrder.push (
        'Customer Name: ' + custName
    )
    cleanOrder.push (
        '\n'
    )
    cleanOrder.push (
        'Customer Phone: ' + custPhone
    )
    cleanOrder.push (
        '\n'
    )
    cleanOrder.push (
        'Customer Street: ' + custStreet
    )
    cleanOrder.push (
        '\n'
    )
    cleanOrder.push (
        'Customer City: ' + custCity
    )
    cleanOrder.push (
        '\n'
    )
    if (deliveryCost > 0) {
        cleanOrder.push (
            'Dilvery REQUIRED'
        )
    }
    cleanOrder.push (
        '\n'
    )
    cleanOrder.push (
        '\n'
    )
    cleanOrder.push (
        order
    )
    if (deliveryCost > 0) {
        cleanOrder.push (
            'Delivery Cost : $' + deliveryCost + '\n'
        )
    }
    cleanOrder.push (
        'Total : $' + total + '\n'
    )
    cleanOrder.push (
        'Tax Total : $' + taxTotal + '\n'
    )
    cleanOrder.push( 
        'Final : $' + finalTotal + '\n'
    )
    var finalOrder = cleanOrder.join('');
    console.log('logging order');
    console.log(finalOrder);
    fs.writeFile('./public/'+ data.name + '_' + data.tagDate + '.txt',
    // data.name + '\n' + data.date + '\n' + data.custName + '\n' + data.custPhone + '\n' + data.order
    finalOrder,
    function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    }); 
};

module.exports.parseObject = parseObject; // export your functuion