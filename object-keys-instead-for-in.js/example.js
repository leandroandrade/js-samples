const person = {
    name: 'Brendan Eich',
    year: 1961,
};

for (const key in person) {
    console.log('forin', key);
}

Object.keys(person).forEach(key => console.log('keys', key));
