import React, {
	Component
} from 'react';

import './login.css';
import ajax from '../ajax.js';

class Login extends Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.state = {
			username: '',
			password: ''
		}
	}
	inputChange(e) {
		if (e.target.name === 'username') {
			this.setState({
				username: e.target.value
			})
		} else {
			let p = encodeURI(e.target.value)
			this.setState({
				password: p
			})
		}
	}
	login() {
		let data = this.state;
		ajax({
			url: 'https://wx.idsbllp.cn/bigscreen/admin/login',
			method: 'POST',
			data: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: (data) => {
				console.log('data', JSON.parse(data.response));
				let resData = JSON.parse(data.response);
				if (resData.status === 200) {
					localStorage.setItem('jwt', resData.data.jwt);
					alert('登录成功');
					window.location = './#/backStage';
				} else {
					alert('登录失败');
				}
			},
			error: (err) => {
				console.log(err);
				alert('Error: 登录失败');
			}
		})
	}
	render() {
		return (
			<div className="loginWrapper">
            	<input type="text" name='username' value={this.state.username} onChange={this.inputChange} />
            	<input type="password" name='password' value={this.state.password} onChange={this.inputChange} />
            	<button onClick={this.login} >Sign In</button>
            </div>
		)
	}

}

export default Login;