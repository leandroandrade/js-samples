const assert = require('assert');

(async () => {
    assert.deepStrictEqual(
        { name: 'john', age: 32 },
        { name: 'john', age: 32 }
    );

    const notReject = async () => {
        console.log('notReject');
        // throw new Error('some error!');
    };
    await assert.doesNotReject(notReject, Error);

    const notThrow = () => {
        console.log('notThrow');
        // throw new Error('some error!');
    };
    assert.doesNotThrow(notThrow, Error);

    assert.notDeepStrictEqual({ age: 32 }, { age: '32' });

    assert.notStrictEqual({ age: 32 }, { age: '32' });

    assert.ok(true);
    assert.ok(1);
    assert.ok({});
    assert.ok([]);

    const expectedReject = new Error('expectedReject');
    const fnReject = async () => {
        // console.log('expectedReject');
        throw new Error('expectedReject');
    };
    await assert.rejects(fnReject, expectedReject);

    const expectedThrows = new Error('expectedThrows');
    const fnThrows = () => {
        // console.log('expectedThrows');
        throw new Error('expectedThrows');
    };
    assert.throws(fnThrows, expectedThrows);
})();
