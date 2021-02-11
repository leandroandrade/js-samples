const { describe, it } = require('mocha');
const request = require('supertest');
const assert = require('assert');
const app = require('./api');

describe('API Suite test', () => {
    it('should request a contact page and return HTTP status 200', async () => {
        const response = await request(app).get('/contact').expect(200);
        assert.deepStrictEqual(response.text, 'Contact us page');
    });

    it('should request an inexistent route /hi and redirect to /hello', async () => {
        const response = await request(app).get('/hi').expect(200);
        assert.deepStrictEqual(response.text, 'Hello World!');
    });

    it('should login successfully on the login route and return HTTP status code 200', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'leandro', password: '234' })
            .expect(200);

        assert.deepStrictEqual(response.text, 'Logging has succeeded!');
    });

    it('should unauthorize a request when requesting using wrong credentials and return HTTP status 401', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'leandro', password: '111' })
            .expect(401);

        assert.ok(response.unauthorized);
        assert.deepStrictEqual(response.text, 'Logging failed!');
    });
});
