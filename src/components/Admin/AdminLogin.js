import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './AdminLogin.css';
import NavBar from '../NavBar';
const AdminLogin = () => {
	const [ username, setUsername ] = useState();
	const [ password, setPassword ] = useState();
	const [ toAdminLogin, setToAdminLogin ] = useState(false);
	const loginSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		if (username === 'admin' && password === '1234') {
			setToAdminLogin(true);
		}
	};
	if (toAdminLogin) {
		return (
			<Redirect
				to={{
					pathname: '/admin',
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
			<Container>
				<Row className="login-row">
					<Col>
						<div>
							<img
								className="login-image"
								style={{ width: '35rem', height: '30rem', marginTop: '10%' }}
								src={require('../../assets/clip-sign-in.png')}
								alt=""
							/>
						</div>
					</Col>
					<Col>
						<Card className="login-card">
							<Card.Header as="h5">LOGIN HERE</Card.Header>
							<Card.Header>
								<div className="login">
									<Form className="form" onSubmit={loginSubmit}>
										<Form.Group>
											<Form.Label>USER ID: </Form.Label>
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
												placeholder="4 Digit PIN"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												minLength="4"
												maxLength="4"
												required
											/>
										</Form.Group>
										<Form.Group>
											<Button
												style={{
													marginLeft: '24%',
													width: '50%',
													color: 'white',
													backgroundColor: '#0A79DF'
												}}
												type="submit"
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
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AdminLogin;
