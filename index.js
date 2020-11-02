const { generateMap, fillMap, printMap, playerMove, hit, gamerator, numbersMove, bulletsMove, shoot, isHit, task, isGood, isFinish, player } = require('./map');
const { getName, printScoreboard } = require('./scoreboard');
const readline = require('readline-sync');


const menu = () => {
    const stdin = process.stdin;
    stdin.setRawMode(true); // Ne várjon enterre
    stdin.resume(); // Csak process.exit-el lehet kilépni
    stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
    stdin.on('data', (key) => { // Callback függvény
        if (key === 'y') {
            main();
        } else {
            process.exit();
        }
    });    
 };

const main = () => {
    getName();
    gamerator();
    task();

    let i = 0;
    setInterval(() => {
        i++;
        if (i % 46 === 0) {
            numbersMove();
        }
        bulletsMove();
        isHit();
        if (isFinish()) {
           // process.stdin.removeAllListeners('data');
            fillMap();
            printMap();
            console.clear();
            printScoreboard();
            if (player.life > 0) {
                console.clear();
                console.log('Gratulálok, nyertél!');
                menu();
            }
            else {
                console.clear();
                console.log('Vesztettél!');
                menu();
            }
            // process.exit();
        }
        fillMap();
        printMap();

    }, 65);


    const stdin = process.stdin;
    stdin.setRawMode(true); // Ne várjon enterre
    stdin.resume(); // Csak process.exit-el lehet kilépni
    stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
    stdin.on('data', (key) => { // Callback függvény
      //  console.log('cica');
        if (key === 'q') {
            process.exit();
            printScoreboard();
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
    //  printScoreboard();

};

main();

