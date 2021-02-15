import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

// optimized function now has a maximum execution time of 2.5 seconds.
async function optimizedVersion() {
    // Schedule the unrelated operation here. The removal of the
    // `await` keyword tells JavaScript that the rest of the code can
    // be executed without having to _wait_ for `operation` to resolve.
    const operation = sleep(2500);

    // Now that `operation` has been scheduled, we can
    // now initiate the file read and the network request.
    const url = await fs.readFile('file.txt');
    const result = await fetch(url);

    // Once the network request resolves, we can now wait for
    // the pending `operation` to resolve.
    await operation;

    return result;
}
