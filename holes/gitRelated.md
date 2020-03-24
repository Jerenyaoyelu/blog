# 坑复现

## Description

在贡献开源项目[covid-19-au.github.io](https://github.com/covid-19-au/covid-19-au.github.io)时提交 pr 后 github 提示有部分文件有 conflicts。

## 原因

查看了 conflict 的代码之后，发现造成 conflict 的原因是因为在开发的过程中有其他开发人员更改了相关的文件，使得自己开发基于的版本不是最新。

## 解决方案

得益于 source tree 的视觉效果，做了以下更改解决了这个问题。

-   将 commit reset 到开发时的 commit
-   git stash 保存所有的更改
-   更新开发版本
-   git stash pop 将所做的开发内容 pop 到现在的版本
-   重新 commit，然后 push 代码。

<br/>

# 后言

以上皆为自己实操经验，如有不喜，勿喷！欢迎指正。若博君欢心，欢迎`star`一下。

[>>Back to Home](../README.md)
