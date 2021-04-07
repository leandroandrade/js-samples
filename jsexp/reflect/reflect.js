const assert = require('assert');

const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue;
    },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

myObj.add.apply = function () {
    throw new TypeError('Some Error');
};

assert.throws(() => myObj.add.apply({}, []), {
    name: 'TypeError',
    message: 'Some Error',
});

// usando Reflect
const result = Reflect.apply(myObj.add, { arg1: 1, arg2: 3 }, [100]);
assert.deepStrictEqual(result, 104);

// -- defineProperty

function MyDate() {}
// definindo propriedades com Object
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey Object' });

// definindo propriedade com Reflect
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey Relect' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey Object');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey Relect');

// -- defineProperty

// -- delete

// remover propriedade
const withDelete = { user: 'john' };

// evitar o uso
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

// remover com Reflect
const withReflection = { user: 'paul' };
Reflect.deleteProperty(withReflection, 'user');
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);

// -- delete

// -- get

// obter propriedades inexistentes
assert.deepStrictEqual((1).property, undefined);
assert.throws(() => Reflect.get(1, 'username'), TypeError);

// -- get

// -- has
assert.ok('property' in { property: '' });
assert.ok(Reflect.has({ property: '' }, 'property'));
// -- has

// -- ownKeys
const user = Symbol('user');
const databaseUser = { id: 1, [Symbol.for('password')]: 123, [user]: 'paul' };
const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser),
];
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [
    'id',
    Symbol.for('password'),
    user,
]);
// -- ownKeys
