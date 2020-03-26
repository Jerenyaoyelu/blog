# 知识点 1: 如何实现保持登录状态？

## 需求

用户在首次手动登录之后，在重新进入页面或者刷新页面时无需在重新手动登录。

## 网上的指导实现逻辑

后端数据库存储 session（one-time token 和 userId），每次前端发送请求时携带 cookies，服务器收到请求后解析出请求携带的 cookies 中的 token，在 session 中找到相应的 user 同时会返回 http 200 OK 并携带新的 token 以及更新 session（失效日期不变）。

## 我的实现逻辑

![](./persistentLogin.png)

### 项目背景情况

当前后端实现的逻辑是除了注册和登录不需要 http 请求携带 jwt，此时后端会创建一个 jwt 并返回，其余的任何操作的请求都必须携带 custom header 和 jwt，但是后端不会更新 jwt。

### 实现如下：

1. Manually Login => create a regular session(set expiration time)
   返回 new token <=

2. Manually Logout => 所以 session 失效
3. Persistent Login => generate a new persistent session token, and update the session
   返回 new token <=
4. 手动登录请求，后端会返回一个 jwt，将 jwt 保存在浏览器 cookie 中
5. Persistent Login 请求，会携带 cookies 以及 custom header，后端服务器解析之后返回 http 200 OK。
    > 此处请求为 getUser 请求，所以后端服务器还会返回相应的用户信息
6. 手动登出之后，浏览器会清除 cookies，页面也会会到初始状态。

## 实现过程

实现过程中还是遇到挺多连环坑，[详见]()

## 实现代码

### cookies.js

```javascript
import cookie from 'react-cookies';

export const setCookie = (name, value, options = {}) => {
	cookie.save(name, value, options);
};

export const getCookie = (name, doNotParse = false) => {
	return cookie.load(name, doNotParse);
};

export const deleteCookie = (name, options = {}) => {
	cookie.remove(name, options);
};
```

### actions.js

```javascript
import jwtDecode from 'jwt-decode';

import BaseProvider from './BaseProvider';

export const getUser = (token, callback = () => {}) => {
	if (token != undefined) {
		console.log('did run');
		const decodedJWT = jwtDecode(token);
		const headerConfig = {
			headers: {
				'x-auth-token': token,
			},
		};
		const URL = '/users/' + decodedJWT._id;
		BaseProvider.get(URL, headerConfig)
			.then((res) => {
				// console.log({ res })
				callback(res.data.data);
			})
			.catch((err) => console.log({ err }));
	}
};
```

### AuthCard.js(部分代码)

```javascript
const onAuth = ([param, onAuthenticated, showSignUp]) => (event) => {
	event.preventDefault();
	const URL = showSignUp ? '/users' : '/users/login';

	const emailValidator = (email) => {
		return email.includes('@') && email.includes('.com');
	};

	if (!param.password || !param.email || (showSignUp && !param.name)) {
		alert('Information is incomplete!');
	} else if (showSignUp && param.name.length < 5) {
		alert('Username is less than 5 letters!');
	} else if (!emailValidator(param.email)) {
		alert('Email is invalid!');
	} else if (param.password.length < 10) {
		alert('Password is less than 10 letters!');
	} else {
		BaseProvider.post(URL, param)
			.then((res) => {
				const token = showSignUp ? res.data.accessToken : res.data;
				setCookie('token', token);
			})
			.then(getCookie('token') != undefined && onAuthenticated(true))
			.catch(({ response }) => alert(response.data));
	}
};
```

### Homapage.js(部分代码)

