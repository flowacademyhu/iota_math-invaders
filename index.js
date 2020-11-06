const readline = require('readline-sync');
const chalk = require("chalk");
const sound = require('./sound');

const map = require('./map');
const { getName, printScoreboard } = require('./scoreboard');

const { appearTask, endOfGame, printMap, printSB, appearGame } = require('./gui');
let inter;

let player = map.getPlayer();

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
        process.stdin.removeAllListeners('data');
        process.stdin.removeAllListeners('keypress');
        process.stdin.setRawMode(false);
        process.stdin.resume();
        process.stdin.end();
        map.getPlayerSymb();
    }
    const excercisesInput = map.exercises.map(input => input.join(' '));
    index = readline.keyInSelect(excercisesInput, chalk.bold.greenBright('Choose an exercise'));
    if (index === -1) {
        process.exit();
    } else {
        map.gamerator(index);

        process.stdin.removeAllListeners('data');
        process.stdin.removeAllListeners('keypress');
        process.stdin.setRawMode(false);
        process.stdin.resume();
        process.stdin.end();
        clearInterval(inter);

        const actualExercise = map.getActualExercise();
        appearTask(actualExercise);
        let key = readline.question(chalk.bold.greenBright('Press Enter to continue'));
        main();
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
            map.numbersMove();
        }
        if (i % 70 === 0) {
            map.fillExtra();
        }
        if (i % 3 === 0) {
            map.extraMove();
        }
        const field = map.getMap();
        map.fillMap(field);
        const actualExercise = map.getActualExercise();
        printMap(field, actualExercise, player);
        map.bulletsMove();
        map.hit();
        map.collection();
        if (map.isFinish()) {
            clearInterval(inter);
            const isWin = player.life > 0
            if (isWin) {
                map.resetScoreWin();
            }

            endOfGame(inter, isWin, () => {
                printSB();
                map.reset();
                menu();
            });
        }
    }, 65);

    const stdin = process.stdin;
    stdin.setRawMode(true); 
    stdin.resume(); 
    stdin.setEncoding('utf8'); 
    stdin.on('data', (key) => {
        if (key === 'q') {
            console.clear();
            printScoreboard();
            player.score = 0;
            previousScore = 0;
            player.life = 0;
            map.reset();
            menu();
        }
        if (key === "\033[C") {
            map.playerMove(true);
        }
        if (key === "\033[D") {
            map.playerMove(false);
        }
        if (key === "\033[A" || key === " ") {
            sound.play("sound/shoot.mp3");
            map.shoot();
        }
    });
};

appearGame();
menu();

