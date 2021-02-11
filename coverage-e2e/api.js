const http = require('http');

const DEFAULT_USER = { username: 'leandro', password: '234' };

const routes = {
    '/contact:get': (request, response) => {
        response.write('Contact us page');
        return response.end();
    },
    '/login:post': async (request, response) => {
        // request e um iterator
        for await (const data of request) {
            const user = JSON.parse(data);

            if (
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ) {
                response.writeHead(401);
                response.write('Logging failed!');
                return response.end();
            }
            response.write('Logging has succeeded!');
            return response.end();
        }
    },
    default: (reques, response) => {
        response.write('Hello World!');
        return response.end();
    },
};

const handler = (request, response) => {
    const { url, method } = request;

    const routeKey = `${url}:${method.toLowerCase()}`;
    const choosen = routes[routeKey] || routes.default;

    response.writeHeader(200, {
        'Content-Type': 'text/html',
    });

    return choosen(request, response);
};

const app = http
    .createServer(handler)
    .listen(3000, () => console.log('app running at', 3000));

module.exports = app;
