import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

// If all goes well, the minimum total execution time of the function is 2.5 seconds.

async function purelySequential() {
    // Let us assume that this file contains a single line
    // of text that happens to be some valid URL.
    const url = await fs.readFile('file.txt');
    const response = await fetch(url);

    // Execute some **unrelated** asynchronous
    // opeartion here...
    await sleep(2500);

    return result;
}
