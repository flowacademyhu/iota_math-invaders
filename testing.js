const figlet = require('figlet');
const lolcatjs = require('lolcatjs');

// lolcatjs.options.seed = Math.round(Math.random() * 2);
// lolcatjs.options.colors = true;

// figlet('Shoot all numbers in descending order!', {
//     font: 'ANSI Shadow',
//     horizontalLayout: 'full',
//     verticalLayout: 'full',
//     width: 200,
//     whitespaceBreak: true
// }, function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     lolcatjs.fromString(data);
// });

//\nPress any key to continue!

lolcatjs.fromString(figlet.textSync('Shoot all numbers in descending order!', {
    font: 'ANSI Shadow',
    horizontalLayout: 'full',
    verticalLayout: 'full',
    width: 200,
    whitespaceBreak: true
}));