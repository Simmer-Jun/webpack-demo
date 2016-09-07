var path = require('path');
//var webpack = require('webpack'); modulesDirectories
//console.log(__dirname);  user/sunny/webpack-demo/demo1
/*
* webpack demo1
* webpack是如何管理打包文件的
*/
var config1 = {
  entry: {
    main: './src/main'
  },
  output: {
    path: './dist/',
    filename: '[name]1.js'
  },
  resolve: {
    extensions: ['', '.js']
  }
};
/*
* webpack demo2
* context  && modulesDirectories 的使用
*/
var config2 = {
  context: path.join(__dirname, '/'), // 指定入口文件的查找路径
  entry: { 
    main: 'main' // 首先入口文件的路径不是相对路径 这样他才能够使用类似npm模块的查找机制
  },
  output: {
    path: './dist',
    filename: '[name]2.js'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['src', 'node_modules']  // require("name") 在当前路径/src或当前路径/node_modules/下进行查找
  }
};
/*
* webpack demo3
* noParse  木有任何依赖的包通过使用noParse可以加快webpack的打包速度
*/
var config3 = {
  context: path.join(__dirname, '/a'),
  entry: {
    main: 'main'
  },
  output: {
    path: './dist',
    filename: '[name]3.js'
  },
  resolve: {
    extensions:['', '.js'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    noParse: [/main/] // 解析到改模块木有依赖  webpack将会直接对起进行打包处理
  }
};
/*
* webpack demo4
* alias 模块的别名  在匹配源码中require("name") 如果name匹配到则进行相应的替换
* 可以和module.noParse一起使用  先进行require替换接着直接将模块的内容进行打包
*/
var config4 = {
  context: path.join(__dirname, '/'),
  entry: {
    main: 'main'
  },
  output: {
    path: './dist',
    filename: '[name]4.js'
  },
  resolve: {
    extensions:['', '.js'],
    modulesDirectories: ['src', 'node_modules'],
    alias: { // 模块的别名
      "a": path.resolve(__dirname, 'src/a.js')
    }
  }
};
/*
* webpack demo
* 使用externals声明外部依赖  使用外部依赖的全局变量 e.g require("$")
*/
var config5 = {
  context: path.join(__dirname, '/'),
  entry: {
    main: 'main'
  },
  output: {
    path: './dist',
    filename: '[name]5.js'
  },
  resolve: {
    extensions:['', '.js'],
    modulesDirectories: ['src', 'node_modules']
  },
  externals: {
    $: true
  }
};
module.exports = config5;