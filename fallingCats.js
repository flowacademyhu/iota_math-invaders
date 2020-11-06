const { table } = require('table');
const { generateMap } = require('./map');

let gattoMap = [];
let kittens = [];
let happyCats = ['😸', '😻', '😼', '😽'];
let youwinStars = [
  { x: 2, y: 2 }, { x: 3, y: 2 },    // Y
  { x: 4, y: 3 }, { x: 4, y: 4 },    // Y
  { x: 4, y: 5 },                    // Y
  { x: 2, y: 6 }, { x: 3, y: 6 },    // Y
  { x: 5, y: 4 }, { x: 6, y: 4 },    // Y
  { x: 2, y: 9 }, { x: 2, y: 10 },   // O
  { x: 3, y: 8 }, { x: 3, y: 11 },   // O
  { x: 4, y: 8 }, { x: 4, y: 11 },   // O
  { x: 5, y: 8 }, { x: 5, y: 11 },   // O
  { x: 6, y: 9 }, { x: 6, y: 10 },   // O
  { x: 2, y: 13 }, { x: 2, y: 16 },  // U
  { x: 3, y: 13 }, { x: 3, y: 16 },  // U    
  { x: 4, y: 13 }, { x: 4, y: 16 },  // U
  { x: 5, y: 13 }, { x: 5, y: 16 },  // U
  { x: 6, y: 14 }, { x: 6, y: 15 },  // U
  { x: 10, y: 3 }, { x: 11, y: 3 },  // W
  { x: 12, y: 3 }, { x: 10, y: 7 },  // W
  { x: 14, y: 4 }, { x: 12, y: 5 },  // W
  { x: 14, y: 6 }, { x: 13, y: 7 },  // W
  { x: 13, y: 5 }, { x: 13, y: 3 },  // W
  { x: 12, y: 7 }, { x: 11, y: 7 },  // W
  { x: 10, y: 9 }, { x: 11, y: 9 },  // I
  { x: 12, y: 9 }, { x: 13, y: 9 },  // I
  { x: 14, y: 9 },                   // I
  { x: 10, y: 11 }, { x: 11, y: 11 },// N
  { x: 12, y: 11 }, { x: 13, y: 11 },// N
  { x: 14, y: 11 }, { x: 11, y: 12 },// N
  { x: 12, y: 13 }, { x: 13, y: 14 },// N
  { x: 14, y: 15 }, { x: 13, y: 15 },// N
  { x: 12, y: 15 }, { x: 11, y: 15 },// N
  { x: 10, y: 15 },                  // N
];

const createMap = () => {
  gattoMap = generateMap(16, 20);
  for (let i = 0; i < gattoMap.length; i++) {
    for (let j = 0; j < gattoMap[i].length; j++) {
      gattoMap[i][j] = ' ';
    };
  };
};


const printMap2 = () => {
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
      for (let k = 0; k < youwinStars.length; k++) {
        if (i === youwinStars[k].x && j === youwinStars[k].y) {
          gattoMap[i][j] = '⬜';
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
      width: 2
    }
  };
  output = table(gattoMap, config);
  console.log(output);
  console.log('Press c to continue');
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


const fallingCats = (onExit) => {
  createMap();
  let exit = false;
  const inter = setInterval(() => {
    printMap2();
    movingCats();
    if (exit) {
      onExit();
      clearInterval(inter);
    }
  }, 200);

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.on('data', (key) => {
    if (key === 'c' || key === 'C') {
      exit = true;
    }
  });
};

module.exports = {
  fallingCats
}