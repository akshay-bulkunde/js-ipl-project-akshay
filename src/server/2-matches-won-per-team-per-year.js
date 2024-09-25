//Number of matches won per team per year in IPL.
const matches = require('../data/jsonData/matches.json');
const fs = require('fs');

function getMatchesWonPerTeamPerYear(){
    let matchesWonPerTeamPerYear = matches.reduce((teamStats , match) => {
        let season = match["season"];
        let WinnigTeam = match["winner"];
        if(!teamStats.hasOwnProperty(season)){
            teamStats[season] = {};
        }
        if(!teamStats[season].hasOwnProperty(WinnigTeam)){
            teamStats[season][WinnigTeam] = 0;
        }
        teamStats[season][WinnigTeam] += 1;
        return teamStats;

        


    }, {})
    return matchesWonPerTeamPerYear;
}

let matchesWonPerTeamPerYear = getMatchesWonPerTeamPerYear();

try {
    fs.writeFileSync('../public/output/matchesWonPerTeamPerYear.json', JSON.stringify(matchesWonPerTeamPerYear , null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}
