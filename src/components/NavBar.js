import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import { Redirect } from 'react-router-dom';
import './Navbar.css';
class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toAdminLogin: false
		};
	}

	render() {
		if (this.state.toAdminLogin) {
			return <Redirect to="/adminLogin" />;
		}
		return (
			<Navbar
				expand="lg"
				variant="dark"
				className="login-navbar"
				style={{
					backgroundColor: '#0A79DF',
					height: '5.5rem'
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
				{this.props.adminLogoutBtn === true && (
					<div>
						<button
							type="button"
							class="btn btn-danger btn-sm"
							onClick={() => {
								this.setState({ toAdminLogin: true });
							}}
						>
							LOGOUT
						</button>
					</div>
				)}
			</Navbar>
		);
	}
}

export default NavBar;
