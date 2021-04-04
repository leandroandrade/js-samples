const assert = require('assert');

const setUsers = new Set();

const john = { name: 'John' };
const pete = { name: 'Pete' };
const mary = { name: 'Mary' };
const paul = { name: 'Paul' };

setUsers.add(john);
setUsers.add(pete);
setUsers.add(mary);

assert.deepStrictEqual(setUsers.size, 3);

assert.ok(setUsers.has(john));
assert.ok(setUsers.has(pete));
assert.ok(setUsers.has(mary));
assert.ok(!setUsers.has(paul));

assert.ok(setUsers.delete(john));
assert.ok(setUsers.delete(pete));

assert.deepStrictEqual(setUsers.size, 1);

// for (const users of setUsers) {
//     console.log(users.name);
// }
// setUsers.forEach(value => {
//     console.log(value.name);
// });

function unique(arr) {
    const set = new Set(arr);
    assert.deepStrictEqual([...set], ['Hare', 'Krishna', ':-O']);
    // or
    assert.deepStrictEqual(Array.from(new Set(arr)), [
        'Hare',
        'Krishna',
        ':-O',
    ]);
}
const values = [
    'Hare',
    'Krishna',
    'Hare',
    'Krishna',
    'Krishna',
    'Krishna',
    'Hare',
    'Hare',
    ':-O',
];
unique(values);

const map = new Map();
map.set('name', 'John');
const keys = [...map.keys()];
// or
// const keys = Array.from(map.keys());

keys.push('more');
assert.deepStrictEqual(keys, ['name', 'more']);
