const { table, getBorderCharacters } = require('table');

const generateMap = (height, width) => {
  const arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width);
  };
  return arr;
};

const map = generateMap(30, 15);
const bullets = []; // x, y
const numbers = []; // x, y, num
const player = { name: '', x: map.length - 1, y: Math.floor(map[0].length / 2), score: 0, life: 3 };
let actualExercise = '';
let exercises =
  [ 'Lődd ki a prímszámokat!',
    'Lődd ki a páratlan számokat!',
    'Lődd ki a páros számokat!',
    'Lődd ki a 3-mal osztható számokat',
    'Lődd ki a 4-gyel osztható számokat',
    'Lődd ki az 5-tel osztható számokat',
    'Lődd ki a 6-tal osztható számokat',
    'Lődd ki a 7-tel osztható számokat',
    'Lődd ki a 8-cal osztható számokat',
    'Lődd ki a 9-cel osztható számokat',
    'Lődd ki a számokat növekvő sorrendben!',
    'Lődd ki a számokat csökkenő sorrendben!'];
let rand = 2;
//Math.floor(Math.random() * exercises.length);


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
      if (isPrime(n)) {
        return true;
      } else return false;
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
  const config = { singleLine: true };
  console.clear();
  console.log(actualExercise);
  console.log(player);
  const text = table(map, config);
  console.log(text);
};

// const printMap = () => {
//   console.clear();
//   console.log(actualExercise);
//   console.log(rand);
//   console.log(player); 
//   console.log(task());
//   console.log(isFinish());
//   for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[i].length; j++) {
//       process.stdout.write(map[i][j] + ' ');
//     }
//     console.log();
//   }
// };


const playerMove = (isRight) => {
  if (isRight && player.y < map[0].length - 1) {
    player.y++;
  } else if (isRight === false && player.y > 0) {
    player.y--;
  }
};

const isHit = () => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < bullets.length; j++) {
      if (bullets[j].x === numbers[i].x && bullets[j].y === numbers[i].y && isGood(numbers[i].num)) {
        hit(numbers[i].x, numbers[i].y);
        player.score++;
      }
      else if (bullets[j].x === numbers[i].x && bullets[j].y === numbers[i].y) {
        player.life--;
        bullets.splice(j, 1);
      }
    }
  };
}

const hit = (x, y) => {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].x === x && numbers[i].y === y) {
      numbers.splice(i, 1);
    }
  }
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j].x === bullets[i].x && numbers[j].y === bullets[i].y) {
        numbers.splice(j, 1);
        bullets.splice(i, 1);
     //   console.log(numbers[j].x, bullets[i].x, numbers[j].y, bullets[i].y);
      };
    };
  };
};

const gamerator = () => {
  let arr = [];
  if (rand === 0) {
    const primes = [2, 5, 13, 29, 43];
    for (let i = 0; i < 5; i++) {
      const randIndex = Math.floor(Math.random() * 15);
      arr[randIndex] = primes[i];
    }
  }
  if (rand >= 3 && rand <= 9) {
    const mult = [2, 5, 8, 3, 7];
    for (let i = 0; i < 5; i++) {
      const randIndex = Math.floor(Math.random() * 15);
      arr[randIndex] = mult[i] * rand;
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
    }
    else {
      if (player.life > 0) player.life--;
    };
  };
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

module.exports = {
  player,
  generateMap,
  fillMap,
  printMap,
  playerMove,
  hit,
  gamerator,
  numbersMove,
  bulletsMove,
  shoot,
  isHit,
  task,
  isGood,
  isFinish
};