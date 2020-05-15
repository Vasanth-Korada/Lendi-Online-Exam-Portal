import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import { Redirect } from 'react-router-dom';
import './Login.css';
import HashLoader from 'react-spinners/HashLoader';
import { UserContext } from '../../context/userContext';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toDashboard: false,
			loading: false,
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
		this.setState({
			loading: true
		});
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
			this.setState({ toDashboard: true });
		} else {
			console.log('LOGIN FAILED');
			alert('Invalid Username or Password');
		}
	};
	componentWillUnmount() {
		this.setState({
			loading: false
		});
	}

	render() {
		if (this.state.toDashboard) {
			return (
				<Redirect
					to={{
						pathname: '/dashboard',
						state: {
							username: this.state.username
						}
					}}
				/>
			);
		}
		if (this.state.loading) {
			return (
				<div style={{ marginLeft: '40%' }}>
					<HashLoader size={50} color="#0A79DF" />
				</div>
			);
		}
		return (
			<UserContext.Provider value={{ state: this.state }}>
				<div className="Login">
					<br />
					<Form className="form" onSubmit={this.loginSubmit}>
						<Form.Group>
							<Form.Label>USER ID: </Form.Label>
							<Form.Control
								type="text"
								placeholder="EG: 17KD1A0572"
								value={this.state.username}
								onChange={this.usernameChange}
								minLength="10"
								maxLength="10"
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password: </Form.Label>
							<Form.Control
								type="password"
								placeholder="4 Digit PIN"
								value={this.state.password}
								onChange={this.passwordChange}
								minLength="4"
								maxLength="4"
								required
							/>
						</Form.Group>
						<Form.Group>
							<Button
								style={{ marginLeft: '24%', width: '50%', color: 'white', backgroundColor: '#0A79DF' }}
								type="submit"
								variant="outline"
								size="lg"
							>
								LOGIN
							</Button>
						</Form.Group>
					</Form>
					<br />
				</div>
			</UserContext.Provider>
		);
	}
}

export default Login;
