const csvToJson = require('../utilities/csvTojson');  // Adjust the path to where the function is exported

const deliveriesJson = csvToJson('src/data/csvfiles/deliveries.csv');
if (deliveriesJson) {
    const fs = require('fs');
    fs.writeFileSync('deliveries.json', JSON.stringify(deliveriesJson, null, 2));  // Save the JSON to a file
}