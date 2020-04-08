# 立志成为一个优秀的前端代码生产商

这里是 Golyy 的博客，汇聚一些在工作学习中遇到的坑以及心得。

<br/>

# 不错的开源学习社区推荐

- [极客学院](https://wiki.jikexueyuan.com/)

	- 提供非常全面的学习资源，不仅仅限于前端


- [freeCodeCamp](https://www.freecodecamp.org/learn/)

	- 提供非常全面的前端学习资源，一步一步带教


- [前端面试查漏补缺](https://juejin.im/post/5c6bab91f265da2dd94c9f9e)

	- 掘金上的大佬整理的挺详细的关于面试的前端知识点，查漏补缺

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

# 坑

## Git 相关

-   提交 pr 后 github 提示部分文件有 conflicts [>>详情](./holes/gitRelated.md)

## 前端相关

-   arraw function 里的 setState 不能更新 state 或者更新有问题 [>>详情](./holes/frontend.md# 'setState 相关')

-   在 onClick 中传入一个函数，此函数内有 setState，并且需要给这个函数传入一个参数[>>详情](./holes/frontend.md# 'onClick 相关')

-   在实现保持登录状态时出现手动登录后点击 Myprofile 报错`_id of null`以及之后一系列报错 [>>详情](./holes/frontend.md# 'Persistent Login 相关')

-   在子组件点击链接后，会新开一个页面，但是就是会 redirect 到 not-found，App.js 的数据也明明都有请求过来。（说明 routes 还是有问题）[>>详情](./holes/frontend.md## 'Description 3')

-   modal 渲染的内容需要根据 props 的数据的不同而变化，但无论是在 render（）方法里用 setState 还是单独写一个函数都会报错`Maximum update` [>>详情](./holes/frontend.md# 'lifeCycle Method 相关')

- 任何深层级的页面只要一刷新就会导致当前页面Not Found [>>详情](./holes/react-router.md)

## DevOps 相关

<br/>

# 后言

以上皆为自己实操经验，如有不喜，勿喷！欢迎指正。若博君欢心，欢迎`star`一下。
