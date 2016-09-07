## demo1 - webpack 基础打包

来看一段简单的webpack配置代码
```js
var config = {
  entry: {
    main: 'main' // 打包入口文件
  },
  output: {
    path: 'dist/', // 打包路径
    filename: '[name].js'  // 打包文件名
  },
  resolve: {
    extensions: ['', '.js']
  }
};

module.exports = config;
```

### tips
通常在控制台需要查看webpack的详细报错信息，我们可以在命令行中加上`--display-error-details` 

### 如何打包？
你可以查看当前目录下的`dist/main.js`文件来查看webpack是如何对javascript模块进行打包的
```js
(function(modules){ // IIFE 立即执行表达式
  var installedModules = {};  // 创建一个模块缓存对象用来缓存模块信息
  function _webpack_require_(moduleId) { // webpack 加载模块函数
    if(installedModules[moduleId])
      return installedModules[moduleId].exports; // 如果即将加载的模块已经被缓存则直接返回模块缓存的结果
    var module = installedModules[moduleId] = { // 新建一个模块缓存对象
      exports: {},
      id: moduleId,
      loaded: false
    };
    modules[modules].call(module.exports, module, module.exports, _webpack_rquire_); // 加载模块传入相应的模块缓存对象
    module.loaded = true; // 模块加载完全
    return module.exports // 返回模块依赖
  }
  _webpack_require_.m = modules; // 暴露模块对象
  _webpack_rquire.c = installedModules; // 暴露缓存模块对象
  return _webpack_require_(0); // 加载入口模块并且返回模块暴露接口
  
})([ // 传入的参数是以函数组成的数组，每个函数代表一个webpack管理的模块
// module ID 0
function(module, exports[, _webpack_require_]) {
  // module code
},
// module ID 1
function(module, exports[, _webpack_require_]) {
  // module code
}...
])
```
