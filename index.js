const { generateMap, fillMap, printMap, playerMove, hit, gamerator, numbersMove, bulletsMove, shoot, getActualExercise, isGood, isFinish, player, reset, resetScoreWin, exercises, fillExtra, extraMove, collection, getPlayerSymb } = require('./map');
const { getName, printScoreboard } = require('./scoreboard');
const readline = require('readline-sync');
const chalk = require("chalk");
const figlet = require('figlet');
const { appearTask, endOfGame } = require('./gui');
const mpg = require('mpg123');
const sound = new mpg.MpgPlayer();
//let term = require('terminal-kit').terminal;
let inter;


const menu = () => {
    console.clear();
    process.stdin.removeAllListeners('data');
    process.stdin.removeAllListeners('keypress');
    process.stdin.setRawMode(false);
    process.stdin.resume();
    process.stdin.end();
    clearInterval(inter);
    if (player.name === '') {
        getName();
        getPlayerSymb();
    }
    const excercisesInput = exercises.map(input => input.join(' '));
    index = readline.keyInSelect(excercisesInput, chalk.bold.greenBright('Choose an exercise'));
    if (index === -1) {
        process.exit();
    } else {
        gamerator(index);

        process.stdin.removeAllListeners('data');
        process.stdin.removeAllListeners('keypress');
        process.stdin.setRawMode(false);
        process.stdin.resume();
        process.stdin.end();
        clearInterval(inter);

        const actualExercise = getActualExercise();
        appearTask(actualExercise);
        console.log(chalk.bold.greenBright('Press any key to continue'))

        const stdin = process.stdin;
        stdin.setRawMode(true); // Ne várjon enterre
        stdin.resume(); // Csak process.exit-el lehet kilépni
        stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
        stdin.on('data', (key) => { // Callback függvény
            main();
        });
    };
}

const main = () => {
    console.clear();
    process.stdin.removeAllListeners('data');
    process.stdin.removeAllListeners('keypress');
    process.stdin.setRawMode(false);
    process.stdin.resume();
    process.stdin.end();
    clearInterval(inter);
    let i = 0;
    inter = setInterval(() => {
        i++;
        if (i % 55 === 0) {
            numbersMove();
        }
        if (i % 70 === 0) {
            fillExtra();
        }
        if (i % 3 === 0) {
            extraMove();
        }
        fillMap();
        const actualExercise = getActualExercise();
        printMap(actualExercise);
        bulletsMove();
        hit();
        collection();
        if (isFinish()) {
            const isWin = player.life > 0
            if (isWin) {
                resetScoreWin();
            }

            endOfGame(inter, isWin);
            reset();
            menu();
        }
    }, 65);


    const stdin = process.stdin;
    stdin.setRawMode(true); // Ne várjon enterre
    stdin.resume(); // Csak process.exit-el lehet kilépni
    stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
    stdin.on('data', (key) => { // Callback függvény
        if (key === 'q') {
            console.clear();
            printScoreboard();
            player.score = 0;
            reset();
            menu();
        }
        if (key === "\033[C") {
            playerMove(true);
        }
        if (key === "\033[D") {
            playerMove(false);
        }
        if (key === "\033[A" || key === " ") {
            sound.play("sound/shoot.mp3");
            shoot();
        }
    });
};

menu();

