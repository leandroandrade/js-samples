const Person = function ({ name, year }) {
    const getAge = () => new Date().getFullYear() - year;

    return Object.freeze({
        name,
        year,
        getAge,
    });
};

const leandro = new Person({ name: 'Leandro', year: 1988 });
console.log(leandro);
console.log(leandro.getAge());

// function other_constructor(spec) {}
//
// function constructor(spec) {
//     const { member } = spec;
//     const { other } = other_constructor(spec);
//     const method = function () {
//         // a b c
//     };
//
//     return Object.freeze({
//         method,
//         other,
//     });
// }
