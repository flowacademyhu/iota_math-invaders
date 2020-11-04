const { generateMap } = require('./map');
const { table } = require('table');

const fireMap = generateMap(20, 20);

let fireballs = [];
let fallingSparks = [];        

const fillMap = () => {
    let object = { x: 19, y: Math.floor(Math.random() * 15) + 1 };
    fireballs.push(object);
    for (let i = 0; i < fireMap.length; i++) {
        for (let j = 0; j < fireMap[i].length; j++) {
            fireMap[i][j] = ' ';
            for (let k = 0; k < fireballs.length; k++) {
                if (i === fireballs[k].x && j === fireballs[k].y) {
                    fireMap[i][j] = '*';
                };
            };
        };
    };
    return fireMap;
};

const printMap = (myMap) => {
    console.clear();

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

    output = table(myMap, config);
    console.log(output);
};

const ballExplode = () => {
    for (let i = 0; i < fireballs.length; i++) {
        if (fireballs[i].x === 5) {        // ide random 10-15 magassagban random pozicioban hullo izek
            fallingSparks.push(fireballs);
            fireballs.splice(i, 1);   
        };
    };

    for (let i = 0; i < fireballs.length; i++) {
        fireballs[i].x--;
    };

    // for (let i = 0; i < fallingSparks.length; i++) {
    //     fallingSparks[i].x++;
    // };
};

const ballDisappear = () => {

};

const fireworks = () => {
    setInterval(() => {
        printMap(fillMap());
        ballExplode();
    }, 300);
};

fireworks();


// console.table(fillMap());

// tomb letrehozasa 
// legalulrol 6 vagy 7 kiloves
// egy 10 es 15 kozotti magassag elerese eseten szakadjon szet 5x5 mezoben
// hulljon 7 vagy 8 mezot es splice