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
const player = [{ x: map.length - 1, y: Math.floor(map[0].length / 2), score: 0, life: 3 }];

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