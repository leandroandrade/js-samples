const express = require('express');

const app = express();

/**
 * A função .json faz stringfy do objeto enviado, o que diminui a performance já que faz uso intenso de CPU
 * o que não é amigável ao Node.js.
 *
 * Melhor resultado: 44k requests in 10s
 * Comando: autocannon http://localhost:3000/not_cached
 */
const json = { some: 'data' };
app.get('/not_cached', (req, res) => res.status(200).json(json));

/**
 * A performance melhora consideravelmente quando utilizados o res.setHeader e o res.send, além do cache da resposta.
 *
 * Melhor resultado: 60k requests in 10s
 * Comando: autocannon http://localhost:3000/cached

 */
const stringifyed = JSON.stringify({ some: 'data' });
app.get('/cached', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(stringifyed);
});

app.listen(3000, () => console.log('Server started'));
