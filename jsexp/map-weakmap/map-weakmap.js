const assert = require('assert');

const myMap = new Map();
myMap
    .set(1, 'one')
    .set('Paul', { text: 'hello' })
    .set(true, () => 'hello');

const mapWithConstructor = new Map([
    [1, 'number'],
    ['1', 'string'],
    [true, 'boolean'],
]);

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Paul'), { text: 'hello' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// em object, as chaves so podem ser string ou Symbol
const somentePorReferencia = { id: 1 };
myMap.set(somentePorReferencia, { name: 'some name' });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(somentePorReferencia), { name: 'some name' });

// total de chaves em object: Object.keys(?).length

assert.deepStrictEqual(myMap.size, 4);

// verificar se uma chave existe em object: ({name: 'Paul'}).hasOwnProperty('name')
assert.ok(myMap.has(1));
assert.ok(myMap.delete(somentePorReferencia));

assert.deepStrictEqual(
    JSON.stringify([...myMap]),
    JSON.stringify([
        [1, 'one'],
        ['Paul', { text: 'hello' }],
        [true, () => {}],
    ])
);

// for (const [key, value] of myMap) {
//     console.log({ key, value });
// }

const person = {
    name: 'Some name',
    toString: 'Some name toString',
};

myMap.set(person);
assert.ok(myMap.has(person));
assert.throws(() => myMap.get(person).toString, TypeError);

// limpar map
myMap.clear();
assert.deepStrictEqual([...myMap], []);

const weak = new WeakMap();
const hero = {
    name: 'Flash',
};

weak.set(hero);
weak.get(hero);
weak.delete(hero);
weak.has(hero);
