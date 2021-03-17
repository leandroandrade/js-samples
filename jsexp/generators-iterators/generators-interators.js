const assert = require('assert');

function* calculation(first, second) {
    yield first * second;
}

function* main() {
    yield 'Hello';
    yield '-';
    yield 'World';
    yield* calculation(20, 10);
}

const generator = main();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200]);
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200]);

const { readFile, stat, readdir } = require('fs/promises');

function* promisified() {
    yield readFile(__filename);
    yield Promise.resolve('Hey John');
}

// Promise.all([...promisified()]).then(result => console.log(result));

async function* systemInfo() {
    const file = await readFile(__filename);
    yield { file: file.toString() };

    const { size } = await stat(__filename);
    yield { size };

    const dir = await readdir(__dirname);
    yield { dir };
}

// (async () => {
//     for await (const data of promisified()) {
//         console.log(data);
//     }
// })();

(async () => {
    for await (const data of systemInfo()) {
        console.log('systemInfo', data);
    }
})();
