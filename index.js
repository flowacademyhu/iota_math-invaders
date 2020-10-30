const { generateMap, fillMap, printMap, playerMove, hit, gamerator, numbersMove, bulletsMove, shoot, isHit} = require('./map');
const { getName, printScoreboard } = require('./scoreboard');

const main = () => {
    getName();
    gamerator();
    fillMap();
    printMap();

    let i = 0;
    setInterval(() => {
        i++;
        if (i%46 === 0){
            numbersMove();
        }
        bulletsMove();
        isHit();
        fillMap();
        printMap();
    }, 65);

    // setInterval(() => {
    //     bulletsMove();
    //     fillMap();
    //     printMap();
    // }, 50);
    
    const stdin = process.stdin;
    stdin.setRawMode(true); // Ne várjon enterre
    stdin.resume(); // Csak process.exit-el lehet kilépni
    stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
    stdin.on('data', (key) => { // Callback függvény
        if (key === 'q') {
            process.exit();
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
        //bulletsMove();
        //numbersMove();
        //fillMap();
        //printMap();
    });
    printScoreboard();
};

main();

