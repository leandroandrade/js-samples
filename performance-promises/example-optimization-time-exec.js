const { promisify } = require('util');

const sleep = promisify(setTimeout);

(async () => {
    console.time('Sequential');
    await sleep(1000);
    await sleep(2000);
    console.timeEnd('Sequential');

    console.time('Optimized');
    const operation = sleep(2000);
    await sleep(1000);
    await operation;
    console.timeEnd('Optimized');

    // Sequential: ~3.0 seconds X
    // Optimized: ~2.0 seconds ✔
})();
