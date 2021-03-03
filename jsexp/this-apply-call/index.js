const {
    watch,
    promises: { readFile },
} = require('fs');

// watch(__filename, async (event, filename) => {
//     console.log((await readFile(filename)).toString());
// });

class File {
    watch(event, filename) {
        this.showContent(filename);
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString());
    }
}

const file = new File();
// ignore o "this" da classe file e pega o "this" da funcao watch
// watch(__filename, file.watch);

// alternativa para usar o "this" da classe file
watch(__filename, (event, filename) => file.watch(event, filename));

// forma correta para considera o "this" da classe file, ou seja, encapsula o "this" da classe File
watch(__filename, file.watch.bind(file));

file.watch.call(
    { showContent: () => console.log('new showContent call') },
    null,
    __filename
);

file.watch.apply({ showContent: () => console.log('new showContent apply') }, [
    null,
    __filename,
]);

const calculateArea = function (fn) {
    return fn(Math.PI * Math.pow(this.radius, 2));
};
const circle = {
    radius: 10,
    calculateArea,
};

console.log(circle.calculateArea(Math.round));
console.log(calculateArea.call(circle, Math.round));
console.log(calculateArea.apply(circle, [Math.ceil]));
