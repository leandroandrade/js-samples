const assert = require('assert');
const Event = require('events');

const event = new Event();

const eventName = 'counter';
event.on(eventName, msg => console.log('event counter updated:', msg));

const myCounter = {
    counter: 0,
};

const proxy = new Proxy(myCounter, {
    set(target, key, value) {
        event.emit(eventName, {
            key,
            newValue: value,
            previousValue: target[key],
        });

        // target[key] = value;
        Reflect.set(target, key, value);
        return true;
    },

    get(target, key) {
        // return target[key];
        return Reflect.get(target, key);
    },
});

proxy.counter = 1;
assert.deepStrictEqual(proxy, { counter: 1 });
assert.deepStrictEqual(proxy.counter, 1);

// execucao imediata, mas acaba com o ciclo de vida do node, prioridade total
process.nextTick(() => {
    console.log('[0]: nextTick');
});

// execucao futura
setTimeout(() => {
    console.log('[1]: setTimeout');
}, 10);

// execucao imediata
setImmediate(() => {
    console.log('[2]: setImmediate');
});

setInterval(function () {
    console.log('[3]: setInterval');

    clearInterval(this);
}, 200);
