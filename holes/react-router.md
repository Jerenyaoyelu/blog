# BUG 1

## Description

背景：

各个页面的 url 中包含动态的 ID，每次跑网页的时候会不一致

问题：

任何深层级的页面只要一刷新就会导致当前页面 Not Found（`BUG 2` 有部分联系）

## 原因

在配置 React Routes 时，传入 URL parameter 的方式不对，导致 routes 配置不正常

## 代码展示

### 错误代码

```javascript
class App extends React.Component {
   state = {
    restaurantsListUpdated: false,
    restaurants: [],
  }

  ...

  renderRestaurantRoutes = () => {
    if (this.state.restaurants.length > 0) {
      return this.state.restaurants.map(({ _id, name, description }) => (
        <div key={_id}>
          <Route exact path={'/restaurants/' + _id}>
            <Resturant
              details={{
                _id: _id,
                name: name,
                description: description,
              }}
            />
          </Route>
          <Route exact path={'/restaurants/' + _id + '/waiter'}>
            <Waiter />
          </Route>
          <Route exact path={'/restaurants/' + _id + '/cook'}>
            <Kitchen />
          </Route>
          <Route exact path={'/restaurants/' + _id + '/manager'}>
            <Manager restaurantId={_id} />
          </Route>
          <Route exact path={'/restaurants/' + _id + '/cashier'}>
            <div>cashier</div>
          </Route>
          <Route exact path={'/restaurants/' + _id + '/customer'}>
            <Customer />
          </Route>
        </div>
      ))
    }
    return null
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Homepage
            recordRestaurantsListUpdatedStatus={
              this.recordRestaurantsListUpdatedStatus
            }
            restaurants={this.state.restaurants}
          />
        </Route>
        {this.renderRestaurantRoutes()}
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/"></Redirect>
      </Switch>
    )
  }
}

export default App
```

### 正确代码

```javascript
class App extends React.Component {
  ...
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          children={
            <Homepage
              recordRestaurantsListUpdatedStatus={
                this.recordRestaurantsListUpdatedStatus
              }
              restaurants={this.state.restaurants}
            />
          }
        />
        <Route
          exact
          path="/restaurants/:id"
          render={props => <Resturant {...props} />}
        />
        <Route exact path="/restaurants/:id/waiter" children={<Waiter />} />
        <Route exact path="/restaurants/:id/cook" children={<Kitchen />} />
        <Route
          exact
          path="/restaurants/:id/manager"
          render={props => <Manager {...props} />}
        />
        <Route
          exact
          path="/restaurants/:id/cashier"
          children={<div>cashier</div>}
        />
        <Route exact path="/restaurants/:id/customer" children={<Customer />} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/"></Redirect>
      </Switch>
    )
  }
}

export default App
```

## 解决方案

按照[官方文档](https://reacttraining.com/react-router/web/example/url-params)正确传参，重新配置

<br/>

# BUG 2

## Description

背景：
子组件内有一个到其他页面的点击时间，但是这个页面的 routes 是动态的，也就是 App.js 需要每次 render 之前向后端请求数据，然后 render 出所以页面的 routes，初始状态为[]

问题：
在子组件点击链接后，会新开一个页面，但是就是会 redirect 到 not-found，App.js 的数据也明明都有请求过来。（说明 routes 还是有问题）

## 原因

子组件链接点击之后其实是会到目标页面，但是因为 reload 了页面又重新将 App.js 的状态初始化了，所以导致 redirect 到 Not-found。然后会 reload 页面的原因是因为链接 element 用了`<a>` tag.

App.js 代码

```javascript
state = {
	restaurants: [],
};

componentDidUpdate = (prevProps, prevState) => {
	if (prevState.restaurants !== this.state.restaurants) {
	}
};

fetchRestaurants = (restaurants) => {
	if (restaurants !== undefined && restaurants.length > 0) this.setState({ restaurants: restaurants });
};

renderRestaurantRoutes = () => {
	if (this.state.restaurants.length > 0) {
		return this.state.restaurants.map(({ _id, name, description }) => (
			<div key={_id}>
				{console.log('did update5', _id, '/restaurants/' + _id, name)}
				<Route exact path={'/restaurants/' + _id}>
					<Resturant
						details={{
							name: name,
							description: description,
						}}
					/>
				</Route>
				<Route exact path={'/restaurants/' + _id + '/waiter'}>
					<Waiter />
				</Route>
				<Route exact path={'/restaurants/' + _id + '/cook'}>
					<Kitchen />
				</Route>
				<Route exact path={'/restaurants/' + _id + '/manager'}>
					<Manager />
				</Route>
				<Route exact path={'/restaurants/' + _id + '/cashier'}>
					<div>cashier</div>
				</Route>
				<Route exact path={'/restaurants/' + _id + '/customer'}>
					<Customer />
				</Route>
			</div>
		));
	}
	return null;
};
```

错误代码

```javascript
if (restaurants && restaurants.length > 0) {
	console.log('rrest ', restaurants);
	return restaurants.map(({ _id, name }) => (
		<span key={_id}>
			<h3>{name}</h3>
			<a href={'/restaurants/' + _id}>
				<i className="caret square right icon" />
			</a>
		</span>
	));
}
```

## 解决方案

将`<a>` tag 换成`react-route-dom`的`<Link>`就行。

小记：
这个 bug 修复花了我讲多时间是因为找到原因之后忘记了`react-route-dom`的`<Link>`，而是一味的 google 如何到新页面不用 reload，导致误导了方向。

<br/>

# 后言

以上皆为自己实操经验，如有不喜，勿喷！欢迎指正。若博君欢心，欢迎`star`一下。

[>>Back to Home](../README.md)
