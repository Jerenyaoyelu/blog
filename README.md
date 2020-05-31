# 立志成为一个优秀的前端代码生产商

这里是 Jeren 叔叔的博客，汇聚一些在工作学习中遇到的坑以及心得。

<br/>

# 不错的开源学习社区推荐

-   [极客学院](https://wiki.jikexueyuan.com/)

    -   提供非常全面的学习资源，不仅仅限于前端

-   [freeCodeCamp](https://www.freecodecamp.org/learn/)

    -   提供非常全面的前端学习资源，一步一步带教

-   [前端面试查漏补缺](https://juejin.im/post/5c6bab91f265da2dd94c9f9e)
    -   掘金上的大佬整理的挺详细的关于面试的前端知识点，查漏补缺

<br/>

# 其他博客没有的

### **_Note_**

开发趣味横生，在欢乐的生产代码的过程中也要注意养成良好习惯哦！

-   _前端开发提交 Pull Request，记得附上一张 UI 效果展示的 GIF/Screenshot._
-   _Pull Request 提交记得在开头备注[feat，fix，refactor]._

    > _`feat`: 增加新的 feature_

    > _`fix`: 修复 code_

    > _`refactor`: 重构 code_

<br/>

### 开源项目 push 代码的 workflow

[看这里](./specials/workflow1.md)

<br/>

### 公司项目 push 代码的 workflow

[看这里](./specials/workflow2.md)

<br/>

# 前端进阶

## 缓存相关

-   如何实现保持登录状态？[>>详情](./knowledge/advanceFrontend.md)

<br/>

## HTML/CSS 入门笔记

> 此部分为根据 w3school 的 HTML 教程整理的笔记

> 适用于对 0 基础人员

-   [基础 1: 简介、基本标签](./打地基/HTML/基础1.md)

## 浅谈 JS 学习笔记

-   [第一章: 面向对象技术的模拟](./浅谈JS笔记/第一章.md)
-   [第三章: 面向对象编程 1](./浅谈JS笔记/第三章.md)
-   [第四章: 数据类型检测](./浅谈JS笔记/第四章.md)
-   [第五章: 嵌套函数及闭包](./浅谈JS笔记/第五章.md)
-   [第六章: 编码规范的建议](./浅谈JS笔记/第六章.md)
-   [第七章: 面向对象编程 2](./浅谈JS笔记/第七章.md)
-   [原型链](./浅谈JS笔记/原型链.md)

## 浅谈 Less 学习笔记

-   [语言特性 1：变量、Mixins 详解](./浅谈less笔记/语言特性1.md)

-   [语言特性 2：嵌套规则、Operations、Function、Namespaces and Accessors、作用域、Comments、Importing](./浅谈less笔记/语言特性2.md)

## 浅谈 TS 学习笔记

> 此为阅读学习https://ts.xcatliu.com/ 的笔记心得

-   [开篇:简介](./浅谈TS笔记/开篇.md)

-   [基础 1: 原始数据类型、任意值、类型推论](./浅谈TS笔记/基础1.md)

-   [基础 2: 联合类型、接口](./浅谈TS笔记/基础2.md)

-   [基础 3: 数组的类型、函数的类型](./浅谈TS笔记/基础3.md)

-   [基础 4: 类型断言、声明文件、内置对象](./浅谈TS笔记/基础4.md)

-   [进阶 1: 类型别名、字符串字面量类型、元组、枚举](./浅谈TS笔记/进阶1.md)

-   [进阶 2: 类、类与接口、泛型、声明合并](./浅谈TS笔记/进阶2.md)

# 坑

## Git 相关

-   提交 pr 后 github 提示部分文件有 conflicts [>>详情](./holes/gitRelated.md)

-   git pull 远端的 master 之后，一直显示有一个 local 文件被改动，但是不管怎样 discard 又会有另外一个极为相近的文件显示刚刚 discard 掉的内容为新的改动，git pull 就说要先 stash local changes，但是 git stash 之后还是有这些 changes [>>详情](./holes/gitRelated.md)

## 前端相关

-   arraw function 里的 setState 不能更新 state 或者更新有问题 [>>详情](./holes/setState.md)

-   setState 更新 state 中的 object 类型变量，部分已经 state 中声明的 object 里面的 key 在之后的调用中变成 undefined [>>详情](./holes/setState.md)

-   在 onClick 中传入一个函数，此函数内有 setState，并且需要给这个函数传入一个参数[>>详情](./holes/frontend.md)

-   在实现保持登录状态时出现手动登录后点击 Myprofile 报错`_id of null`以及之后一系列报错 [>>详情](./holes/frontend.md# 'Persistent Login 相关')

-   在子组件点击链接后，会新开一个页面，但是就是会 redirect 到 not-found，App.js 的数据也明明都有请求过来。（说明 routes 还是有问题）[>>详情](./holes/react-router.md)

-   modal 渲染的内容需要根据 props 的数据的不同而变化，但无论是在 render（）方法里用 setState 还是单独写一个函数都会报错`Maximum update` [>>详情](./holes/lifecycleMethod.md)

-   任何深层级的页面只要一刷新就会导致当前页面 Not Found [>>详情](./holes/react-router.md)

-   明明按照 controlled input 的写法，但是跑了之后还是报错 uncontrolled input error [>>详情](./holes/controlledInput.md)

-   点击编辑然后关闭 modal 后，再点击创建时，上次点击编辑传入的数据还保留在 modal 上 [>>详情](./holes/frontend.md)

## Ajax 请求相关

-   axios 发送请求时，报错 cors preflight/一直显示 400 Bad request/catch log 出来的 error 不是 object 形式显示 [>>详情](./holes/ajax.md)

## DevOps 相关

<br/>

# 后言

以上皆为自己实操经验，如有不喜，勿喷！欢迎指正。若博君欢心，欢迎`star`一下。
