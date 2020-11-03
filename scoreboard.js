const readline = require('readline-sync');
let terminalKit = require('terminal-kit').terminal;
const { player, exercises } = require('./map');
const rankJson = require('./ranking.json');
const fs = require('fs');

const pushName = () => {
    for (let i = 0; i < rankJson.length; i++) {         // a json tartalmazza-e mar a nevet
        if (rankJson[i].name === player.name) return true;
    };
};

const getName = () => {
    player.name = readline.question('\x1b[93m\x1b[1mÜdv a játékban! Kérjük add meg a neved: \x1b[92m\x1b[1m ');
    if (pushName()) {           // ha mar igen semmi
    } else {                    // ha meg nem push
        rankJson.push(player);
        fs.writeFileSync('./ranking.json', JSON.stringify(rankJson), null, 2, (err) => {
        });
    };
};

const printScoreboard = () => {
    for (let i = 0; i < rankJson.length; i++) {
        if (rankJson[i].name === player.name) {
            rankJson[i].score = player.score;
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
};

module.exports = {
    getName,
    printScoreboard
};