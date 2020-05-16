const vm = require('vm');

const x = 1;
const context = { x };

vm.createContext(context);

const code = `
   x = x + 40; 
   var y = 17; 
   var hello = function() { return "function from the VM" }
`;

vm.runInContext(code, context);

console.log(context.x);
console.log(context.y);
console.log(context.hello());