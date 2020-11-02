const readline = require('readline-sync');
let terminalKit = require('terminal-kit').terminal;
const { player } = require('./map');

let playersDatabase = [
    { name: 'Darth Vader', score: 12 },
    { name: 'Eukleidész', score: 18 },
    { name: 'Erdős', score: 13 },
    { name: 'Stormtrooper', score: 0 }
];

const getName = () => {
    player.name = readline.question('\x1b[93m\x1b[1mÜdv a játékban! Kérjük add meg a neved: \x1b[92m\x1b[1m ');
    playersDatabase.push(player);
};

const printScoreboard = () => {
    let scoreboard = [['#', 'Játékos neve', 'Játékos pontszáma']];
    
    playersDatabase.sort((a, b) => {
        return b.score - a.score;
    });

    for (let i = 0, k = 1; i < playersDatabase.length; i++, k++) {
        scoreboard.push([k + '.', playersDatabase[i].name, playersDatabase[i].score]);
    };

    terminalKit.table(scoreboard, {
        hasBorder: true,
        contentHasMarkup: true,
        borderChars: 'heavy',
        borderAttr: { color: 'white' },
        textAttr: { bgColor: 'default' },
        firstCellTextAttr: { bgColor: 'blue' },
        firstRowTextAttr: { bgColor: 'red' },
        firstColumnTextAttr: { bgColor: 'red' },
        secondColumnTextAttr: { bgColor: 'red' },
        width: 50,
        lineWrap: false,
        fit: true
    }
    );
};

module.exports = {
    getName,
    printScoreboard
};