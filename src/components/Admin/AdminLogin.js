import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import './AdminLogin.css';
import firebase from '../../firebase';
import NavBar from '../NavBar';
const AdminLogin = () => {
	const [ username, setUsername ] = useState();
	const [ password, setPassword ] = useState();
	const [ toAdminLogin, setToAdminLogin ] = useState(false);
	const [ loginBranch, setloginBranch ] = useState('superAdmin');
	const loginSubmit = async (e) => {
		e.preventDefault();
		console.log(username, password);
		var ref = await firebase.firestore().collection('adminLogin').doc('loginData');
		ref.get().then((doc) => {
			const data = doc.data();
			console.log(loginBranch);
			console.log(username);
			const db_pwd = data[loginBranch][username];
			if (db_pwd === undefined || db_pwd === null) {
				window.alert('Invalid Username or password');
			} else if (db_pwd === password) {
				setToAdminLogin(true);
			}
		});
	};
	if (toAdminLogin) {
		return (
			<Redirect
				to={{
					pathname: '/adminDashboard',
					state: {
						username: username,
						branch: loginBranch
					}
				}}
			/>
		);
	}
	return (
		<div>
			<NavBar title="Admin Login" />
			<div className="flex-admin-login">
				<div>
					<img className="login-image" src={require('../../assets/clip-sign-in.png')} alt="" />
				</div>
				<Card className="login-card">
					<Card.Header as="h5">LOGIN HERE</Card.Header>
					<Card.Header>
						<div>
							<Form className="form" onSubmit={loginSubmit}>
								<Form.Group>
									<div className="row branch-dropdown">
										<div>Choose Branch:</div>
										<div className="dropdown">
											<select
												className="btn btn-primary btn-sm dropdown-toggle"
												value={loginBranch}
												onChange={(e) => {
													setloginBranch(e.target.value);
												}}
												required
											>
												<option value="superAdmin">SUPER ADMIN</option>
												<option value="cse">CSE ADMIN</option>
												<option value="ece">ECE ADMIN</option>
												<option value="eee">EEE ADMIN</option>
												<option value="mech">MECH ADMIN</option>
											</select>
										</div>
									</div>
								</Form.Group>
								<Form.Group>
									<Form.Label>Username: </Form.Label>
									<Form.Control
										type="text"
										placeholder="EG: LT12345"
										name="admin_username"
										id="admin_username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password: </Form.Label>
									<Form.Control
										type="password"
										name="admin_password"
										id="admin_password"
										placeholder="Enter Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Button
										type="submit"
										className="btn-block admin-login-btn"
										variant="outline"
										size="lg"
									>
										LOGIN
									</Button>
								</Form.Group>
							</Form>
						</div>
					</Card.Header>
				</Card>
			</div>
		</div>
	);
};

export default AdminLogin;
