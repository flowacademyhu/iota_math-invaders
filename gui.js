const { printScoreboard } = require("./scoreboard");
const chalk = require("chalk");
const figlet = require('figlet');
//let terminalKit = require('terminal-kit').terminal;
var readlineSync = require('readline-sync');
const lolcatjs = require('lolcatjs');
const mpg = require('mpg123');
const sound = new mpg.MpgPlayer();

const appearTask = (task) => {
    console.clear();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    lolcatjs.fromString(figlet.textSync(task, {
        font: 'ANSI Shadow',
        horizontalLayout: 'full',
        verticalLayout: 'full',
        width: 200,
        whitespaceBreak: true
    }));
    console.log();
    console.log();
}


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
            width: 200,
            whitespaceBreak: true
        })));
    }
    
    console.log(chalk.bold.greenBright('Press any key to continue'));
    let key = readlineSync.keyIn();
    printSB();
    sound.stop("sound/win.mp3");
    sound.stop("sound/gameover.mp3");

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
}