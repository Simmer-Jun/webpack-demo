//main.js

var moduleA = require('./a');
var moduleB = require('./b');

var consoles = window.console.bind(window);
consoles(moduleA, moduleB);