//File A
// const myLib = require('myLib'); // gets cached don't worry about multiple files requiring the same module
const spawn = require('child_process').spawn;
const fs = require('fs');

function parseObject ( data ){
    var driver = data.driver;
    var name = data.name;
    var date = data.date;
    var tagDate = data.tagDate;
    var custName = data.customerName;
    var custPhone = data.customerPhone;
    var order = data.order;
    var cleanOrder = [];
    cleanOrder.push (
        name
    )
    cleanOrder.push (
        '\n'
    )
    cleanOrder.push (
        date
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
        'Driver : ' + driver
    )
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
            i++
            cleanOrder.push(
                '\n'
            )
        }
        if (order[i].includes('Order : Pizza')){
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
                'TOPPINGS\n'
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
            i++ 
            cleanOrder.push(
                order[i]
            )
            cleanOrder.push(
                '\n'
            )
        }
        if (order[i].includes('Order : Sub') || order[i].includes('Order : Panzerotti')) {
            cleanOrder.push (
                order[i]
            )
            i++
            cleanOrder.push (
                order[i]
            )
            i+=5;
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
            cleanOrder.push(
                '\n'
            )

        }
        if (order[i].includes('Order : Split Pizza')) {
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
            i+=5;
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
            cleanOrder.push(
                '\n'
            )
        }
    }
    // cleanOrder.join("");
    var finalOrder = cleanOrder.join('');
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