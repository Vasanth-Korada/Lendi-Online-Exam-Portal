import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./VerticalCenteredModal.css"
function MyVerticallyCenteredModal(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">My Profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="user-data">
					<p>NAME: <span className="tab"><b>{props.userObj.name}</b></span> </p>
					<p>REGD NO:<span className="tab">{props.userObj.regd_no}</span></p>
					<p>BRANCH:<span className="tab">{props.userObj.branch}</span></p>
					<p>EMAIL:<span className="tab">{props.userObj.email}</span></p>
					<p>MOBILE:<span className="tab">{props.userObj.phno}</span></p>
					<p>BTECH AVG:<span className="tab">{props.userObj.btech_avg}</span></p>
					<p>INTERMEDIATE:<span className="tab">{props.userObj.inter_percentage}</span></p>
					<p>CLASS 10: <span className="tab">{props.userObj.tenth_percentage}</span></p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default MyVerticallyCenteredModal;
