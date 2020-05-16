const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Type some number');

// rl.question('Your number: ', number => {
//     console.log(`You type the number -> ${ number }`);
//     rl.close();
// });

rl.on('line', input => {
    console.log(`You entered with: ${ input }`);
});

rl.on('SIGINT', input => {
    rl.question('Are you sure you want to exit? ', (answer) => {
        if (answer.match(/^y(es)?$/i)) process.exit()
        else console.log('Ok, here we go...');
    })
});

