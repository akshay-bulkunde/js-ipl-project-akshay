const csvToJson = require('../utilities/csvTojson');  // Adjust the path to where the function is exported

const matchesJson = csvToJson('src/data/csvfiles/matches.csv');
if (matchesJson) {
    const fs = require('fs');
    fs.writeFileSync('matches.json', JSON.stringify(matchesJson, null, 2));  // Save the JSON to a file
}