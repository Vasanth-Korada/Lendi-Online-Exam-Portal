import React, { Component } from 'react';
import firebase from '../../firebase';
import { Redirect } from 'react-router-dom';
import './Login.css';
import HashLoader from 'react-spinners/HashLoader';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toDashboard: false,
			loading: false,
			dbpassword: '',
			username: '', //TypedId
			password: '', //Typed Password
			branch: 'CSE',
			userObj: {}
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
		const ref = await firebase.firestore().collection(this.state.branch).doc(this.state.username.toUpperCase());
		await ref
			.get()
			.then((doc) => {
				const data = doc.data();
				const userData = data;
				this.setState({ dbpassword: data.password, userObj: userData });
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
			this.setState({
				loading: false
			});
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
							username: this.state.username,
							userObj: this.state.userObj
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
			<form onSubmit={this.loginSubmit}>
				<div className="form-group">
					<div className="row branch-dropdown">
						<div>Choose Branch:</div>
						<div className="dropdown">
							<select
								className="btn btn-primary btn-sm dropdown-toggle"
								value={this.state.branch}
								onChange={(e) =>
									this.setState({
										branch: e.target.value
									})}
								required
							>
								<option value="CSE">CSE</option>
								<option value="ECE">ECE</option>
								<option value="EEE">EEE</option>
								<option value="MECH">MECH</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Roll Number:</label>
					<input
						type="text"
						className="form-control regd-field"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="EG: 17KD1A0572"
						style={{ textTransform: 'uppercase' }}
						value={this.state.username}
						onChange={this.usernameChange}
						minLength="10"
						maxLength="10"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">PIN:</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						placeholder="4 Digit PIN"
						value={this.state.password}
						onChange={this.passwordChange}
						minLength="4"
						maxLength="4	"
						required
					/>
				</div>
				<button type="submit" className="btn btn-block btn-primary">
					LOGIN
				</button>
			</form>
		);
	}
}

export default Login;
