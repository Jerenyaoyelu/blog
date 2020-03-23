# 坑复现

# setState 相关

## Description

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

# Ajax 请求相关

## Description

-   掉坑体验 1:

    -   axios 发送请求时，报错 cors preflight

-   掉坑体验 2:

    -   axios 发送请求时，一直显示 400 Bad request

-   掉坑体验 3:
    -   axios 发送请求时，catch log 出来的 error 不是 object 形式显示

## 原因

-   掉坑体验 1:

    -   cors 类别的错误都是由于违背同源策略
    -   产生 prefile 的原因：[详见这个帖子](https://stackoverflow.com/questions/29954037/why-is-an-options-request-sent-and-can-i-disable-it)

-   掉坑体验 2:

    -   发送请求 400 Bad request, 有很多原因，但一般是前端发送的请求违反了某些规定，比方说语法错误，数据格式问题等
    -   这次错误的原因是因为给 form 的 onSubmit 传的第二个参数是个 array，然后用 es6 语法解析 array 的时候把数据的参数和其他参数顺序对掉了，导致发送请求的数据包格式错误，返回 400，正好又因为同时有【掉坑体验 3】，所以但是 debug 起来就有点难受。

-   掉坑体验 3:
    -   这个原因很蠢，是因为前端打印的时候没有 log({error})这样

## 解决方案

-   掉坑体验 1:

    后端配置 cors,[详见官方文档](https://www.npmjs.com/package/cors)

-   掉坑体验 2:

    把顺序调回去。

*   掉坑体验 3:
    -   这个原因很蠢，是因为前端打印的时候没有 log({error})这样
