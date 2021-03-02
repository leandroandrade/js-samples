const assert = require('assert');

// objetos literais
const obj = {};
const arr = [];
const fn = () => {};

// internamente, objetos literais viram funcoes explicitas
console.log('new Object() is {}', new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

console.log(
    'obj.__proto__ === Object.prototype',
    obj.__proto__ === Object.prototype
);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log(
    'arr.__proto__ === Array.prototype',
    arr.__proto__ === Array.prototype
);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log(
    'fn.__proto__ === Function.prototype',
    fn.__proto__ === Function.prototype
);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// o __proto__ de Object.prototype e null
// obj.__proto__ => Object.prototype.__proto__ => null
console.log(
    'obj.__proto__.__proto__ === null',
    obj.__proto__.__proto__ === null
);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

console.log('-----');

function Employee() {}
Employee.prototype.salary = () => 'salary**';

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare**';

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**';

// via prototype funciona, sem retorna erro
console.log(Manager.prototype.salary());
// console.log(Manager.salary());

// -------------

// se nao usar o new, o __proto__ sera o de function
console.log(
    'Manager.__proto__ === Function.prototype',
    Manager.__proto__ === Function.prototype
);
assert.deepStrictEqual(Manager.__proto__, Function.prototype);

// se usar o new, o __proto__ sera do objeto instanciado
console.log(
    'new Manager().__proto__ === Manager.prototype',
    new Manager().__proto__ === Manager.prototype
);
assert.deepStrictEqual(new Manager().__proto__, Manager.prototype);

// -------------

const manager = new Manager();

console.log(
    'manager.__proto__ === Manager.prototype',
    manager.__proto__ === Manager.prototype
);
assert.deepStrictEqual(manager.__proto__, Manager.prototype);

console.log(
    'manager.__proto__.__proto__ === Supervisor.prototype',
    manager.__proto__.__proto__ === Supervisor.prototype
);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);

console.log(
    'manager.__proto__.__proto__.__proto__ === Employee.prototype',
    manager.__proto__.__proto__.__proto__ === Employee.prototype
);
assert.deepStrictEqual(
    manager.__proto__.__proto__.__proto__,
    Employee.prototype
);

console.log(
    'manager.__proto__.__proto__.__proto__.__proto__ === Object.prototype',
    manager.__proto__.__proto__.__proto__.__proto__ === Object.prototype
);
assert.deepStrictEqual(
    manager.__proto__.__proto__.__proto__.__proto__,
    Object.prototype
);

console.log(
    'manager.__proto__.__proto__.__proto__.__proto__.__proto__ === null',
    manager.__proto__.__proto__.__proto__.__proto__.__proto__ === null
);
assert.deepStrictEqual(
    manager.__proto__.__proto__.__proto__.__proto__.__proto__,
    null
);

class T1 {
    ping() {
        return 'ping';
    }
}

class T2 extends T1 {
    pong() {
        return 'pong';
    }
}

class T3 extends T2 {
    shoot() {
        return 'shoot';
    }
}

const t3 = new T3();

console.log(
    't3 inherits null?',
    t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null
);
console.log('t3.shoot()', t3.shoot());
console.log('t3.pong()', t3.pong());
console.log('t3.ping()', t3.ping());

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
    t3.__proto__.__proto__.__proto__.__proto__,
    Object.prototype
);
assert.deepStrictEqual(
    t3.__proto__.__proto__.__proto__.__proto__.__proto__,
    null
);
