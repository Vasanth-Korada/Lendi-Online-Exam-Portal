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
						<h2>
							<b>{this.props.title}</b>
						</h2>
						<h6>Unleash your skills and win prizes!</h6>
					</Navbar.Brand>
					{this.props.buttonType === 'adminLogin' ? (
						// <div>
						// </div>
						<Link to="/adminLogin">
							<Button variant="light" style={{ color: 'black' }}>
								Admin Login
							</Button>
						</Link>
					) : (
						<Link to="/logout">
							<Button variant="light" style={{ color: 'black' }}>
								LOGOUT
							</Button>
						</Link>
					)}
				</Container>
			</Navbar>
		);
	}
}

export default NavBar;
