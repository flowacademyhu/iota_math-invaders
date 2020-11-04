const { generateMap } = require('./map');
const { table } = require('table');

const gattoMap = generateMap(20, 20);

let kittens = [];
let happyCats = ['😸', '😻', '😼', '😽'];

const printMap = () => {
    console.clear();
    let random = Math.floor(Math.random() * 20);
    let object = { x: 1, y: random };
    kittens.push(object);

    let random2 = Math.floor(Math.random() * 3);
    for (let i = 0; i < gattoMap.length; i++) {
        for (let j = 0; j < gattoMap[i].length; j++) {
            gattoMap[i][j] = ' ';
            for (let k = 0; k < kittens.length; k++) {
                if (i === kittens[k].x && j === kittens[k].y) {
                    gattoMap[i][j] = happyCats[random2];
                };
            };
        };
    };

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
    output = table(gattoMap, config);
    console.log(output);
};

const movingCats = () => {
    for (let i = 0; i < kittens.length; i++) {
        if (kittens[i].x === 19) {
            kittens.splice(i, 1);
        };
    };
    for (let i = 0; i < kittens.length; i++) {
        kittens[i].x++;
    };
};

const fallingCats = () => {
    setInterval(() => {
        printMap();
        movingCats();
    }, 200);
};

fallingCats();

module.exports = {
    fallingCats
}