```javascript
import React from 'react';

import AuthCard from '../authenticate/AuthCard';
import SiderBar from './profile/SiderBar';
import { getCookie, deleteCookie } from '../authenticate/Cookies';
import './default.css';
import { getUser } from '../apis/actions';

class Homepage extends React.Component {
	state = {
		isAuthenticated: false,
		showProfile: false,
		showLoginCard: false,
		headerMouseOver: '',
		user: null,
	};

	setUserAndState = (data) => {
		this.setState({
			isAuthenticated: true,
			user: data,
		});
	};

	//when there is no cookies, the getUser request will not be sent,
	//see the definition
	UNSAFE_componentWillMount = () => {
		const currentCookie = getCookie('token');
		getUser(currentCookie, this.setUserAndState);
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.isAuthenticated != this.state.isAuthenticated && this.state.isAuthenticated) {
			getUser(getCookie('token'), this.setUserAndState);
		}
	};

	onAuthenticated = (state) => {
		this.setState({ isAuthenticated: state, showLoginCard: !state });
	};

	onMouseEnter = (header) => {
		this.setState({
			headerMouseOver: header,
		});
	};

	onMouseLeave = () => {
		this.setState({
			headerMouseOver: '',
		});
	};

	renderLogout = () => {
		return (
			<div className="item">
				<a
					className={this.state.headerMouseOver === 'signout' ? 'active right item' : 'right item'}
					onMouseEnter={() => this.onMouseEnter('signout')}
					onMouseLeave={this.onMouseLeave}
				>
					<span
						onClick={() => {
							this.setState({
								isAuthenticated: false,
								showProfile: false,
								showLoginCard: false,
								user: null,
							});
							deleteCookie('token');
						}}
					>
						Log out
					</span>
				</a>
			</div>
		);
	};

	renderAfterLogin = () => {
		return (
			<div className="item">
				<a
					className={this.state.headerMouseOver === 'myprofile' ? 'active right item' : ' right item'}
					onMouseEnter={() => this.onMouseEnter('myprofile')}
					onMouseLeave={this.onMouseLeave}
				>
					<span
						onClick={() => {
							this.setState({ showProfile: !this.state.showProfile });
						}}
					>
						Myprofile
					</span>
				</a>
			</div>
		);
	};

	renderBeforeLogin = () => {
		return (
			<div className="item">
				{this.state.showLoginCard || (
					<a
						className={this.state.headerMouseOver === 'signin' ? 'active item primary' : 'item primary'}
						onMouseEnter={() => this.onMouseEnter('signin')}
						onMouseLeave={this.onMouseLeave}
					>
						<span onClick={() => this.setState({ showLoginCard: true })}>Sign In</span>
					</a>
				)}
			</div>
		);
	};

	render() {
		return (
			<div className="pusher">
				<div className="ui inverted vertical masthead center aligned segment">
					<div className="ui container sticky">
						<div className="ui secondary inverted pointing menu">
							...
							{this.state.isAuthenticated ? this.renderAfterLogin() : this.renderBeforeLogin()}
							{this.state.isAuthenticated && <div>{this.renderLogout()}</div>}
						</div>
					</div>
					...
				</div>
				...
				{this.state.showLoginCard && <AuthCard onAuthenticated={this.onAuthenticated} />}
				...
			</div>
		);
	}
}

export default Homepage;
```

# 花絮 -- 实现前的思考

整个 persistent login 的过程，在前端用户的角度就只是输入了 url，那么该在哪里（哪一步？）实现（或者说修改）这个进入网页时发送的第一个 http 请求？respone 里除了新的 token 还应该要返回什么？（登录用户？登录状态？登录用户信息？）

    > > 正常用户登录，response 会返回 JWT，然后要拿到用户的信息还得重新发起 getUser（）的请求。

    > > 那么 persistent login 的时候，输入网址后的请求携带存有 JWT 的 cookies，若 200 ok，
        1. 则可以再自动发一个getUser的请求，返回用户信息
        2. 或者只返回一个新的JWT http200，然后再点击Myprofile的时候再放getUser请求
        问题：第一次发送请求时，哪里可以拿到或者怎么可以拿到response？
        在浏览器输入url然后enter之后发出的url服务器返回的应该是html对象，然后浏览器会解析渲染，所以在渲染前在发个携带cookies的http请求（可以直接getUser（）请求，成功就直接login不成功就要求用户重新登录，这样可以在componentDidMount？里面实现）过去，这样就可以拿到respone以实现persistent login。
        目前服务器设置的JWT有效期是一天，当第二天第一次打开网页渲染前，即便发送昨天的cookies的http，服务器会直接返回一个invalid token

# Reference

https://www.reddit.com/r/reactjs/comments/bc9kcd/how_to_persist_login_state_on_refresh/

https://blog.alejandrocelaya.com/2016/02/09/how-to-properly-implement-persistent-login/

https://en.wikipedia.org/wiki/Session_(computer_science)

https://stackoverflow.com/questions/46724723/how-to-store-cookies-for-the-next-session-in-reactjs-for-sign-up-functionalities

https://stackoverflow.com/questions/39826992/how-can-i-set-a-cookie-in-react

https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

https://www.youtube.com/watch?v=EYCzSI3Qi0Y

https://www.npmjs.com/package/react-cookies
