import React from 'react';
import './App.css';
import Login from './components/Auth/Login';
import { Card, Container, Row, Col } from 'react-bootstrap';
import NavBar from '../src/components/NavBar';
class App extends React.Component {
	render() {
		return (
			<div className="App">
				<NavBar title="Talent Connect ❤" buttonType="adminLogin" />
				<div>
					<Container>
						<Row className="login-row">
							<Col>
								<Card className="login-card">
									<Card.Header as="h5">LOGIN HERE</Card.Header>
									<Card.Header>
										<Login />
									</Card.Header>
								</Card>
							</Col>
							<Col>
								<div>
									<img
										className="login-image-signin"
										style={{ width: '44rem', height: '28rem', marginTop: '1%' }}
										src={require('../src/assets/mockup_1.png')}
										alt=""
									/>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

export default App;
