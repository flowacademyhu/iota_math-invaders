const generateMap = (height, width) => {
  const arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width);
  }
  return arr;
};

const map = generateMap(5, 10);
const bullets = []; // x, y
const numbers = []; // x, y, num
const player = { x: map.length - 1, y: Math.floor(map[0].length / 2), score: 0, life: 3 };

const fillMap = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (player.x === i && player.y === j) {
        map[i][j] = 'P';
      }

      for (let k = 0; k < bullets.length; k++) {
        if (i === bullets[k].x && j === bullets[k].y) {
          map[i][j] = 'B';
        }
      }

      for (let k = 0; k < bullets.length; k++) {
        if (i === numbers[k].x && j === numbers[k].y) {
          map[i][j] = 'N';
        }
      }
    }
  }
};

const playerMove = (isRight) => {
  if (isRight) {
    player.y++;
  } else {
    player.y--;
  }
}
;
