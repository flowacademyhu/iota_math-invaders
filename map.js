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
            numbers.x ++;
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