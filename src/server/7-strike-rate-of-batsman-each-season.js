//Find the strike rate of a batsman for each season.
const fs = require('fs');
const deliveries = require('../../csvTojson/deliveries.json');
const matches = require('../../csvTojson/matches.json');

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

    // let batsmanStrikeRate = {};
    // for (let season in batsmanStats) {
    //     batsmanStrikeRate[season] = [];
    //     for (let batsmanName in batsmanStats[season]) {
    //         const { runs, ballsFaced } = batsmanStats[season][batsmanName];
    //         let strikeRate = parseFloat(((runs / ballsFaced) * 100).toFixed(2));
    //         batsmanStrikeRate[season].push({
    //             batsman: batsmanName,
    //             Sr: strikeRate
    //         })
    //     }
    // }
    let highestStriker = {};
    for (let season in batsmanStats) {
        let topBatsman = "";
        let highestSR = -1;
        for (let batsmanName in batsmanStats[season]) {
            const { runs, ballsFaced } = batsmanStats[season][batsmanName];
            let sr = (runs / ballsFaced) * 100;
            if (sr > highestSR) {
                highestSR = sr;
                topBatsman = batsmanName;
            }
        }
        highestStriker[season] = {
            batsman: topBatsman,
            strikeRate: highestSR
        }
    }
    return highestStriker;

}

let highestStriker = getBatsmanStrikeRatePerSeason(matches, deliveries)

try {
    fs.writeFileSync('../public/output/highestStrikerPerSeason.json', JSON.stringify(highestStriker , null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}