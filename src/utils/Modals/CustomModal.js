import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';
import { Table } from 'react-bootstrap';

function CustomModal(props) {
	return (
		<div>
			{console.log(props.archivedtestobj)}
			<Modal {...props} size="lg" dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">{props.archivedtestobj.exam_name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{ color: '#1BA94C' }}>
						{props.archivedtestobj.marks_gained === null ? (
							<b>Marks Scored: Not Attempted</b>
						) : (
							<h2>
								<b>
									Marks Scored: {props.archivedtestobj.marks_gained} / {props.archivedtestobj.exam_marks}
								</b>
							</h2>
						)}
					</div>

					<div style={{ color: '#0A79DF' }}>
						<h4>Test ID: {props.archivedtestobj.exam_id}</h4>
					</div>
					<Table striped bordered hover size="sm" responsive>
						<thead>
							<tr>
								<th>S.NO</th>
								<th>QUESTION</th>
								<th>CORRECT ANSWER</th>
							</tr>
						</thead>
						<tbody>
							{props.archivedtestobj.questions.map((obj, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{obj.question}</td>
										<td style={{ color: '#1BA94C' }}>
											<b>{obj.correct_answer}</b>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CustomModal;
