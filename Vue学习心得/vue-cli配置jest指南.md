# Vue-Cli项目配置jest + cypress指南
> Author：Jeren -  极客one前端研发工程师

>Date：2020.7.24

>Keywords：vue, vue-test-utils, jest, cypress

## 一、前言
前段时间因项目需求，开始接触了Vue的前端单元测试和e2e测试。根据所用库的不同，单元测试和e2e测试都分别主要分为两个派系：单元测试 -- jest派系和mocha派系；e2e测试 -- cypress派系和nightwatch。

我后来选择了jest和cypress，cypress不需要配置什么，故本文介绍jest的一些比较重要的配置以便能够顺利在vue项目上跑起来。

## 二、jest配置需要什么库？

在开始介绍配置jest需要用什么库之前，说明下目前在vue项目上配置jest主要可以用两个库：
1. @vue/test-utils + jest + vue-jest
2. @vue/test-utils + @vue/unit-jest

这两种没什么本质区别。@vue/unit-jest只是vue的一个插件，依赖了jest和vue-jest，你可以理解为vue再给你封装了一层。
这里因为项目一开始就安装了@vue/unit-jest插件，所以就自然选择第二种方式。

## 三、需要为jest配置什么？

jest只是提供了一个单元测试的工具，所以很多你在webpack里面习惯的功能，它并不支持，比方说路径别名。且它不是为了vue而生的，所以自然也不认识vue后缀的文件名，以及也有可能不认识一些第三方库如你自己开发的库。

**打开jest.config.js文件：**

1. 配置别名正则匹配：
```
moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/src/$1", //根据自己需求更改
  "^@config/(.*)$": "<rootDir>/config/$1" //根据自己需求更改
},
  ```
2. 使用import/export、ts以及识别.vue

```
transformIgnorePatterns: ['/node_modules/(?!name-of-lib-o-transform)']
```
`transformIgnorePatterns`默认值是`[/node_modules/]`，表示忽略所有的文件，都按照`js`来处理。其后面的`?!` 表示忽略除外，忽略除外的非`js`文件会经过`webpack`的`loader`处理。因为`jest`是在`node`的环境下跑的，而`nodeJs`的`require`只能处理`js`，所以其他的文件如`ts、css、less`等都需要`webpack`内的`loader`来转译。

另外，这里如果有一些第三方的库需要webpack的loader来处理的，也可以在这个参数里设置。举个栗子：
```
transformIgnorePatterns: ['/node_modules/(?!lib-to-transform|jiker-icon|nprogress)']
```
3. 如果有需要忽略某些模块的，亦可配置在如下参数：

```
modulePathIgnorePatterns: ["<rootDir>/npm-components/", "<rootDir>/src/components/jiker-icon/"], //根据自己需求修改
```
4. 其他一些有用的设置：
```
verbose: true //这个设置可以输出所有console信息
```
> 注：以上配置都是基于vue-cli的unit-jest插件，如果使用jest+vue-jest，可能需要更多的配置项，具体可参考官方文档。

## 四、问题
1. cypress测试，网关超时问题：cypress会单独建一个生产环境，所以注意检查.env文件的BASE_URL的环境变量。

2. jest不认识webpack的require.context方法，怎么办？写一个覆盖掉。这里给个栗子：
```vue
const fs = require('fs');
const path = require('path');
const enviroments = ['en', 'zh', 'fr'];
// console.log(__filename);
if (typeof require.context === 'undefined') {
  require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
    const files = {};
    function readDirectory(directory) {
      fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.resolve(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath);
          return;
        }
        if (!regularExpression.test(fullPath)) return;
        files[fullPath] = true;
      });
    }
    if (base.startsWith('@config')) readDirectory(path.resolve(base.replace('@','')));
    if (base.startsWith('@/')) readDirectory(path.resolve(base.replace('@','src')));
    if (base.startsWith('./')) readDirectory(path.resolve(__dirname, base));
    function Module(file) {
    // eslint-disable-next-line global-require
      return require(file);// eslint-disable-line import/no-dynamic-require
    }
    Module.keys = () => Object.keys(files);
    return Module;
  };
}
```
## 五、结语

完全没接触过这部分知识的小白是很容易在一开始迷失的，搞不清楚相互区别到底是啥。我也是现在回过来看才感觉稍微思路清晰了一些。
下期给大家带来jest的mock功能，以axios为例。
