import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import './Navbar.css';
class NavBar extends React.Component {
	render() {
		return (
			<Navbar
				expand="lg"
				variant="dark"
				className="login-navbar"
				style={{
					backgroundColor: '#0A79DF',
					height: '5.5rem',
					width: '100%'
				}}
			>
				<Navbar.Brand className="navbar-logo">
					<h3 className="navbar-title">
						<b>{this.props.title}</b>
						{this.props.emoji ? (
							<span role="img" aria-label="grinning face with big eye">
								😃
							</span>
						) : (
							<div />
						)}
					</h3>
				</Navbar.Brand>
				{this.props.buttonType === 'adminLogin' ? (
					<Link to="/adminLogin">
						<RiAdminLine color="white" title="ADMIN" size={40} />
					</Link>
				) : (
					<div />
				)}
			</Navbar>
		);
	}
}

export default NavBar;
