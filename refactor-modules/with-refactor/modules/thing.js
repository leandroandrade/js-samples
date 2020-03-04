'use strict';

const views = require('./view');
const crud = require('./crud');

const awesomeThing = () => {

};

module.exports = Object.assign({ awesomeThing }, views, crud);
