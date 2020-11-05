const term = require('terminal-kit').terminal;
const chalk = require("chalk");
const figlet = require('figlet');
const lolcatjs = require('lolcatjs');
const readline = require('readline-sync');
const mpg = require('mpg123');
const sound = new mpg.MpgPlayer();

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
const extra = [];
const player = { name: '', x: map.length - 1, y: Math.floor(map[0].length / 2), score: 0, life: 3, symb: '' };
let previousScore = 0;

const getMap = () => {
  return map;
}

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

const calculateCounter = () => {
  let counter = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (isGood(numbers[i].num)) counter++;
  }
  return counter;
}

const getActualExercise = () => {
  return exercises[rand][0];
}

const isFinish = () => {
  let c = calculateCounter();
  if (c === 0 || player.life === 0) {
    return true;
  }
  return false;
}
const fillMap = (map) => {
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
      for (let k = 0; k < extra.length; k++) {
        if (i === extra[k].x && j === extra[k].y) {
          if (extra[k].function === 0) {
            map[i][j] = 'L';
          } else {
            map[i][j] = 'D';
          }
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
      if (bullets[j].x <= numbers[i].x && bullets[j].y === numbers[i].y) {
        bullets.splice(j, 1);
        if (isGood(numbers[i].num)) {
//          sound.play("sound/correct.mp3");
          player.score++;
          numbers.splice(i, 1);
        } else {
//          sound.play("sound/incorrect.mp3");
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
    const mult = [];
    for (let i = 0; i < 5; i++) {
      const randMult = Math.floor(Math.random() * 9) + 1;
      if (mult.includes(randMult) === false) {
        mult[i] = randMult;
      } else i--;
    }
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
    } else {
      bullets[i].x--;
    }
  }
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

const fillExtra = () => {
  const rand = Math.floor(Math.random() * 2);   // 0 vagy 1
  const randY = Math.floor(Math.random() * map[0].length);
  extra.push({ x: 0, y: randY, function: rand });   // 0: life++, 1: life--
};

const extraMove = () => {
  for (let i = 0; i < extra.length; i++) {
    if (extra[i].x > map.length) {
      extra.splice(i, 1);
    } else {
      extra[i].x++;
    }
  }
};

const collection = () => {
  for (let i = 0; i < extra.length; i++) {
    if (extra[i].x === player.x && extra[i].y === player.y) {
      if (extra[i].function === 0) {
        if (player.life < 5) {
          sound.play("sound/mouse.mp3");
          player.life++;
        }
      } else {
        if (player.life > 0) {
          sound.play("sound/dog.mp3");
          player.life--;
        }
      }
      extra.splice(i, 1);
    }
  }
};

const getPlayerSymb = () => {
  const playerSymbols = ['😺', '😻', '😽', '😼', '😹', '😾', '🦁', '🐯'];
  index = readline.keyInSelect(playerSymbols, chalk.bold.greenBright('Choose a player'));
  if (index === -1) {
    process.exit();
  } else {
    player.symb = playerSymbols[index];
  };
}




module.exports = {
  player,
  exercises,
  generateMap,
  fillMap,
  playerMove,
  hit,
  gamerator,
  numbersMove,
  bulletsMove,
  shoot,
  getActualExercise,
  isGood,
  isFinish,
  reset,
  resetScoreWin,
  fillExtra,
  extraMove,
  collection,
  getPlayerSymb,
  getMap,
};