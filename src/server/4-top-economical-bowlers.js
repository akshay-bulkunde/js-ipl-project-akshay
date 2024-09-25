// Top 10 economical bowlers in the year 2015
const fs = require('fs');
const matches = require('../data/jsonData/matches.json');
const deliveries = require('../data/jsonData/deliveries.json');

function getMatchId(matches) {
    let matchIds = matches.reduce((matchId, match) => {
        let season = match["season"];
        if (season === 2015) {
            matchId.push(match["id"]);
        }
        return matchId;
    }, [])
    return matchIds;
}

let matchIds = getMatchId(matches);

function getTopEconomicalBowlers(deliveries, matchIds) {
    let bowlerStats = deliveries.reduce((topBowlers, delivery) => {
        let matchId = delivery["match_id"];
        if (matchIds.includes(matchId)) {
            let bowler = delivery["bowler"];
            let runsConceded = delivery["total_runs"] - delivery["legbye_runs"] - delivery["bye_runs"] - delivery["penalty_runs"];

            if (!topBowlers.hasOwnProperty(bowler)) {
                topBowlers[bowler] = { runsConceded: 0, balls: 0 };
            }
            topBowlers[bowler]["runsConceded"] += runsConceded;

            if (delivery["wide_runs"] === 0 && delivery["noball_runs"] === 0) {
                topBowlers[bowler]["balls"] += 1
            }


        }
        return topBowlers;
    }, {})
    let topEconomicalBowlers = [];
    for (let bowler in bowlerStats) {
        let runsConced = bowlerStats[bowler]["runsConceded"];

        let balls = bowlerStats[bowler]["balls"];
        let economy = parseFloat(((runsConced / balls) * 6).toFixed(2));
        topEconomicalBowlers.push({ bowler: bowler, economy: economy });
    }
    topEconomicalBowlers.sort((a, b) => {
        return a.economy - b.economy;
    });
    return topEconomicalBowlers.slice(0, 10);
}

let topEconomicalBowlers = getTopEconomicalBowlers(deliveries, matchIds);


try {
    fs.writeFileSync('../public/output/topEconomicalBowlers.json', JSON.stringify(topEconomicalBowlers, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}