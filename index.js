const { generateMap, fillMap, printMap, playerMove, hit, gamerator, numbersMove, bulletsMove, shoot, task, isGood, isFinish, player, reset, exercises, appearTask } = require('./map');
const { getName, printScoreboard } = require('./scoreboard');
const readline = require('readline-sync');
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
    }
    index = readline.keyInSelect(exercises, 'Choose an exercise');
    if (index === -1) {
        process.exit();
    } else {
        gamerator(index);
        task();

        process.stdin.removeAllListeners('data');
        process.stdin.removeAllListeners('keypress');
        process.stdin.setRawMode(false);
        process.stdin.resume();
        process.stdin.end();
        clearInterval(inter);

        appearTask();
        console.log('Press any key to continue')

        const stdin = process.stdin;
        stdin.setRawMode(true); // Ne várjon enterre
        stdin.resume(); // Csak process.exit-el lehet kilépni
        stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
        stdin.on('data', (key) => { // Callback függvény
            main();
        });

        //  main(index);
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
        if (i % 46 === 0) {
            numbersMove();
        }
        fillMap();
        printMap();
        bulletsMove();
        hit();
        if (isFinish()) {
            printSB();
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
        if (key === "\033[A") {
            shoot();
        }
    });
};

const printSB = () => {
    process.stdin.removeAllListeners('data');
    process.stdin.removeAllListeners('keypress');
    process.stdin.setRawMode(false);
    process.stdin.resume();
    process.stdin.end();
    clearInterval(inter);
    console.clear();
    if (player.life > 0) {
        console.log('Gratulálok, nyertél!');
        player.score = Math.ceil(player.score / 100) * 100;
        printScoreboard();
    } else {
        console.log('Vesztettél!');
        printScoreboard();
    }
    console.log('Press Enter to continue');
    const stdin = process.stdin;
    stdin.setRawMode(true); // Ne várjon enterre
    stdin.resume(); // Csak process.exit-el lehet kilépni
    stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
    stdin.on('data', (key) => { // Callback függvény
        if (key === '\x0D') {
            reset();
            menu();
        } else {
            printSB();
        }
    });
}
menu();

