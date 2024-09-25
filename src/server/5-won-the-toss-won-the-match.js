// Find the number of times each team won the toss and also won the match.
const fs = require('fs');
const matches = require('../data/jsonData/matches.json');

function getTossAndMatchWinners(){
    let countTossAndMatchWinners = matches.reduce((tossAndMatchWinner , match) => {
        let tossWinner = match["toss_winner"];
        let matchWinner = match["winner"];
        if(tossWinner === matchWinner){
            if(!tossAndMatchWinner.hasOwnProperty(tossWinner)){
                tossAndMatchWinner[tossWinner] = 0;
            }
            tossAndMatchWinner[tossWinner] += 1;
        }
        return tossAndMatchWinner;
    }, {})
    return countTossAndMatchWinners;
}

let countTossAndMatchWinners = getTossAndMatchWinners();

try {
    fs.writeFileSync('../public/output/countTossAndMatchWinners.json', JSON.stringify(countTossAndMatchWinners , null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}