# react-router 相关

## Description

背景：

各个页面的url中包含动态的ID，每次跑网页的时候会不一致

问题：

任何深层级的页面只要一刷新就会导致当前页面Not Found

## 原因

在配置React Routes时，传入URL parameter的方式不对，导致routes配置不正常

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