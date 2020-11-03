const readline = require('readline-sync');
let terminalKit = require('terminal-kit').terminal;
const { player, exercises } = require('./map');


let playersDatabase = [
    { name: 'Darth Vader', score: 12 },
    { name: 'Eukleidész', score: 18 },
    { name: 'Erdős', score: 13 },
    { name: 'Stormtrooper', score: 0 }
];

const getName = () => {
    player.name = readline.question('\x1b[93m\x1b[1mÜdv a játékban! Kérjük add meg a neved: \x1b[92m\x1b[1m ');
    playersDatabase.push(player);
    console.log('');
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
        textAttr: { bgColor: 'default', bold: true },
        firstCellTextAttr: { bgColor: 'blue', bold: true },
        firstRowTextAttr: { bgColor: 'red', bold: true },
        firstColumnTextAttr: { bgColor: 'red', bold: true },
        secondColumnTextAttr: { bgColor: 'red', bold: true },
        width: 50,
        lineWrap: false,
        fit: true
    }
    );
};

// terminalKit.gridMenu(exercises, (error, response) => {
//     response.selectedIndex;
//     process.exit();
// });

module.exports = {
    getName,
    printScoreboard
};