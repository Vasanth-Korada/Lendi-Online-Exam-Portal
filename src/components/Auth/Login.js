import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import { browserHistory } from '@version/react-router-v3';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dbpassword: '',
			username: '', //TypedId
			password: '' //Typed Password
		};
		this.usernameChange = this.usernameChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
		this.loginSubmit = this.loginSubmit.bind(this);
	}
	usernameChange(e) {
		this.setState({ username: e.target.value });
	}
	passwordChange(e) {
		this.setState({ password: e.target.value });
	}
	loginSubmit = async (e) => {
		e.preventDefault();
		const ref = await firebase.firestore().collection('loginData').doc(this.state.username);
		await ref
			.get()
			.then((doc) => {
				const data = doc.data();
				this.setState({ dbpassword: data.password });
			})
			.catch((err) => {
				console.log('Invalid Username');
			});
		if (this.state.password === this.state.dbpassword) {
			console.log('LOGIN SUCCESS');

			browserHistory.push({ pathname: '/notfound', username: this.state.username });
		} else {
			console.log('LOGIN FAILED');
			alert('Invalid Username or Password');
		}
	};

	render() {
		return (
			<div className="Login">
				<br />
				<Form className="form" onSubmit={this.loginSubmit}>
					<Form.Group>
						<Form.Label>Registration No: </Form.Label>
						<Form.Control
							type="text"
							placeholder="EG: 17KD1A0572"
							value={this.state.username}
							onChange={this.usernameChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password: </Form.Label>
						<Form.Control
							type="password"
							placeholder="4 Digit PIN"
							value={this.state.password}
							onChange={this.passwordChange}
						/>
					</Form.Group>
					<Form.Group>
						<Button type="submit">LOGIN</Button>
					</Form.Group>
				</Form>
				<br />
			</div>
		);
	}
}

export default Login;
