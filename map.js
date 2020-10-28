const table = require('table');

const generateMap = (height, width) => {
    const arr = new Array(height);
    for (let i = 0; i < height; i++) {
        arr[i] = new Array(width);
    };
    return arr;
};

const map = generateMap(30, 45);
const bullets = []; // x, y
const numbers = []; // x, y, num
const player = { x: map.length - 1, y: Math.floor(map[0].length / 2), score: 0, life: 3 };
let exercise;

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
  console.log(bullets);
  console.log(player);
};

const printMap = () => {
  for(let i = 0; i < map.length; i++){
    for (let j=0; j< map[i].length; j++){
      process.stdout.write(map[i][j] + ' ');
    }
    console.log();
  }
};

const playerMove = (isRight) => {
  if (isRight && player.y < map[0].length-1) {
    player.y++;
  } else if (isRight === false && player.y > 0){
    player.y--;
  }
};


const hit = (x, y) => {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].x === x && numbers[i].y === y) {
      numbers.splice(i, 1);
    }
  }
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].x === x && bullets[i].y === y) {
      bullets.splice(i, 1);
    }
  }
};

const gamerator = () => {
    const arr = [];
    for (let i = 0; i<15; i++) {
        let object = {x:0, y:0, num:0};
        let random = Math.floor(Math.random() * (100 - 0) +0);   
        if (arr.includes(random) === false ) {
            arr[i] = random;
            object.num = random;
            if ( i<5) object.x = 0;
            else object.x =1;
            object.y = i*3;
            numbers.push(object);        
        }
        else i--;
    }
};

const numbersMove = () => {
    for (let i = 0; i < numbers.length; i++){
        if (numbers[i].x < map.length-2){
            numbers[i].x ++;
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
  //let object = {x:0, y:0};
  //object.x = 20;
  //object.y = 10;
  bullets.push({x: player.x -1, y: player.y});
}

module.exports = {
  generateMap,
  fillMap,
  printMap,
  playerMove,
  hit,
  gamerator,
  numbersMove,
  bulletsMove,
  shoot
};