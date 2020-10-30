const readline = require('readline-sync');
const { player } = require('./map');

let playersDatabase = [
    { name: 'Darth Vader', score: 23 },
    { name: 'Han Solo', score: 18 },
    { name: 'Stormtrooper', score: 0 }
];

const getName = () => {
    player.name = readline.question('Udv Jatekos! Kerjuk add meg a neved:');
    playersDatabase.push(player);
};

const printScoreboard = () => {
    let ranking = playersDatabase.sort((a, b) => {
        return b.score - a.score;
    });

    for (let i = 0, k = 1; i < ranking.length; i++, k++) {      // rangsorolashoz kezdeti k valtozo
        console.log(k + '.' + ' ' + ranking[i].name + ' ' + ranking[i].score);  // kesobb GUI-t kialakitani
    };
};

module.exports = {
    getName,
    printScoreboard
};