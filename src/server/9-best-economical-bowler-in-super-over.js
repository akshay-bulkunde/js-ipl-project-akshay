//Find the bowler with the best economy in super overs
const fs = require('fs');
const deliveries = require('../data/jsonData/deliveries.json');

function findBestSuperOverBowler(deliveries) {
    let bowlerStats = deliveries.reduce((acc, delivery) => {
        let isSuperOver = delivery["is_super_over"];
        if (isSuperOver !== 0) {
            let bowler = delivery["bowler"];
            if (!acc.hasOwnProperty(bowler)) {
                acc[bowler] = { runsConceded: 0, balls: 0 };
            }
            let runs = delivery["total_runs"] - delivery["legbye_runs"] - delivery["bye_runs"] - delivery["penalty_runs"];
            acc[bowler]["runsConceded"] += runs;
            if (delivery["wide_runs"] === 0 && delivery["noball_runs"] === 0) {
                acc[bowler]["balls"] += 1;
            }
        }
        return acc;
    }, {})

    let bestSuperOverBowler = [];
    for (let bowler in bowlerStats) {
        let runs = bowlerStats[bowler]["runsConceded"];
        let balls = bowlerStats[bowler]["balls"];
        let economy = parseFloat(((runs / balls) * 6).toFixed(2))
        bestSuperOverBowler.push({ bowler: bowler, economy: economy });
    }
    bestSuperOverBowler.sort((a, b) => {
        return a.economy - b.economy;
    })
    return bestSuperOverBowler[0];
}


let bestSuperOverBowler = findBestSuperOverBowler(deliveries);

try {
    fs.writeFileSync('../public/output/findBestSuperOverBowler.json', JSON.stringify(bestSuperOverBowler, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}