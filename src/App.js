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
				<div className="col">
					<Container>
						<Row className="login-row">
							<Col xl={5}>
								<Card className="login-card">
									<Card.Header as="h5">LOGIN HERE</Card.Header>
									<Card.Header>
										<Login />
									</Card.Header>
								</Card>
							</Col>
							<Col xl={5}>
								<div className="login-image-signin">
									<img
										
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
