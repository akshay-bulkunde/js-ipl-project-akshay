//Find a player who has won the highest number of Player of the Match awards for each season.
const fs = require('fs');
const matches = require('../../csvTojson/matches.json');

function getTopPlayerOfTheMatchPerSeason(){
    let topPlayersPerSeason = matches.reduce((topPlayers , match) => {
        let season = match["season"];
        if(!topPlayers.hasOwnProperty(season)){
            topPlayers[season] = {};
        }
        let player = match["player_of_match"];
        if(!topPlayers[season].hasOwnProperty(player)){
            topPlayers[season][player] = 0;
        }
        topPlayers[season][player] += 1;
        return topPlayers;
    }, {})
    let playerWithMostAwardsPerSeason = {};
    for(let season in topPlayersPerSeason){
        
        let players = topPlayersPerSeason[season];
        let topPlayer = '';
        let maxTrophy = 0;
        for(let player in players){
            if(players[player] > maxTrophy){
                maxTrophy = players[player];
                topPlayer = player;
            }
        }
        playerWithMostAwardsPerSeason[season] = {player : topPlayer , trophies : maxTrophy};
    }
    return playerWithMostAwardsPerSeason;
}

let playerWithMostAwardsPerSeason = getTopPlayerOfTheMatchPerSeason();


try {
    fs.writeFileSync('../public/output/playerWithMostAwardsPerSeason.json', JSON.stringify(playerWithMostAwardsPerSeason , null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}