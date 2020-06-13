import React from 'react';
import './App.css';
import Login from './components/Auth/Login';
import { Card, Container, Row, Col } from 'react-bootstrap';
import NavBar from '../src/components/NavBar';
import 'rsuite/lib/styles/index.less';
class App extends React.Component {
	render() {
		return (
			<div className="App">
				<NavBar title="Lendi Online Exam Portal" buttonType="adminLogin" />
				<div className='col'>
					<Container>
						<Row className="login-row">
							<Col xl={5}>
								<Card className="login-card">
									<Card.Header as="h5">STUDENT LOGIN</Card.Header>
									<Card.Header>
										<Login />
									</Card.Header>
								</Card>
							</Col>
							<Col xl={5}>
								<div >
									<img
										className="login-image-signin" 
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
