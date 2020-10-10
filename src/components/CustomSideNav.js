import React, { useState } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaUserCircle, FaSignOutAlt, FaInfoCircle } from 'react-icons/fa';
import { GoShield } from 'react-icons/go';
import { Modal, Form, Button } from 'react-bootstrap';
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';
import VerticalCenteredModal from '../utils/VerticalCenteredModal';
import HashLoader from 'react-spinners/HashLoader';
import { ToastContainer, toast } from 'react-toastify';

function CustomSideNav({ ...props }) {
	const [ showModal, setshowModal ] = useState(false);
	const [ password, setpassword ] = useState('');
	const [ logout, setlogout ] = useState(false);
	const [ profileModal, setprofileModal ] = useState(false);
	const [ loading, setloading ] = useState(false);
	const [ currentPassword, setcurrentPassword ] = useState('');
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
		const bRef = await firebase.firestore().collection(props.userObj.branch).doc(props.userObj.batch);
		var ref = bRef.collection('data').doc(props.userObj.regd_no);
		await ref.get().then(async (doc) => {
			setloading(true);
			const data = doc.data();
			if (currentPassword === data.password) {
				await ref
					.update({
						password: newPassword
					})
					.then(() => {
						setshowModal(false);
						setpassword('');
						setcurrentPassword('');
						setloading(false);
						toast.success('Password updated successfully', {
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined
						});
					});
			} else {
				setloading(false);
				toast.error('Your Current Password is Incorrect, Please try again!', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
			}
		});
	};
	if (logout) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<ToastContainer />
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Reset Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="form">
						<Form.Group>
							<Form.Label>Your Current Password: </Form.Label>
							<Form.Control
								placeholder="4 Digit PIN"
								value={currentPassword}
								onChange={(e) => setcurrentPassword(e.target.value)}
								minLength="4"
								maxLength="4"
								required
							/>
						</Form.Group>
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
					{loading ? (
						<div style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle' }}>
							<HashLoader size={50} color="#0A79DF" />
						</div>
					) : (
						<div />
					)}{' '}
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
			<VerticalCenteredModal show={profileModal} onHide={() => setprofileModal(false)} userObj={props.userObj} />

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
				<SideNav.Nav>
					<NavItem eventKey="myprofile" onSelect={() => setprofileModal(true)}>
						<NavIcon>
							<FaUserCircle />
						</NavIcon>
						<NavText>
							<b>My Profile</b>
						</NavText>
					</NavItem>
					<NavItem eventKey="resetpassword" onSelect={() => openModal()}>
						<NavIcon>
							<GoShield />
						</NavIcon>
						<NavText>
							<b>Reset Password</b>
						</NavText>
					</NavItem>
					<NavItem eventKey="about" onSelect={() => window.open('http://lendi.org/')}>
						<NavIcon>
							<FaInfoCircle />
						</NavIcon>
						<NavText>
							<b>Info</b>
						</NavText>
					</NavItem>
					<NavItem eventKey="logout" onSelect={() => setlogout(true)}>
						<NavIcon>
							<FaSignOutAlt />
						</NavIcon>
						<NavText>
							<b>Logout</b>
						</NavText>
					</NavItem>
				</SideNav.Nav>
			</SideNav>
		</div>
	);
}

export default CustomSideNav;
