const { generateMap, fillMap, printMap, playerMove, hit, gamerator, numbersMove, bulletsMove, shoot, task, isGood, isFinish, player, reset, exercises } = require('./map');
const { getName, printScoreboard } = require('./scoreboard');
const readline = require('readline-sync');
//let term = require('terminal-kit').terminal;
let inter;

const menu = () => {
    process.stdin.removeAllListeners('data');
    process.stdin.removeAllListeners('keypress');
    process.stdin.setRawMode(false);
    process.stdin.resume();
    process.stdin.end();
    clearInterval(inter);
    if (player.name === '') {
        getName();
    }
    index = readline.keyInSelect(exercises, 'mit akarsz');
    if (index === -1) {
        process.exit();
    } else {
        main(index);
    }

    // term.singleColumnMenu(exercises, (error, response) => {
    //     let choose = response.selectedIndex;
    //     // stdout.removeAllListeners('data', term);
    //     //   term.removeAllListeners()
    //     // term.reset()
    //     // term.clear()
    //     main(choose)
    // });
}

// const menu = () => {
//     printScoreboard();
//     let continoue = readline.question('Szeretnél tovább játszani? (igen v nem) ');
//     if (continoue === 'igen') {
//         reset();
//         main();
//     }
//     else {
//         process.exit();
//     }
// }

const main = (choose) => {
    gamerator(choose);
    task();
 //   fillMap();
    let i = 0;
    inter = setInterval(() => {
        i++;
        if (i % 46 === 0) {
            numbersMove();
        }
        bulletsMove();
        hit();
        if (isFinish()) {
            // process.stdin.removeAllListeners('data');
            // process.stdin.removeAllListeners('keypress');
            // process.stdin.setRawMode(false);
            // process.stdin.resume();
            // process.stdin.end();
            fillMap();
            printMap();
            if (player.life > 0) {
                console.clear();
                console.log('Gratulálok, nyertél!');
                reset();
                printScoreboard();
            }
            else {
                console.clear();
                console.log('Vesztettél!');
                printScoreboard();
                reset();
            }
            menu();
        }
        fillMap();
        printMap();
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

menu();

