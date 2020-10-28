const generateMap = (height, width) => {
    const arr = new Array(height);
    for(let i = 0; i < height; i++){
        arr[i] = new Array(width);
    };
    return arr;
};


const map = generateMap(30, 45);
const bullets = []; // x, y
let numbers = []; // x, y, num
const player = [ {x: map.length-1, y: Math.floor(map[0].length/2), score: 0, life: 3}];

const gamerator = (arr) => {
    for (let i = 0; i<10; i++) {
        let random = Math.floor(Math.random() * (100 - 0) +0);   
        if (arr.includes(random) === false ) arr[i] = random;
        else i--;
    }
    return arr;
};

//console.log(gamerator(numbers));