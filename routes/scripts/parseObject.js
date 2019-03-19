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
    var order = data.order;
    var cleanOrder = [];
    var total = data.total;
    var taxTotal = data.taxTotal
    var finalTotal = data.finalTotal;
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
    if (order.dilverReq) {
        cleanOrder.push (
            'Dilvery REQUIRED'
        )
    }
    cleanOrder.push (
        '\n'
    )
    for (let i = 0; i < order.length; i++) {
        if (order[i].includes('-')) {
            i++
        }
        if (order[i].includes('Slice')){
            cleanOrder.push(
                order[i]
            )
            cleanOrder.push(
                '\n'
            )
        }
        if (order[i].includes('Order : Side')) {
            cleanOrder.push(
                order[i]
            )
            i++
            cleanOrder.push(
                order[i]
            )
            i++
            cleanOrder.push(
                order[i]
            )
            i++
            cleanOrder.push(
                order[i]
            )
            // i+=15;
            cleanOrder.push(
                '\n'
            )
        }
        if (order[i].includes('Order : Pizza')){
            cleanOrder.push ( // order
                order[i]
            )
            i++
            cleanOrder.push ( // quantity
                order[i]
            )
            i+=3; // skip extra, skip details
            cleanOrder.push ( // size
                order[i]
            )
            i++
            cleanOrder.push ( //crust
                order[i]
            )
            cleanOrder.push ( // display toppings
                ' ---------- TOPPINGS  ---------- \n'
            )
            i++
            cleanOrder.push( // display toppings
                order[i]
            )
            i+=3
            // cleanOrder.push(
            //     order[i]
            // )
            // i++
            // cleanOrder.push(
            //     order[i]
            // )
            // i++ 
            cleanOrder.push(
                order[i]
            )
            cleanOrder.push(
                '\n'
            )
        }
        if (order[i].includes('Order : Sub') || order[i].includes('Order : Panzerotti')) {
            cleanOrder.push (   // order type
                order[i]
            )
            i++
            cleanOrder.push ( // quantity
                order[i]
            )
            i+=4; // skip crust and size
            cleanOrder.push (
                ' ---------- TOPPINGS  ---------- \n'
            )
            cleanOrder.push(
                order[i]
            )
            i++
            cleanOrder.push(
                order[i]
            )
            i++ 
            cleanOrder.push(
                order[i]
            )
            i++ 
            cleanOrder.push(
                order[i]
            )
            // i+=8;
            cleanOrder.push(
                '\n'
            )

        }
        
        if (order[i].includes('Order : Split Pizza')) {
            console.log('check point 3: ' + cleanOrder);
            cleanOrder.push (
                order[i]
            )
            i++
            cleanOrder.push (
                order[i]
            )
            i+=3;
            cleanOrder.push (
                order[i]
            )
            i++
            cleanOrder.push (
                order[i]
            )
            cleanOrder.push (
                ' ---------- toppings LEFT SIDE  ---------- \n'
            )
            // i+=5;
            cleanOrder.push(
                order[i]
            )
            i++
            cleanOrder.push(
                order[i]
            )
            i++ 
            cleanOrder.push (
                order[i]
            )

            i++
            cleanOrder.push(
                order[i]
            )
            cleanOrder.push (
                ' ---------- toppings RIGHT SIDE ---------\n'
            )
            i++;
            cleanOrder.push(
                order[i]
            )
            i++
            cleanOrder.push(
                order[i]
            )
            i++ 
            cleanOrder.push (
                order[i]
            )
            i++ 
            cleanOrder.push (
                order[i]
            )
            i++ 
            cleanOrder.push(
                '\n'
            )
        }
    }
    cleanOrder.push (
        'Total: ' + total + '\n'
    )
    cleanOrder.push (
        'Tax Total: ' + taxTotal + '\n'
    )
    cleanOrder.push( 
        'Final : ' + finalTotal + '\n'
    )
    console.log('final stop \n' + cleanOrder);
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