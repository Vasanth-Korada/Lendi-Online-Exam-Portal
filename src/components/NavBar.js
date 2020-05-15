import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';

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
						{/* 
						<h6>Unleash your skills and win prizes!</h6>*/}
					</Navbar.Brand>
					{this.props.buttonType === 'adminLogin' ? (
						<Link to="/adminLogin">
							<RiAdminLine color="white" title="ADMIN" size={40} />
						</Link>
					) : (
						<Link to="/logout">
							<FiLogOut color="white" title="Logout" size={40} />
						</Link>
					)}
				</Container>
			</Navbar>
		);
	}
}

export default NavBar;
