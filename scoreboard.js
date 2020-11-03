const readline = require('readline-sync');
let terminalKit = require('terminal-kit').terminal;
const { player } = require('./map');
const rankJson = require('./ranking.json');
const fs = require('fs');

const getName = () => {
    player.name = readline.question('\x1b[93m\x1b[1mÜdv a játékban! Kérjük add meg a neved: \x1b[92m\x1b[1m ');
    for (let i = 0; i < rankJson.length; i++) {
        if (rankJson[i].name === player.name) {
            rankJson.splice(i, 1);
            rankJson.push(player);
            fs.writeFileSync('./ranking.json', JSON.stringify(rankJson, null, 2), (err) => {
            });
        };
    };
};

const printScoreboard = () => {
    for (let i = 0; i < rankJson.length; i++) {
        if (rankJson[i].name === player.name) {
            rankJson[i].score = player.score;
            break;
        };
    };

    for (let i = 0; i < rankJson.length; i++) {
        if (rankJson[i].name === player.name) {                               
            rankJson.splice(i, 1);
            rankJson.push(player);
            fs.writeFileSync('./ranking.json', JSON.stringify(rankJson, null, 2), (err) => {
            });
            break;
        };
    };

    let scoreboard = [['#', 'Játékos neve', 'Játékos pontszáma']];

    rankJson.sort((a, b) => {
        return b.score - a.score;
    });

    for (let i = 0, k = 1; i < rankJson.length; i++, k++) {
        scoreboard.push([k + '.', rankJson[i].name, rankJson[i].score]);
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
    console.log('\n');
};

module.exports = {
    getName,
    printScoreboard
};