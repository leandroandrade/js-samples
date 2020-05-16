const fs = require('fs');

// Check whether it is a folder
fs.statSync('./index.html').isDirectory();

// Print all the files in a directory
fs.readdir('./test-dir', (err, files) => {
    files.forEach(file => {
        console.log(file);
    })
});

// Watch a directory for changes and give out the type of change
fs.watch('./test-dir', (eventType, filename) => {
    if (filename) console.log(filename, eventType);
});

// Read the file and print out the content of it
fs.readFile('./note.txt', 'utf8', (err, data) => {
    console.log(data);
});

// If you leave out the parameter for the decoding, in our example, “utf8”, by default, the content will be given out as a buffer.
// Add something to the file
fs.appendFile('./note.txt', 'This is new!', err => {
    if (err) throw err;
    console.log('file changed');
});

// Create a new file, write something into it/clear file
fs.writeFile('./note.txt', '', err => {
    if (err) throw err;
    console.log('file cleared');
});