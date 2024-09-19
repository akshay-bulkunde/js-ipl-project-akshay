//Find the strike rate of a batsman for each season.

const deliveries = require('../csvTojson/deliveries.json');
const matches = require('../csvTojson/matches.json');

function getBatsmanStrikeRatePerSeason(matches, deliveries) {
    let matchSeasonMap = matches.reduce((accumulator, match) => {
        let id = match["id"];
        accumulator[id] = match["season"];
        return accumulator;
    }, {})

    let batsmanStats = deliveries.reduce((batsmans, delivery) => {
        let season = matchSeasonMap[delivery.match_id];
        let batsmanName = delivery["batsman"];
        if (!batsmans.hasOwnProperty(season)) {
            batsmans[season] = {};
        }
        if (!batsmans[season].hasOwnProperty(batsmanName)) {
            batsmans[season][batsmanName] = { runs: 0, ballsFaced: 0 };
        }
        let runs = delivery["batsman_runs"];
        batsmans[season][batsmanName]["runs"] += runs;
        if (delivery["wide_runs"] === 0 && delivery["noball_runs"] === 0) {
            batsmans[season][batsmanName]["ballsFaced"] += 1;
        }
        return batsmans


    }, {})

    let batsmanStrikeRate = {};
    for (let season in batsmanStats) {
        batsmanStrikeRate[season] = [];
        for (let batsmanName in batsmanStats[season]) {
            const { runs, ballsFaced } = batsmanStats[season][batsmanName];
            let strikeRate = parseFloat(((runs / ballsFaced) * 100).toFixed(2));
            batsmanStrikeRate[season].push({
                batsman: batsmanName,
                Sr: strikeRate
            })
        }
    }

    return batsmanStrikeRate;
}
// getBatsmanStrikeRatePerSeason(matches , deliveries)
console.log(getBatsmanStrikeRatePerSeason(matches, deliveries));