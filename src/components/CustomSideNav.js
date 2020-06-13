import React, { useState } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { GoShield } from 'react-icons/go';
import { Modal, Form, Button } from 'react-bootstrap';
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';
import VerticalCenteredModal from '../utils/VerticalCenteredModal';

function CustomSideNav({ ...props }) {
	const [ showModal, setshowModal ] = useState(false);
	const [ password, setpassword ] = useState('');
	const [ logout, setlogout ] = useState(false);
	const [ profileModal, setprofileModal ] = useState(false);
	const openModal = () => {
		setshowModal(true);
	};
	const handleClose = () => {
		setshowModal(false);
	};
	const passwordChange = (e) => {
		setpassword(e.target.value);
	};
	const handleResetPassword = async (newPassword) => {
		await firebase
			.firestore()
			.collection('loginData')
			.doc(props.username)
			.update({
				password: newPassword
			})
			.then(() => {
				setshowModal(false);
				setpassword('');
				alert('Password updated successfully');
			});
	};
	if (logout) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Reset Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="form">
						<Form.Group>
							<Form.Label>Your New Password: </Form.Label>
							<Form.Control
								placeholder="4 Digit PIN"
								value={password}
								onChange={passwordChange}
								minLength="4"
								maxLength="4"
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" type="submit" onClick={() => handleResetPassword(password)}>
						Reset Password
					</Button>
				</Modal.Footer>
			</Modal>
			<VerticalCenteredModal show={profileModal} onHide={() => setprofileModal(false)} />
			<SideNav
				style={{ backgroundColor: '#0A79DF', height: '150%' }}
				onSelect={(selected) => {
					if (selected === 'logout') {
					}
				}}
			>
				<SideNav.Toggle />
				<br />
				<br />
				<br />
				<br />
				<br />
				<SideNav.Nav defaultSelected="dashboard">
					<NavItem eventKey="myprofile" onSelect={() => setprofileModal(true)}>
						<NavIcon>
							<FaUserCircle />
						</NavIcon>
						<NavText>My Profile</NavText>
					</NavItem>
					<NavItem eventKey="resetpassword" onSelect={() => openModal()}>
						<NavIcon>
							<GoShield />
						</NavIcon>
						<NavText>Reset Password</NavText>
					</NavItem>
					<NavItem eventKey="logout" onSelect={() => setlogout(true)}>
						<NavIcon>
							<FaSignOutAlt />
						</NavIcon>
						<NavText>Logout</NavText>
					</NavItem>

					{/* 
				<NavItem eventKey="charts">
					<NavIcon>
						<i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
					</NavIcon>
					<NavText>Charts</NavText>
					<NavItem eventKey="charts/linechart">
						<NavText>Line Chart</NavText>
					</NavItem>
					<NavItem eventKey="charts/barchart">
						<NavText>Bar Chart</NavText>
					</NavItem>
				</NavItem>
				*/}
				</SideNav.Nav>
			</SideNav>
		</div>
	);
}

export default CustomSideNav;
