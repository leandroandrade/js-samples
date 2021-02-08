const url = require('url');

const parse = url.parse('https://medium.com/better-programming/');
console.log(parse);

const resolve = url.resolve('https://medium.com/', '/better-programming/');
console.log(resolve);

const search = new URL('https://simplesite.com/products?category=car');
console.log(search.searchParams.get('category'));
