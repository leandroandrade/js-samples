const os = require('os');

// array of information about each cpu core
console.log(os.cpus());

// total memory, free memory, in Gigabyte:
console.log(os.totalmem() / 1024 / 1024 / 1024);

console.log(os.freemem() / 1024 / 1024 / 1024);

// uptime in hours:
console.log(os.uptime() / 60 / 60);
