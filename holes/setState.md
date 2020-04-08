# setState 相关

## Description 1

arraw function 里的 setState 不能更新 state 或者更新有问题

## 原因

-   掉坑体验 1:

    -   是因为状态默认设置是 string 类型 1，然后赋值的时候是数字类型的 1，然后用`===`比较得出 false 的结果，导致 component 显示出现问题

-   掉坑体验 2:
    -   是因为在一个 div 里有 onClick 设置 state 为真，然后在其子自定义组件里 onClick 设置为假，然后最后结果看起来就是子组件明明将值返回到回调函数，但是就是不能更新 state 变为 false。分析下来发现，点击子组件里的 div 时也会同时出发了父组件里的 onClick 事件。

## 解决方案

-   掉坑体验 1:
    -   将所有的值都用同一类型
-   掉坑体验 2:
    -   父组件下面在多加一个 div 或者 span 的 tag，然后就 onClick 移到那里去，不放在父组件的 div

<br/>

## Description 2

setState 更新 state 中的 object 类型变量，部分已经 state 中声明的 object 里面的 key 在之后的调用中变成 undefined

报错展示：
![]('./statics/setStateErr1.png')

## 原因

steState 更新 object 类型的方式错误

示例代码

```javascropt
state = {
    profile: {
      user: null,
      restaurants: [],
    },
  }
```

错误更新

```javascript
this.setState((prevState) => ({
	profile: {
		user: newUserData,
	},
}));
```

正确更新

```javascript
this.setState((prevState) => ({
	profile: {
		...prevState.profile,
		user: newUserData,
	},
}));
```

## 解决方案

如原因分析中正确更新代码块

<br/>

# 后言

以上皆为自己实操经验，如有不喜，勿喷！欢迎指正。若博君欢心，欢迎`star`一下。

[>>Back to Home](../README.md)
