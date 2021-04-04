const assert = require('assert');

const mapUser = new Map([
    ['name', 'John'],
    ['age', 42],
    ['email', 'john@email.com'],
]);

const objUsers = Object.fromEntries(mapUser);
assert.deepStrictEqual(objUsers.name, 'John');
assert.deepStrictEqual(objUsers.age, 42);
assert.deepStrictEqual(objUsers.email, 'john@email.com');

const newMapUser = new Map(Object.entries(objUsers));
assert.deepStrictEqual(newMapUser.get('name'), 'John');
assert.deepStrictEqual(newMapUser.get('age'), 42);
assert.deepStrictEqual(newMapUser.get('email'), 'john@email.com');
