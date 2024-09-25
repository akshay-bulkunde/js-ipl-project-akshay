//Find the highest number of times one player has been dismissed by another player
const fs = require('fs');
const deliveries = require('../data/jsonData/deliveries.json');

function findMostDismissedPlayerByBowler(deliveries) {
    let bowlerStats = deliveries.reduce((acc, delivery) => {

        let dismissed_kind = delivery["dismissal_kind"];
        if (dismissed_kind !== null & dismissed_kind !== "run out" && dismissed_kind !== "hit wicket" && dismissed_kind !== "retired hurt") {
            let player_dismissed = delivery["player_dismissed"];
            let bowler = delivery["bowler"];
            if(!acc.hasOwnProperty(bowler)){
                acc[bowler] = {[delivery.player_dismissed] : {"dismissals" : 1}}
            }else{
                if(!acc[bowler].hasOwnProperty(player_dismissed)){
                    acc[bowler][player_dismissed] = {dismissals : 1};
                }else{
                    acc[bowler][player_dismissed]["dismissals"] += 1;
                }
            }
            
           
        }
        return acc;
    }, {})
    
    let highestDismissals = [];
    for(let bowler in bowlerStats){
        if(bowlerStats.hasOwnProperty(bowler)){
            let batsmen = bowlerStats[bowler];
            for(let batsman in batsmen){
                if(batsmen.hasOwnProperty(batsman)){
                    let dismissals = batsmen[batsman]["dismissals"];
                    highestDismissals.push({bowler : bowler , batsman : batsman , dismissals: dismissals});
                }
            }
        }
    }
    highestDismissals.sort((a,b) => {
        return b.dismissals - a.dismissals
    })
    return highestDismissals[0];
}

let highestDismissals = findMostDismissedPlayerByBowler(deliveries)


try {
    fs.writeFileSync('../public/output/findMostDismissedPlayerByBowler.json', JSON.stringify(highestDismissals , null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}



