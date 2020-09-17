import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import './AdminLogin.css';
import NavBar from '../NavBar';
const AdminLogin = () => {
	const [ username, setUsername ] = useState();
	const [ password, setPassword ] = useState();
	const [ toAdminLogin, setToAdminLogin ] = useState(false);
	const loginSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		if (username === 'admin' && password === 'lendi@cse') {
			setToAdminLogin(true);
		}
	};
	if (toAdminLogin) {
		return (
			<Redirect
				to={{
					pathname: '/adminDashboard',
					state: {
						name: username
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
									<Form.Label>Username: </Form.Label>
									<Form.Control
										type="text"
										placeholder="EG: LT12345"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password: </Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Button type="submit" className="btn-block admin-login-btn" variant="outline" size="lg">
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
