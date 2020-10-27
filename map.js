var readlineSync = require('readline-sync');

const generateMap = (height, width) => {
    const arr = new Array(height);
    for(let i = 0; i < height; i++){
        arr[i] = new Array(width);
    };
    return arr;
};
