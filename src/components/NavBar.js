import React from 'react';
import { Navbar, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import LendiLogo from '../assets/lendi_logo_p.png'
import "./Navbar.css"
class NavBar extends React.Component {
	render() {
		return (
			<Navbar expand="lg" variant="dark" style={{ backgroundColor: '#0A79DF', height: '5.5rem' }}>
				<Container>
					<Navbar.Brand className="navbar-logo">
					<img src={LendiLogo} className="lendi-logo" alt="Lendi Logo"/>
						<h2 className="navbar-title">
							<b>{this.props.title}</b>
						</h2>
					</Navbar.Brand>

					{this.props.buttonType === 'adminLogin' ? (
						<Link to="/adminLogin">
							<RiAdminLine color="white" title="ADMIN" size={40} />
						</Link>
					) : (
						<div></div>
					)}
				</Container>
			</Navbar>
		);
	}
}

export default NavBar;
