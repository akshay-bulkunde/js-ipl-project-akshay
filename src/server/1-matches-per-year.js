// Number of matches played per year for all the years in IPL.
const fs = require('fs');
const matches = require('../data/jsonData/matches.json');

function getmatchesPerYear() {
    let numberOfMatches = matches.reduce((matchesCount, match) => {
        let season = match["season"];
        if (!matchesCount.hasOwnProperty(season)) {
            matchesCount[season] = 0;
        }
        matchesCount[season] += 1;
        return matchesCount;

    }, {})
    return numberOfMatches;
}

let matchesPerYear = getmatchesPerYear();


try {
    fs.writeFileSync('../public/output/matchesPerYear.json', JSON.stringify(matchesPerYear, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}


