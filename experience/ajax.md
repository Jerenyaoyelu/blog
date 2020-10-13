# BUG 1

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
    -   这次错误的原因是因为给 form 的 onSubmit 传的第二个参数是个 array，然后用 es6 语法解析 array 的时候把数据的参数和其他参数顺序对掉了，导致发送请求的数据包格式错误，返回 400，正好又因为同时有【掉坑体验 3】，所以当时 debug 起来就有点难受。

-   掉坑体验 3:
    -   这个原因很蠢，是因为前端打印的时候没有 log({error})这样

## 解决方案

-   掉坑体验 1:

    后端配置 cors,[详见官方文档](https://www.npmjs.com/package/cors)

-   掉坑体验 2:

    把顺序调回去。

*   掉坑体验 3:
    -   这个原因很蠢，是因为前端打印的时候没有 log({error})这样

<br/>

# 后言

以上皆为自己实操经验，如有不喜，勿喷！欢迎指正。若博君欢心，欢迎`star`一下。

[>>Back to Home](../README.md)
