const { promisify } = require('util');

const sleep = promisify(setTimeout);

/**
 * This function runs three independent operations sequentially.
 * Even if each operation is independent from each other, it makes
 * the mistake of running one after the other as if they were
 * dependent. In this case, the "idle time" is unnecessary and
 * extremely wasteful.
 */
async function sequential() {
    await sleep(2000);
    await sleep(3000);
    await sleep(4000);
}

/**
 * This function runs all of the operations concurrently.
 * `Promise.all` automatically schedules all of the
 * promises in the given array. By the time they all
 * resolve, `Promise.all` can safely return the array
 * of resolved values (if applicable).
 */
async function concurrent() {
    await Promise.all([sleep(2000), sleep(3000), sleep(4000)]);
}

// **TOTAL EXECUTION TIMES**
// Sequential: ~9.0 seconds ❌
// Concurrent: ~4.0 seconds ✔
