const Base = require('./base');

module.exports = class Customer extends Base {
    constructor({ id, name, age }) {
        super({ id, name });

        this.age = age;
    }
};
