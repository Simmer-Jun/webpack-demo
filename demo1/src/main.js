//main.js

// config4 var moduleA = require('a');
// config5 var $ = require('$');
var moduleA = require('./a');
var moduleB = require('./b');

var consoles = window.console.bind(window);
consoles(moduleA, moduleB);