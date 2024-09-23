// Extra runs conceded per team in the year 2016

const fs = require('fs');
const matches = require('../../csvTojson/matches.json');
const deliveries = require('../../csvTojson/deliveries.json');

function getMatchId(matches) {
    let matchIds = matches.reduce((matchId, match) => {
        let id = match["id"];
        let season = match["season"];
        if (season === 2016) {
            matchId.push(id);
        }
        return matchId;
    }, [])
    return matchIds;
}

let matchIds = getMatchId(matches);


function getExtraRunsConcededByTeam(deliveries, matchIds) {
    let extraRunsByTeam = deliveries.reduce((extraRunsConceded, delivery) => {
        let matchid = delivery["match_id"];
        if (matchIds.includes(matchid)) {
            let bowlingTeam = delivery["bowling_team"];
            let extraRuns = delivery["extra_runs"];

            if (!extraRunsConceded.hasOwnProperty(bowlingTeam)) {
                extraRunsConceded[bowlingTeam] = extraRuns;
            }
            extraRunsConceded[bowlingTeam] += extraRuns;
        }
        return extraRunsConceded;
    }, {})
    return extraRunsByTeam;
}

let extraRunsByTeam = getExtraRunsConcededByTeam(deliveries , matchIds);

try {
    fs.writeFileSync('../public/output/extraRunsByTeam.json', JSON.stringify(extraRunsByTeam, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}