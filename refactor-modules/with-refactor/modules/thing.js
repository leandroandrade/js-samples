const views = require('./view');
const crud = require('./crud');

const awesomeThing = () => {};

module.exports = { awesomeThing, ...views, ...crud };
