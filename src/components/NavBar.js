import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import './Navbar.css';
class NavBar extends React.Component {
	render() {
		return (
			<Navbar expand="lg" variant="dark" style={{ backgroundColor: '#0A79DF', height: '5.5rem' }}>
				<Container>
					<Navbar.Brand className="navbar-logo">
						<h3 className="navbar-title">
							<b>{this.props.title}</b>
							{/*
							{this.props.emoji ? <span role="img">😃</span> : <div />}
							
							*/}
						</h3>
					</Navbar.Brand>
					{this.props.buttonType === 'adminLogin' ? (
						<Link to="/adminLogin">
							<RiAdminLine color="white" title="ADMIN" size={40} />
						</Link>
					) : (
						<div />
					)}
				</Container>
			</Navbar>
		);
	}
}

export default NavBar;
