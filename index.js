const { generateMap, fillMap, printMap, playerMove, hit, gamerator, numbersMove, bulletsMove, shoot, isHit, task, isGood, isFinish, player, reset, exercises } = require('./map');
const { getName, printScoreboard } = require('./scoreboard');
const readline = require('readline-sync');

const menu = () => {
    printScoreboard();
    let continoue = readline.question('Szeretnél tovább játszani? (igen v nem) ');
    if (continoue === 'igen') {
        reset();
        main();
    }
    else process.exit();
}

const main = () => {
    if (player.name === '') {
        getName();
    }
    gamerator();
    task();
    fillMap();
    let i = 0;
    const inter = setInterval(() => {
        i++;
        if (i % 44 === 0) {
            numbersMove();
        }
        bulletsMove();
        isHit();
        if (isFinish()) {
            process.stdin.removeAllListeners('data');
            process.stdin.removeAllListeners('keypress');
            process.stdin.setRawMode(false);
            process.stdin.resume();
            process.stdin.end();
            clearInterval(inter);
            fillMap();
            printMap();
            console.clear();
            printScoreboard();
            if (player.life > 0) {
                console.clear();
                console.log('Gratulálok, nyertél!');
                player.score = Math.ceil(player.score/100) * 100;
                menu();
            }
            else {
                console.clear();
                console.log('Vesztettél!');
                menu();
            }
        }
        fillMap();
        printMap();
    }, 66);


    const stdin = process.stdin;
    stdin.setRawMode(true); // Ne várjon enterre
    stdin.resume(); // Csak process.exit-el lehet kilépni
    stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
    stdin.on('data', (key) => { // Callback függvény
        if (key === 'q') {
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

main();

