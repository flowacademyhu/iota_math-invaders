const { printScoreboard } = require("./scoreboard");
const chalk = require("chalk");
const figlet = require('figlet');
//let terminalKit = require('terminal-kit').terminal;
var readlineSync = require('readline-sync');
const lolcatjs = require('lolcatjs');
const mpg = require('mpg123');
const sound = new mpg.MpgPlayer();
const { generateMap} = require('./map');
const { table } = require('table');

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
        width: 200,
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
    let cat = countLife(cica.life);
    process.stdout.write(chalk.bold.greenBright('  name: ' + cica.name + '                                  ' + '🐟: ' + cica.score + '                                   ' + 'Life: ' + cat));
    console.log();
}

const printMap = (map, task, cica) => {
    console.clear();
    printTask(task); 
    printStats(cica);
    drawMap(map, cica.symb);    
};

const endOfGame = (inter, isWin) => {
    process.stdin.removeAllListeners('data');
    process.stdin.removeAllListeners('keypress');
    process.stdin.setRawMode(false);
    process.stdin.resume();
    process.stdin.end();
    clearInterval(inter);
    console.clear();

    if (isWin) {
        sound.play("sound/win.mp3");
        console.log('\n\n\n\n\n\n\n\n\n\n');
        console.log(chalk.bold.greenBright(figlet.textSync('you win', {
            font: 'ANSI Shadow',
            horizontalLayout: 'full',
            verticalLayout: 'full',
            width: 200,
            whitespaceBreak: true
        })));
    }
    else {
        sound.play("sound/gameover.mp3");
        console.log('\n\n\n\n\n\n\n\n\n\n');
        console.log(chalk.bold.redBright(figlet.textSync('game over', {
            font: 'ANSI Shadow',
            horizontalLayout: 'full',
            verticalLayout: 'full',
            width: 125,
            whitespaceBreak: true
        })));
    }
    
    console.log(chalk.bold.greenBright('Press any key to continue'));
    let key = readlineSync.keyIn();
    printSB();

    // const stdin = process.stdin;
    // stdin.setRawMode(true); // Ne várjon enterre
    // stdin.resume(); // Csak process.exit-el lehet kilépni
    // stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
    // stdin.on('data', (key) => { // Callback függvény
    //     if (key === '\x0D')
    //         printSB();
    //     else endOfGame();

    // });
}


const printSB = () => {
    console.clear();
    printScoreboard();
    //console.log(chalk.bold.greenBright('Press any key continue'));
    let key = readlineSync.keyIn(chalk.bold.greenBright('Press any key continue'));

}



module.exports = {
    endOfGame,
    appearTask,
    printBorder,
    printMap,
}