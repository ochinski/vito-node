//File A
// const myLib = require('myLib'); // gets cached don't worry about multiple files requiring the same module
const spawn = require('child_process').spawn;
const fs = require('fs');

function parseObjectDriver ( data ){
    console.log('creating driver record with.. ');
    console.log(data);
    var newRecord = [];
    
    newRecord.push (
        data.createRecord
    )
    newRecord = newRecord.join('');
    console.log(newRecord);
    fs.writeFile('./public/driverRecord/'+ '_' + Date.now()+ '.txt',
    newRecord,
    function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    }); 
};

module.exports.parseObjectDriver = parseObjectDriver; // export your functuion