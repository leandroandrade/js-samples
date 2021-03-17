const assert = require('assert');
const https = require('https');

function* data(values) {
    const [first, second, third] = values;
    yield first * 2;
    yield second * 2;
    yield third * 2;
}

function* doRequest() {
    console.log('running request...');

    yield https.get(
        'https://run.mocky.io/v3/2023ce44-51e1-4e67-b8f3-4ea3906e3c89'
    );
}

function* getRequests() {
    yield* doRequest();
    yield* doRequest();
    yield* doRequest();
}

(async () => {
    assert.deepStrictEqual([...data([1, 2, 3])], [2, 4, 6]);

    for await (const response of getRequests()) {
        console.log('response', response);
        console.log('done!');
    }
})();
