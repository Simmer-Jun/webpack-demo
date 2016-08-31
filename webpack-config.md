## webpack config

About webpack config file.

我们都知道webpack管理的是所有的静态资源，javascript|css|scss|less|stylus|img|font file|html.

webpack 有两种使用方法，一种是通过命令行的方式，一种是通过配置文件，通常是`webpack.config.js`，是的你没有看错，webpack的配置文件就是一个纯js文件而不是json类的静态配置文件，这也就意味着webpack的配置文件能够有更加的灵活性。

## 命令行参数

  * 不带参数，只进行单次开发环境打包
  * `-p`生产环境编译及压缩
  * `-wtach` 开发环境下的持续性监听并打包
  * `--color` 在命令行中输出的结果带有色彩
  * `--profile` 在命令行中输出性能数据
  * `--display-modules` 认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块


## CLI

通过命令行的方式来调用webpack.
  
  
## config file

在执行webpack打包的时候，webpack会默认在当前命令行所在的路径下查找`webpack.config.js`文件，解析并加载这个配置文件中的数据，根据配置数据来对当前项目的静态资源进行打包。

来看一个常规的webpack配置文件:
```js
var config = {
    entry: './src/js/index.js', // 入口文件
    output: { 
        path: './dist/',
        filename: "[name]" + ".js"
    },// 模块加载
    module: {
        loaders: [
        {
            test: /(.js)|(.jsx)$/,
            loaders: ['react-hot', 'babel?presets[] = es2015&presets[]=react'],
            exclude: /node_modules/
        }]
    },// 模块解析
    resolve: {
        extensions: ['','.js', '.jsx', '.es6', 'png', 'jpg', 'jpeg'],
        alias: {
            "react": './node_modules/react-dom/dist/react-dom'
        }
    },// 一些插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
```


其实这个配置文件就是一个普通的JavaScirpt对象，这个对象中包含了对当前项目的配置，这个对象的属性有以下几个：

### config.entry 
这个属性标识了当前打包的入口文件，它的可选值是:

 * 一个string类型的字符串，表示当前入口文件。就像例子中的 `./src/js/index.js`
 * 对象，key-value 代表当前项目有多个入口文件。每个属性的键值对标明了webpack根据这个入口打包好的chunk文件名(key)和入口文件位置(value)
 * 数组 代表当前入口文件经过多个处理，但是只有最后面的入口才会被正确的输出(注意：这里的输出指的是作为被webpack标识的入口文件)

### config.output
这个属性是一个对象，必需的属性是：

 * `key(path)`: `value(string)`代表打包好的文件在硬盘上存放的路径（可以是相对路径或绝对路径）
 * `key(filename)`: `value(string)` 代表打包好的文件的文件名(如果有多个路口的话可以根据不同的路入口生成不同的打包文件名)
 * `key(public)`: `value(string)` 对应的线上环境的文件打包路径

### config.module
这个属性是关于对webpack处理不同模块的配置，通常在这里我们通过让webpack匹配不同类型的文件来对不同文件做处理(通过各个webpack-loader)

 * `noParse`：不解析匹配到的文件。 例如：在项目的打包过程中可能会使用到许多的第三方库（比如React），这些库大多是相对时比较稳定的，没有任何依赖的文件（即里面没有require其他模块），那么在打包的时候就可以通过设置`noParse`属性来让webpack将这些模块直接打包不需要进行处理，这样会加快文件的编译速度。


### config.resolve
这个属性是webpack在解析各个模块的时候进行的一些配置

 * `extensions`: `[array]`   例如`extensions: ['','.js','.jsx']`这个配置让我们在源文件中的`require('a.js') `简写为`require('a')`，`require('b.jsx')`简写为`require('b')`
 * `alias`: `string` 模块的别名。 例如：在我们的文件中有`require('react')` 可以通过 `resolve.alias.react: './node_modules/react/dist/react.js'`  这样webpack在查询到文件加载请求的时候就会把require中的`react`替换为`./node_modules/react/dist/react.js'`
 * `root`: `string` 匹配模块的路径。  这个属性告诉webpack在`root`指定的文件夹下来查找模块


## webpack chunk
webpack对应的打包好的文件称为`chunk`，chunk中集合了一些webpack打包好的模块，chunk包含的类型有:

 * entry chunk  对应的入口文件打包出来的文件称为entry chunk
 * normal chunk
 * initila chunk 


