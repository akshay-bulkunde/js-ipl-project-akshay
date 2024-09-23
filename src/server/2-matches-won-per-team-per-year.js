//Number of matches won per team per year in IPL.
const matches = require('../csvTojson/matches.json');

function getMatchesWonPerTeamPerYear(matches){
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

console.log(getMatchesWonPerTeamPerYear(matches));


// function getMatchesWonPerTeamPerYear(matches){
//     let matchesWonPerTeamPerYear = matches.reduce((teamStats , match) => {
//         let season = match["season"];
//         let WinnigTeam = match["winner"];
//         const defaultObject = {season : "" , count : 0};
//         if(teamStats.length === 0){
//             teamStats.push({season : defaultObject.season});
//         }else{
//             let hasSeasonKey = teamStats.some((item) => item.hasOwnProperty("season"));
//             if(!hasSeasonKey){
//                 teamStats.push({season : defaultObject.season});
//             }
//             else{
//                 teamStats.push({season : WinnigTeam })
//             }
//         }
//     })
// }