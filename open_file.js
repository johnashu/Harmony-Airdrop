// Open file and put addresses into a list to iterate over
var fName = 'addresses.csv';

const lineByLine = require('n-readlines');
const liner = new lineByLine(fName);

let line;
 
while (line = liner.next()) {
    var sendAddress = line.toString('utf8');
    console.log(sendAddress);
}