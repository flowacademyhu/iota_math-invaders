const generateMap = (height, width) => {
    const arr = new Array(height);
    for(let i = 0; i < height; i++){
        arr[i] = new Array(width);
    };
    return arr;
};


const map = generateMap(30, 45);
const bullets = []; // x, y
const numbers = []; // x, y, num
const player = {x: map.length-1, y: Math.floor(map[0].length/2), score: 0, life: 3};
let exercise;


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

