// Number of matches played per year for all the years in IPL.
const matches = require('../csvTojson/matches.json');

function matchesPerYear(matches){
    let numberOfMatches = matches.reduce((matchesCount , match) => {
        let season = match["season"];
        if(!matchesCount.hasOwnProperty(season)){
            matchesCount[season] = 0;
        }
        matchesCount[season] += 1;
        return matchesCount;

    }, {})
    return numberOfMatches;
}

console.log(matchesPerYear(matches))