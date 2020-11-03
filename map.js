const { table, getBorderCharacters } = require('table');
const term = require('terminal-kit').terminal;

const generateMap = (height, width) => {
  const arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width);
  };
  return arr;
};
const map = generateMap(20, 15);
const bullets = []; // x, y
const numbers = []; // x, y, num
const player = { name: '', x: map.length - 1, y: Math.floor(map[0].length / 2), score: 0, life: 3 };
let actualExercise = '';
let exercises =
  ['Random exercise',
    'Shoot all the odd numbers',
    'Shoot all the even numbers',
    'Shoot all numbers divisible by 3',
    'Shoot all numbers divisible by 4',
    'Shoot all numbers divisible by 5',
    'Shoot all numbers divisible by 6',
    'Shoot all numbers divisible by 7',
    'Shoot all numbers divisible by 8',
    'Shoot all numbers divisible by 9',
    'Shoot all numbers in ascending order',
    'Shoot all numbers in descending order',
    'Shoot all the prime numbers'];
let rand;

const isPrime = (num) => {
  if (num === 0 || num === 1) {
    return false;
  } else {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (isPrime(i)) {
        if (num % i === 0) {
          return false;
        }
      }
    }
    return true;
  }
};

const isGood = (n) => {
  const helpArray = [];
  switch (rand) {
    case 1:
      if (n % 2 !== 0) {
        return true;
      }
      else return false;
    case 2:
      if (n % 2 === 0) {
        return true;
      }
      else return false;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      if (n % rand === 0) {
        return true;
      }
      else return false;
    case 10:
      for (let i = 0; i < numbers.length; i++) {
        helpArray.push(numbers[i].num);
      }
      if (n === Math.min(...helpArray)) {
        return true;
      } else return false;
    case 11:
      for (let i = 0; i < numbers.length; i++) {
        helpArray.push(numbers[i].num);
      }
      if (n === Math.max(...helpArray)) {
        return true;
      } else return false;
    case 12:
      if (isPrime(n)) {
        return true;
      } else return false;
  }
};

const task = () => {
  actualExercise = exercises[rand];
  let counter = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (isGood(numbers[i].num)) counter++;
  }
  return counter;
};
const isFinish = () => {
  let c = task();
  //ha leernek a szamok, player.life = 0
  if (c === 0 || player.life === 0) {
    return true;
  }
  return false;
}
const fillMap = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      map[i][j] = ' ';
      if (player.x === i && player.y === j) {
        map[i][j] = 'P';
      }
      for (let k = 0; k < bullets.length; k++) {
        if (i === bullets[k].x && j === bullets[k].y) {
          map[i][j] = 'B';
        }
      }
      for (let k = 0; k < numbers.length; k++) {
        if (i === numbers[k].x && j === numbers[k].y) {
          map[i][j] = numbers[k].num;
        }
      }
    }
  }
};
const printMap = () => {
  const mymap = generateMap(20, 15);
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'P') {
        mymap[i][j] = '🐱';
      }
      else if (map[i][j] === 'B') {
        mymap[i][j] = '🧶';
      }
      else mymap[i][j] = map[i][j];
      
    }
    
  }
  console.clear();
  // term.table(map, {
  //   checkerEvenCellTextAttr: { bgColor: 'gray' },
  //   fit: true
  // });
  let config, output, options;
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
  
  output = table(mymap, config, options);
  console.log(output);
  console.log(actualExercise);
  console.log(player);
};


const playerMove = (isRight) => {
  if (isRight && player.y < map[0].length - 1) {
    player.y++;
  } else if (isRight === false && player.y > 0) {
    player.y--;
  }
};

const hit = () => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < bullets.length; j++) {
      if (bullets[j].x === numbers[i].x && bullets[j].y === numbers[i].y) {
        bullets.splice(j, 1);
        if (isGood(numbers[i].num)) {
          player.score++;
          numbers.splice(i, 1);
        } else {
          player.life--;
        }
      }
    }
  }
};


const gamerator = (choose) => {
  if (choose === 0) {
    rand = Math.floor(Math.random() * (exercises.length - 1) + 1);
  } else {
    rand = choose;
  }
  let arr = [];
  if (rand >= 3 && rand <= 9) {
    const mult = [2, 5, 8, 3, 7];
    for (let i = 0; i < 5; i++) {
      const randIndex = Math.floor(Math.random() * 15);
      arr[randIndex] = mult[i] * rand;
    }
  }
  if (rand === 12) {
    const primes = [2, 5, 13, 29, 43];
    for (let i = 0; i < 5; i++) {
      const randIndex = Math.floor(Math.random() * 15);
      arr[randIndex] = primes[i];
    }
  }

  for (let i = 0; i < 15; i++) {
    const random = Math.floor(Math.random() * (100 - 0) + 0);
    if (arr[i] === undefined) {
      if (arr.includes(random) === false) {
        arr[i] = random;
      } else i--;
    }
  }
  for (let i = 0; i < 15; i++) {
    const object = { x: 0, y: 0, num: 0 };
    object.num = arr[i];
    if (i % 2 === 0) object.x = 0;
    else object.x = 1;
    object.y = i;
    numbers.push(object);
  }
};
const numbersMove = () => {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].x < map.length - 2) {
      numbers[i].x++;
    } else {
      if (player.life > 0) player.life--;
    }
  }
};
const bulletsMove = () => {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].x === 0) {
      bullets.splice(i, 1);
    };
  };
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x--;
  };
};
const shoot = () => {
  bullets.push({ x: player.x - 1, y: player.y });
};

const reset = () => {
  if (player.life > 0) {
    player.score = Math.ceil(player.score / 100) * 100;
  } else {
    player.score = 0;
  }
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      map[i][j] = '';
    }
  }
  numbers.splice(0, numbers.length);
  bullets.splice(0, bullets.length);
  player.x = map.length - 1;
  player.y = Math.floor(map[0].length / 2);
  player.life = 3;
};

module.exports = {
  player,
  exercises,
  generateMap,
  fillMap,
  printMap,
  playerMove,
  hit,
  gamerator,
  numbersMove,
  bulletsMove,
  shoot,
  task,
  isGood,
  isFinish,
  reset
};