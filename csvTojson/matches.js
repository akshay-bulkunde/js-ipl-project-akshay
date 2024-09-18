const fs = require("fs");

const Papa = require("papaparse");

const matchesCSV = fs.readFileSync("../csvfiles/matches.csv",'utf8');

Papa.parse(matchesCSV,{
    header:true,
    dynamicTyping:true,
    complete:(results)=>{
        const data = JSON.stringify(results.data,null,2);

        fs.writeFileSync('matches.json',data);
    }
})