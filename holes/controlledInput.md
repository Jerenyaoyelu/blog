# controlled input 相关

## Description

明明按照 controlled input 的写法，但是跑了之后还是报错 uncontrolled input error

## 原因

是如下代码所示，state 初始化时候因为设置成了{}, 使得渲染时候 controlled input 自动变成了 uncontrolled input

#### 错误代码

```javascript
state = {
	currentParam: {},
};
```

#### 正确代码

```javascript
state = {
	currentParam: null,
};
```

## 解决方案

如上图正确代码所示

<br/>

# 后言

以上皆为自己实操经验，如有不喜，勿喷！欢迎指正。若博君欢心，欢迎`star`一下。

[>>Back to Home](../README.md)
