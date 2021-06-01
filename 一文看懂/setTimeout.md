# 一文读懂之你真的懂setTimeout?

在开始之前，请灵魂拷问一下：
```text
setTimeout设置1000ms延时，则真的会在1000ms之后准时执行吗？
```

这是字节初面的一个面试题，如果对setTimeout没有真正的很了解的话，可能这个时候就会慌了。在揭晓答案之前，我们先重新来认识一下这个朋友。

<br/>

## 什么是setTimeout

是`WindowOrWorkerGlobalScope` mixin的一个方法，用于设置一个定时器, 常用语法如下：

```javascript
var timeoutId = setTimeout(function, delay, arg1, arg2, ...)
```
- `function` 是时间到之后执行的函数
- `delay` 是延迟的时间，单位是`ms`，默认为0（表示尽快执行）
- `arg1, arg2, ..., argN` 是可选附加参数，会作为参数传递给`function`
- `timeourId` 是返回值，是一个正整数，表示定时器编号，可以传递给`clearTimeout()`来取消这个定时器
> 注：在同一个对象上（window或者worker），`setTimeout`和`setInterval`共用一个编号池

<br/>

## `function`中的`this`到底指向谁

在理解这个问题之前，需要先了解一下`Javascript`的运行机制。

了解`Javascript`的小伙伴都知道，JS的核心特征是单线程 -- 一个时间只能做一件事情。这意味着所有要执行的任务都需要排队，毕竟工人只有一个。这样如果前一个任务非常的耗时（比方说请求大量数据），后面的任务就不得不一直排队等着，这就形成了阻塞，这个时候CPU往往都是闲着的，非常的浪费。JS设计者也意识到了这个问题，于是引入了异步的概念，将所有的任务就分为了同步任务和异步任务。同步任务必须按顺序一个个执行，而像请求数据这样非常耗时的任务则成为异步任务，可以被挂起来，让线程可以先执行后面的任务。

这些被挂起的异步任务当然是不能继续放在主线程的执行栈中，而是被放在了一个叫`task queue`的任务队列里。那什么时候会执行这些异步的任务呢？大致过程是这样的：
```text
1. 所有的同步任务都被放在主线程执行栈中执行
2. 遇到异步任务，只要有了运行结果，就会相应的在任务队列中加入一个事件
3. 等主线程执行栈中所有的同步任务执行完毕，主线程就会读取任务队列中的事件到执行栈中，开始执行
4. 主线程周而复始的重复以上步骤
```
以上机制又被成为`EventLoop`, 如果要更深层次的去理解，还需要理解宏任务和微任务，这里就暂时不做展开。

这个`task queue`除了用来放置被挂起的异步任务，还可以用来放置定时器`setTimeout`和`setInterval`（这里`setTimeout`其实就是一个宏任务）。
> 宏任务包含：`setTimeout`,`setInterval`,`setImmediate`, `script`, `I/O`, `UI渲染`

> 微任务包含：`promise`, `async/await`, `process.nextTick`, `MutationOberver`

这个时候我们应该就可以理解调用`setTimeout`的`function`函数的代码其实是运行在与`setTimeout`所在函数不同的执行环境上，这样`function`里的`this`跟我们所期望的指向可能就会是不同（默认指向`window`）。

看下面的例子帮助下我们理解：
```javascript
function a() {
  setTimeout(function() {
    console.log(this)
  })
}

const f = {}

f.a = a;

a(); // 打印出window
f.a(); // 打印出window
```

根据普通函数中`this`指向的知识（指向最后调用它的对象），你可能会觉得`f.a()`应该指向`f`对象，但却指向了`window`。这就是上面我们所说的原因。

那么怎么做可以让它指向`f`呢？方法有很多。比如：
```javascript
// 使用箭头函数
function a() {
  setTimeout(() => {
    console.log(this)
  })
}

// 使用bind方法
function c() {
  setTimeout(function() {
    console.log(this)
  }.bind())
}

const f = {}

f.a = a;
f.c = c;

a(); // 打印出window
f.a(); // 打印出f

c(); // 打印出window
f.c(); // 打印出f
```

<br/>

## 关于`delay`参数
本文一开始问了一个关于`delay`的问题，答案是否定的。主要讲下以下两种原因：

### 最小延时
事实上，调用`setTimeout`会有一个最小延迟时间（大约4ms），也就是说即便`delay`为0，回调函数也不会立刻马上执行。

规范中解释到这一般是由于函数嵌套（达到一定层级深度），或者是`setInterval`的回调阻塞所致。
```javascript
setTimeout(function() {
    setTimeout(function() {
        setTimeout(function() {
            setTimeout(function() {
                setTimeout(function() {
                    setTimeout(function() {
                        console.log('done');
                    }, 0);
                }, 0);
            }, 0);
        }, 0);
    }, 0);
}, 0);
```
像这样延迟都是0，但是却嵌套了N层的代码，最小延迟会至少是4ms，当然不同浏览器中，这个`一定的嵌套层级深度`并不完全一样，比如在`Chrome`和`Firefox`是第五次，`Safari`是第六次，而`Edge`是第三次。

### 超时延迟
出现超时延迟的主要原因是JS执行的运行机制所导致的。
1. 主线程执行完执行栈中的同步任务才会执行`task queue`里异步任务，`setTimeout`是异步任务
```javascript
function a() {
  console.log('1');
}
setTimeout(a, 0);
console.log('2');

// 打印结果为2，1
// 并不是在执行setTimeout的时候马上打印出1
```
2. 执行任务队列中的异步任务时，也会优先执行微任务，而`setTimeout`是宏任务
```javascript
function a() {
  console.log('1');
}

setTimeout(a, 0);
new Promise((resolve, reject) => {
  console.log('2');
  resolve();
}).then(() => {
  console.log('3');
})
console.log('4');

// 打印结果为：2,4,3,1
// 并不是在执行setTimeout的时候马上打印出1
```
