import React from 'react';
import './App.css';
import Login from './components/Auth/Login';
import { Navbar, Card, Container } from 'react-bootstrap';


class App extends React.Component {
		render() {
		return (
			<div className="App">
			<Navbar expand="lg" variant="dark" bg="success">
				<Container>
					<Navbar.Brand href="#" className="navbar-logo">
						Lendi Online Exam Portal
					</Navbar.Brand>
				</Container>
			</Navbar>
			<div className="login">
				<Card>
				<Card.Header as="h5">LOGIN HERE</Card.Header>
					<Card.Header>
						<Login />
					</Card.Header>
				</Card>
			</div>
		</div>
			
		)
	}
}


export default App;
