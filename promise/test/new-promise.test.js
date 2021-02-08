const NewPromise = require('../new-promise');

describe('Promise', () => {
    it('should create new promise with pending state', function () {
        const Promise = new NewPromise(() => {});

        expect(Promise.state).toBe('pending');
        expect(Promise.value).toBe(undefined);
    });

    describe('When fulfilled', function () {
        it('should then a Promise', function (done) {
            return new NewPromise(resolve => resolve({ data: 'fake' })).then(
                response => {
                    expect(response.data).toBe('fake');
                    done();
                }
            );
        });
    });
});
