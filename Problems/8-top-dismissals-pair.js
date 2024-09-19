//Find the highest number of times one player has been dismissed by another player

const deliveries = require('../csvTojson/deliveries.json');

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

console.log(findMostDismissedPlayerByBowler(deliveries))
// [
//     {
//       "bowler": "Z Khan",
//       "batsman": "MS Dhoni",
//       "dismissals": 7
//     }
//   ]
  
//run out
//hit wicket
//retired hurt\





// function highestDismissal(deliveriesData)
//     //  {
//     let dismissalData = {};
//     for(let key in deliveriesData)
//     {
//         let delivery = deliveriesData[key];
//         let bowler =  delivery["bowler"];
//         let batsman = delivery["batsman"];
//         let dismissal = delivery["dismissal_kind"];

//         if(!dismissalData.hasOwnProperty(batsman))
//         {
//             dismissalData[batsman] = {};
//         }

//         if(!dismissalData[batsman].hasOwnProperty(bowler))
//             {
//                 dismissalData[batsman][bowler] = 0;
//             }
//             if(dismissal)
//              {
//                 if(dismissal !== "run out")
//                 {
//                    dismissalData[batsman][bowler]++;
//                 }
//             }
//     }
//  let result = {};
//         for (let batsman in dismissalData) {
//             let bowlers = dismissalData[batsman];
//             let highestBowler = null;
//             let highestCount = 0;

//             for (let bowler in bowlers) {
//                 let count = bowlers[bowler];
//                 if (count > highestCount) {
//                     highestCount = count;
//                     highestBowler = bowler;
//                 }
//             }
//             if(highestBowler !== null && highestCount !==0){
//             result[batsman] = { bowler: highestBowler, count: highestCount };
//         }
//         }
//         return result;

//     }
//    console.log(highestDismissal(deliveriesData));


