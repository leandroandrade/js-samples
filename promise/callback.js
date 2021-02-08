const fs = require('fs');
const { promisify } = require('util');

const readFilePromise = promisify(fs.readFile);

console.log('>> Inicio execucao...');

const contentSync = fs.readFileSync(__filename);
console.log(contentSync);

fs.readFile(__filename, (err, content) => {
    console.log('>>> Execucao assincrona com callback');
    console.log(content);
});

readFilePromise(__filename).then(content => {
    console.log('>>> Execucao assincrona com promisify');
    console.log(content);
});

console.log('>> Fim execucao');
