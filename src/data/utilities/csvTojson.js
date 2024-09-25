const fs = require('fs');
const Papa = require("papaparse");

function csvToJson(filePath) {
    try {
        const csvData = fs.readFileSync(filePath, 'utf8');   

        const results = Papa.parse(csvData, {
            header: true,               
            dynamicTyping: true          
        });

        return results.data;
    
    } catch (error) {
        console.error("Error reading or parsing the CSV file:", error);
        return null;
    }
}


module.exports = csvToJson;
