const STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
};

class NewPromise {

    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new Error('Executor must be a function');
        }

        this.state = STATE.PENDING;
        this.value = undefined;

        this.onFulfilChain = [];
        this.onRejectCallChain = [];

        executor(this.resolve.bind(this));
    }

    then(resolve) {
        return new NewPromise(executor => {
            executor(resolve(this.value));
        });
    }

    resolve(res) {
        if (this.state !== STATE.PENDING) return;

        this.state = STATE.FULFILLED;
        this.value = res;

    }

}

module.exports = NewPromise;