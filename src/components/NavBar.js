import React from 'react';
import { Navbar, Container, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import firebase from '../firebase';
import LendiLogo from '../assets/lendi_logo_p.png'
import "./Navbar.css"
class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			password: ''
		};
		this.openModal = this.openModal.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = async (newPassword) => {
		await firebase.firestore().collection('loginData').doc(this.props.username).update({
			password: newPassword
		});
		this.setState({
			show: false,
			password: ''
		});
		alert('Password updated successfully');
	};

	openModal = () => {
		this.setState({
			show: true
		});
	};
	handleClose = () => {
		this.setState({
			show: false
		});
	};
	passwordChange(e) {
		this.setState({ password: e.target.value });
	}

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
						<Link to="/logout">
							<FiLogOut className="logout-btn" color="white" title="Logout" size={40} />
						</Link>
					)}
				</Container>
				{this.props.resetPasswordbtn === true ? (
					<Button
						className="reset-pwd-btn"
						variant="light"
						size="sm"
						onClick={() => this.openModal(this.props.username)}
					>
						Reset Password
					</Button>
				) : (
					<div />
				)}
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Reset Password</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form className="form">
							<Form.Group>
								<Form.Label>Your New Password: </Form.Label>
								<Form.Control
									placeholder="4 Digit PIN"
									value={this.state.password}
									onChange={this.passwordChange}
									minLength="4"
									maxLength="4"
									required
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit" onClick={() => this.handleSubmit(this.state.password)}>
							Reset Password
						</Button>
					</Modal.Footer>
				</Modal>
			</Navbar>
		);
	}
}

export default NavBar;
