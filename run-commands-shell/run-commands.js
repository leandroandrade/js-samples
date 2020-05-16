const { exec } = require('child_process');

exec('cd .. && ls', (error, output) => {
    if (error) throw error;

    console.log(output);
})