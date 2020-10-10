import React, { useState } from 'react';
import { Form, Row, Button, Table } from 'react-bootstrap';
import '../AdminDashboard.css';
import firebase from '../../../firebase';
import Switch from 'react-switch';
import { HashLoader } from 'react-spinners';

function ExamStatus() {
	const [ examId, setexamId ] = useState('');
	const [ exam, setExam ] = useState({});
	const [ examStatus, setexamStatus ] = useState(false);
	const [ loading, setloading ] = useState(false);

	const handleExamFetch = async () => {
		setloading(true);
		await firebase
			.firestore()
			.collection('tests')
			.doc(examId)
			.get()
			.then((doc) => {
				const examdata = doc.data();
				setexamStatus(examdata.isActive);
				setExam(examdata);
			})
			.catch((e) => {
				alert(e);
			});
		setloading(false);
	};

	const changeExamStatus = async () => {
		setloading(true);
		await firebase
			.firestore()
			.collection('tests')
			.doc(examId)
			.update({
				isActive: !examStatus
			})
			.then(() => {
				setexamStatus(!examStatus);
			})
			.catch((e) => {
				alert(e);
			});
		setloading(false);
	};

	return (
		<div className="admin">
			<Row>
				<Form.Group>
					<Form.Label style={{ display: 'block' }}>Enter Exam ID</Form.Label>
					<Form.Control
						className="exam-id-text-field"
						name="exam_status_exam_id"
						id="exam_status_exam_id"
						value={examId}
						onChange={(e) => setexamId(e.target.value)}
						type="text"
						required
					/>
					<Button
						onClick={handleExamFetch}
						size="lg"
						className="fetch-exam-btn"
						variant="success"
						type="submit"
					>
						Fetch Exam
					</Button>
				</Form.Group>
			</Row>

			{Object.keys(exam).length !== 0 ? (
				<Table striped bordered hover size="sm">
					<thead>
						<th>Exam ID</th>
						<th>Exam Name</th>
						<th>Active Status</th>
					</thead>
					<tbody>
						<tr>
							<td>{exam.exam_id}</td>
							<td>{exam.exam_name}</td>
							<td>
								<Switch onChange={changeExamStatus} checked={examStatus} />
							</td>
						</tr>
					</tbody>
				</Table>
			) : (
				<div />
			)}
			{loading ? (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<HashLoader size={50} color="#0A79DF" />
				</div>
			) : (
				<div />
			)}
		</div>
	);
}

export default ExamStatus;
