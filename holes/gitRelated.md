# 坑复现
## Description
在贡献开源项目[covid-19-au.github.io](https://github.com/covid-19-au/covid-19-au.github.io)时提交pr后github提示有部分文件有conflicts。

## 原因
查看了conflict的代码之后，发现造成conflict的原因是因为在开发的过程中有其他开发人员更改了相关的文件，使得自己开发基于的版本不是最新。

## 解决方案
得益于source tree的视觉效果，做了以下更改解决了这个问题。
- 将commit reset到开发时的commit
- git stash保存所有的更改
- 更新开发版本
- git stash pop将所做的开发内容pop到现在的版本
- 重新commit，然后push代码。

