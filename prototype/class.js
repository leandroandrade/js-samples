class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    start() {
        console.log('vroom');
    }

    toString() {
        console.log(`Car - ${this.make} - ${this.model}`);
    }
}

class SportsCar extends Car {
    constructor(make, model, turbocharged) {
        super(make, model);
        this.turbocharged = turbocharged;
    }

    start() {
        console.log('VROOOOM');
    }
}

// Actual usage remains the same
const car = new Car('Nissan', 'Sunny');
car.start(); // vroom
console.log(car.make); // Nissan

const sportsCar = new SportsCar('Subaru', 'BRZ', true);
sportsCar.start(); // VROOOOM
console.log(car.turbocharged); // true
