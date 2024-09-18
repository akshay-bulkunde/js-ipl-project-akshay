const fs = require("fs");

const Papa = require("papaparse");

const deliveriesCSV = fs.readFileSync("../csvfiles/deliveries.csv",'utf8');

Papa.parse(deliveriesCSV,{
    header:true,
    dynamicTyping:true,
    complete:(results)=>{
        const data = JSON.stringify(results.data,null,2);

        fs.writeFileSync('deliveries.json',data);
    }
})