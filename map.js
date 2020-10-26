const fillMap = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (player.x === j && player.y === i) {
        array[i][j] = 'P';
      } else {
        array[i][j] === '';
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