const assert = require('assert');

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
    '0',
    '1',
    '2',
    '3',
]);

assert.ok(set.has('3'));

const users1 = new Set(['john', 'michael', 'david']);
const users2 = new Set(['paul', 'john', 'Ivy']);

const intersection = new Set([...users1].filter(user => users2.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['john']);

const user1 = { id: 1 };
const weak = new WeakSet([user1]);

const user2 = { id: 2 };

assert.ok(weak.has(user1));
assert.ok(!weak.has(user2));

weak.add(user2);
assert.ok(weak.has(user2));

weak.delete(user2);
assert.ok(!weak.has(user2));
