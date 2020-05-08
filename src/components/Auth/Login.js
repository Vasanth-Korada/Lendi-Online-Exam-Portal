import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import firebase from '../../firebase';
import { withRouter } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

			this.props.history.push({ pathname: '/dashboard', username: this.state.username });
		} else {
			console.log('LOGIN FAILED');
			alert('Invalid Username or Password');
		}
		this.setState({
			loading: false
		});
	};

	render() {
		if (this.state.loading) {
			return (
				<div style={{ textAlign: 'center' }}>
					<Spinner animation="grow" role="status" variant="success">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			);
		}
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
							maxLength="10"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password: </Form.Label>
						<Form.Control
							type="password"
							placeholder="4 Digit PIN"
							value={this.state.password}
							onChange={this.passwordChange}
							maxLength="4"
						/>
					</Form.Group>
					<Form.Group>
						<Button
							style={{ marginLeft: '24%', width: '50%' }}
							type="submit"
							variant="outline-success"
							size="lg"
						>
							LOGIN
						</Button>
					</Form.Group>
				</Form>
				<br />
			</div>
		);
	}
}

export default withRouter(Login);
