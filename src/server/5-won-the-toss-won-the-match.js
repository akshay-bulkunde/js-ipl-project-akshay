// Find the number of times each team won the toss and also won the match.

const matches = require('../csvTojson/matches.json');

function getTossAndMatchWinners(matches){
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

console.log(getTossAndMatchWinners(matches));