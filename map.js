const { table, getBorderCharacters } = require('table');
const term = require('terminal-kit').terminal;
const chalk = require("chalk");
const figlet = require('figlet');
const lolcatjs = require('lolcatjs');

const generateMap = (height, width) => {
  const arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width);
  }
  return arr;
};
const map = generateMap(15, 15);
const bullets = []; // x, y
const numbers = []; // x, y, num
const player = { name: '', x: map.length - 1, y: Math.floor(map[0].length / 2), score: 0, life: 3 };
let previousScore = 0;
let actualExercise = '';

const exercises =
  [['Shoot all the odd numbers', '(30 scores)'],
  ['Shoot all the even numbers', ' (30 scores)'],
  ['Shoot all numbers divisible by 3', '(60 scores)'],
  ['Shoot all numbers divisible by 4', '(60 scores)'],
  ['Shoot all numbers divisible by 5', '(30 scores)'],
  ['Shoot all numbers divisible by 6', '(60 scores)'],
  ['Shoot all numbers divisible by 7', '(60 scores)'],
  ['Shoot all numbers divisible by 8', '(60 scores)'],
  ['Shoot all numbers divisible by 9', '(60 scores)'],
  ['Shoot all numbers in ascending order', '(100 scores)'],
  ['Shoot all numbers in descending order', '(100 scores)'],
  ['Shoot all the prime numbers', '(100 scores)'],
  ['Random exercise', '']];
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
    case 0:
      if (n % 2 !== 0) {
        return true;
      }
      else return false;
    case 1:
      if (n % 2 === 0) {
        return true;
      }
      else return false;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      if (n % (rand + 1) === 0) {
        return true;
      }
      else return false;
    case 9:
      for (let i = 0; i < numbers.length; i++) {
        helpArray.push(numbers[i].num);
      }
      if (n === Math.min(...helpArray)) {
        return true;
      } else return false;
    case 10:
      for (let i = 0; i < numbers.length; i++) {
        helpArray.push(numbers[i].num);
      }
      if (n === Math.max(...helpArray)) {
        return true;
      } else return false;
    case 11:
      if (isPrime(n)) {
        return true;
      } else return false;
  }
};

const task = () => {
  actualExercise = exercises[rand][0];
  let counter = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (isGood(numbers[i].num)) counter++;
  }
  return counter;
};


const isFinish = () => {
  let c = task();
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

const appearTask = () => {
  console.clear();
  console.log();
  console.log();
  console.log();
  console.log();
  console.log();
  lolcatjs.fromString(figlet.textSync(actualExercise, {
    font: 'ANSI Shadow',
    horizontalLayout: 'full',
    verticalLayout: 'full',
    width: 100,
    whitespaceBreak: true
  }));
  console.log();
  console.log();
}


const printMap = () => {
  const mymap = generateMap(15, 15);
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'P') {
        mymap[i][j] = '🐱';
      }
      else if (map[i][j] === 'B') {
        mymap[i][j] = '🧶';
      }
      else mymap[i][j] = map[i][j];
    };
  };

  console.clear();

  let cat;

  if (player.life === 3) {
    cat = '😻 😻 😻';
  } else if (player.life === 2) {
    cat = '😸 😸';
  } else if (player.life === 1) {
    cat = '🙀';
  }

  console.clear();
  console.log();
  console.log(chalk.bold.greenBright(actualExercise));
  console.log();
  process.stdout.write(chalk.bold.greenBright('  name: ' + player.name + '                                  ' + '🐟: ' + player.score + '                                   ' + 'Life: ' + cat));
  console.log();

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

  output = table(mymap, config);
  console.log(chalk.bold.greenBright(output));
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
  if (choose === 12) {
    rand = Math.floor(Math.random() * (exercises.length - 1));
  } else {
    rand = choose;
  }
  const arr = [];
  if (rand >= 2 && rand <= 8) {
    const mult = [2, 5, 8, 3, 7];
    for (let i = 0; i < 5; i++) {
      const randIndex = Math.floor(Math.random() * 15);
      if (arr[randIndex] === undefined) {
        arr[randIndex] = mult[i] * (rand + 1);
      } else {
        i--;
      }
    }
  }
  if (rand === 11) {
    const primes = [2, 5, 13, 29, 43];
    for (let i = 0; i < 5; i++) {
      const randIndex = Math.floor(Math.random() * 15);
      if (arr[randIndex] === undefined) {
        arr[randIndex] = primes[i];
      } else {
        i--;
      }
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
  if (player.life === 0) {
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

const resetScoreWin = () => {
  if (rand === 0 || rand === 1 || rand === 4) {
    player.score = previousScore + 30;
  } else if (rand >= 9 && rand <= 11) {
    player.score = previousScore + 100;
  } else {
    player.score = previousScore + 60;
  }
  previousScore = player.score;
}


module.exports = {
  player,
  exercises,
  generateMap,
  fillMap,
  printMap,
  appearTask,
  playerMove,
  hit,
  gamerator,
  numbersMove,
  bulletsMove,
  shoot,
  task,
  isGood,
  isFinish,
  reset,
  resetScoreWin
};