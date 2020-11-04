const { printScoreboard } = require("./scoreboard");
const chalk = require("chalk");
const figlet = require('figlet');
const { player } = require("./map");
//let terminalKit = require('terminal-kit').terminal;
var readlineSync = require('readline-sync');



const endOfGame = (inter) => {
    process.stdin.removeAllListeners('data');
    process.stdin.removeAllListeners('keypress');
    process.stdin.setRawMode(false);
    process.stdin.resume();
    process.stdin.end();
    clearInterval(inter);
    console.clear();

    if (player.life > 0) {
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
        console.log('\n\n\n\n\n\n\n\n\n\n');
        console.log(chalk.bold.redBright(figlet.textSync('game over', {
            font: 'ANSI Shadow',
            horizontalLayout: 'full',
            verticalLayout: 'full',
            width: 200,
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
    printSB
}