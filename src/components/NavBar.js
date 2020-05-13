import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<Navbar expand="lg" variant="dark" style={{ backgroundColor: '#732BCA', height: '5.5rem' }}>
				<Container>
					<Navbar.Brand className="navbar-logo">
						<h4>{this.props.title}</h4>
					</Navbar.Brand>
					{this.props.buttonType === "adminLogin" ?<Link to="/adminLogin">
						<Button variant="light" style={{ color: 'black' }}>
							Admin Login
						</Button>
					</Link>:
					<Link to="/logout">
						<Button variant="light" style={{ color: 'black' }}>
							LOGOUT
						</Button>
					</Link>}
				</Container>
			</Navbar>
		);
	}
}

export default NavBar;
