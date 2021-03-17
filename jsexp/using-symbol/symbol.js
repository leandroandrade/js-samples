const assert = require('assert');

// cada Symbol utiliza um unico endereco de memoria
const uniqueKey = Symbol('userName');
const user = {
    userName: 'value for normal object',
    [uniqueKey]: 'value using Symbol',
};

// console.log(user.userName);

// novo endereco de memoria utilizado
// console.log(user[Symbol('userName')]);

// mesmo enderco de memoria utilizado na chave criada
// console.log(user[uniqueKey]);

assert.deepStrictEqual(user.userName, 'value for normal object');

// novo endereco de memoria utilizado
assert.deepStrictEqual(user[Symbol('userName')], undefined);
assert.deepStrictEqual(user[uniqueKey], 'value using Symbol');

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// Symbols conhecidos
const obj = {
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop(),
            };
        },
    }),
};
// console.log([...obj]);
// for (const item of obj) {
//     console.log('item', item);
// }
assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');

class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg));
    }

    // substitui o [object Object]
    get [Symbol.toStringTag]() {
        return 'MyString';
    }

    [Symbol.toPrimitive](coersionType) {
        if (coersionType !== 'string') throw new TypeError();

        const itensFormatted = this[kItems].map(item =>
            new Intl.DateTimeFormat('pt-BR', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
            }).format(item)
        );
        return new Intl.ListFormat('pt-BR', {
            style: 'long',
            type: 'conjunction',
        }).format(itensFormatted);
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item;
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms));
        for (const item of this[kItems]) {
            await timeout(100);
            yield item.toISOString();
        }
    }
}

const myDate = new MyDate([2020, 10, 12], [2021, 10, 10]);
const expectedDates = [new Date(2020, 10, 12), new Date(2021, 10, 10)];

assert.deepStrictEqual(
    Object.prototype.toString.call(myDate),
    '[object MyString]'
);
assert.throws(() => myDate + 1);

// coercao explicita para chamar to toPrimitive
assert.deepStrictEqual(
    String(myDate),
    '12 de novembro de 2020 e 10 de novembro de 2021'
);
assert.deepStrictEqual([...myDate], expectedDates);

// (async () => {
//     for await (const item of myDate) {
//         console.log(item);
//     }
// })();

(async () => {
    // const dates = await Promise.all([...myDate]);
    // assert.deepStrictEqual(dates, expectedDates);

    const dates = [];

    for await (const date of myDate) {
        dates.push(date);
    }

    const expectedDatesInISOString = expectedDates.map(item =>
        item.toISOString()
    );

    assert.deepStrictEqual(dates, expectedDatesInISOString);
})();
