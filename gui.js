const { printScoreboard } = require("./scoreboard");
const chalk = require("chalk");
const figlet = require('figlet');
let term = require('terminal-kit').terminal;
var readlineSync = require('readline-sync');
const lolcatjs = require('lolcatjs');

const sound = require('./sound');
const { generateMap, isGood } = require('./map');
const { table, getBorderCharacters } = require('table');
//const { fallingCats } = require('./fallingCats');



const appearTask = (task) => {
    console.clear();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    lolcatjs.fromString(figlet.textSync(task, {
        font: 'ANSI Shadow',
        horizontalLayout: 'fitted',
        verticalLayout: 'full',
        width: 125,
        whitespaceBreak: true
    }));
    console.log();
    console.log();
}

const countLife = (life) => {
    let cat;

    if (life === 5) {
        cat = '😻 😻 😻 🎀 🎀';
    } else if (life === 4) {
        cat = '😻 😻 😻 🎀';
    } else if (life === 3) {
        cat = '😻 😻 😻';
    } else if (life === 2) {
        cat = '😸 😸';
    } else if (life === 1) {
        cat = '🙀';
    }

    return cat;
}

const printBorder = (mymap) => {
    let config, output;
    config = {
        border: {
            topBody: `─`,
            topJoin: `─`,
            topLeft: `┌`,
            topRight: `┐`,

            bottomBody: `─`,
            bottomJoin: `─`,
            bottomLeft: `└`,
            bottomRight: `┘`,

            bodyLeft: `│`,
            bodyRight: `│`,
            bodyJoin: ` `,

            joinBody: ` `,
            joinLeft: `│`,
            joinRight: `│`,
            joinJoin: ` `
        },
        columnDefault: {
            width: 4
        }
    };

    output = table(mymap, config);
    console.log(chalk.bold.greenBright(output));
}

const printTask = (task) => {
    console.clear();
    console.log();
    console.log(chalk.bold.greenBright(task));
    console.log();
}

const drawMap = (map, symb) => {
    const mymap = generateMap(15, 15);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 'P') {
                mymap[i][j] = symb;
            }
            else if (map[i][j] === 'B') {
                mymap[i][j] = '🧶';
            } else if (map[i][j] === 'L') {
                mymap[i][j] = '🐭';
            } else if (map[i][j] === 'D') {
                mymap[i][j] = '🐶';
            } else mymap[i][j] = map[i][j];
        }
    }
    printBorder(mymap);
}

const printStats = (cica) => {
    const status = generateMap(1, 3);
    const cat = countLife(cica.life);
    status[0][0] = chalk.bold.greenBright(' Name: ' + cica.name);
    status[0][1] = '🐟: ' + chalk.bold.greenBright(cica.score);
    status[0][2] = chalk.bold.greenBright('Life: ') + cat;
    let output;
    output = table(status, {
        border: getBorderCharacters(`void`),
        columnDefault: {
            paddingLeft: 0,
            paddingRight: 1
        },
        drawHorizontalLine: () => {
            return false
        },
        columns: {
            0: {
                width: 34
              },
            1: {
              width: 34,
              alignment: 'center',
            },
            2: {
                width: 34,
                alignment: 'right'
              }
          }
    });
    console.log(output);
}

const printMap = (map, task, cica) => {
    console.clear();
    printTask(task);
    printStats(cica);
    drawMap(map, cica.symb);
};
//fallingCats();

const endOfGame = (inter, isWin) => {
    process.stdin.removeAllListeners('data');
    process.stdin.removeAllListeners('keypress');
    process.stdin.setRawMode(false);
    process.stdin.resume();
    process.stdin.end();
    clearInterval(inter);
    console.clear();

    if (isWin) {
        console.log('\n\n\n\n\n\n\n\n\n\n');
        console.log(chalk.bold.greenBright(figlet.textSync('you win', {
            font: 'ANSI Shadow',
            horizontalLayout: 'full',
            verticalLayout: 'full',
            width: 200,
            whitespaceBreak: true
        })));
        sound.play("sound/win.mp3");
    }
    else {
        console.log('\n\n\n\n\n\n\n\n\n\n');
        console.log(chalk.bold.redBright(figlet.textSync('game over', {
            font: 'ANSI Shadow',
            horizontalLayout: 'full',
            verticalLayout: 'full',
            width: 125,
            whitespaceBreak: true
        })));
        sound.play("sound/gameover.mp3");
    }

    // let key = readlineSync.question(chalk.bold.greenBright('Press Enter to continue'));
    printSB();
}


const printSB = () => {
    console.clear();
    printScoreboard();
    let key = readlineSync.question(chalk.bold.greenBright('Press Enter to continue'));

}



module.exports = {
    endOfGame,
    appearTask,
    printBorder,
    printMap
}