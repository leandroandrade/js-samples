console.assert(String(123) === '123', 'explicit convert to string');
// eslint-disable-next-line
console.assert(123 + '' === '123', 'implicit convertion to string');
console.assert(
    ('hello' || 1) === 'hello',
    '|| sempre retorna o primeiro quando os dois forem true'
);
console.assert(
    ('hello' && 1) === 1,
    '&& sempre retorna o ultimo quando os dois forem true'
);

const item = {
    name: 'John',
    age: 32,

    // string: se nao for primitivo, chama o valueOf
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
    },
    // number: se nao for primitivo, chama o toString
    valueOf() {
        return 007;
    },

    // total prioridade sobre o toString e valueOf
    [Symbol.toPrimitive](coersionType) {
        console.log(coersionType);
        const types = {
            string: JSON.stringify(this),
            number: 007,
        };

        return types[coersionType] || types.string;
    },
};

// console.assert(String(item) === 'Name: John, Age: 32', 'toString');
// console.assert(Number(item) == 007, 'valueOf');

console.assert(String(item) === '{"name":"John","age":32}', 'Symbol string');
console.assert(Number(item) === 7, 'Symbol number');
