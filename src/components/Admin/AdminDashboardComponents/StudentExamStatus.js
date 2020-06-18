import React, { useState } from 'react';
import '../AdminDashboard.css';
import { Form, Row, Button, Table } from 'react-bootstrap';
import Switch from 'react-switch';
import firebase from '../../../firebase';
import { HashLoader } from 'react-spinners';

function StudentExamStatus() {
	const [ rollno, setrollno ] = useState('');
	const [ examData, setexamData ] = useState({});
	const [ studentData, setstudentData ] = useState({});
	const [ examId, setexamId ] = useState('');
	const [ studentExamIsAttempted, setstudentExamIsAttempted ] = useState(false);
	const [ loading, setloading ] = useState(false);
	const handleFetchStudent = async () => {
		setloading(true);
		var ref = await firebase.firestore().collection('tests').doc(examId);
		ref
			.get()
			.then((doc) => {
				const examInfo = doc.data();
				setexamData(examInfo);
			})
			.catch((e) => {
				alert(e);
			});
		ref
			.collection('participants')
			.doc(rollno.toUpperCase())
			.get()
			.then((studentDoc) => {
				const studentExamData = studentDoc.data();
				setstudentExamIsAttempted(studentExamData.isAttempted);
				setstudentData(studentExamData);
			})
			.catch((e) => {
				alert(e);
			});
		setloading(false);
	};

	const changeStudentExamIsAttempted = async () => {
		setloading(true);
		var localref = await firebase.firestore().collection('tests').doc(examId);
		localref
			.collection('participants')
			.doc(rollno)
			.update({
				isAttempted: !studentExamIsAttempted
			})
			.then(() => {
				setstudentExamIsAttempted(!studentExamIsAttempted);
			});
		setloading(false);
	};

	return (
		<div className="admin">
			{loading ? <HashLoader size={50} color="#0A79DF" /> : <div />}
			<Row>
				<Form.Group>
					<Form.Label>Enter Exam ID</Form.Label>
					<Form.Control
						className="exam-id-text-field"
						name="student_exam_status"
						id="student_exam_status_exam_id"
						type="text"
						value={examId}
						onChange={(e) => {
							setexamId(e.target.value);
						}}
						required
					/>
				</Form.Group>
				<div style={{ marginLeft: '1em' }}> </div>
				<Form.Group>
					<Form.Label>Enter Roll Number</Form.Label>
					<Form.Control
						className="exam-id-text-field"
						name="student_exam_status"
						id="student_exam_status_roll_no"
						type="text"
						minLength="10"
						maxLength="10"
						value={rollno}
						onChange={(e) => {
							setrollno(e.target.value);
						}}
						required
					/>
				</Form.Group>
			</Row>
			<Form.Group>
				<Button
					style={{ width: '20%', marginLeft: '-1%' }}
					onClick={handleFetchStudent}
					size="lg"
					variant="success"
					type="submit"
				>
					Fetch Student
				</Button>
			</Form.Group>

			{Object.keys(studentData).length !== 0 ? (
				<Table striped bordered hover size="sm">
					<thead>
						<th>Exam ID</th>
						<th>Exam Name</th>
						<th>Student Name</th>
						<th>Is Attempted</th>
					</thead>
					<tbody>
						<tr>
							<td>{examData.exam_id}</td>
							<td>{examData.exam_name}</td>
							<td>{studentData.name}</td>
							<Switch onChange={changeStudentExamIsAttempted} checked={studentExamIsAttempted} />
						</tr>
					</tbody>
				</Table>
			) : (
				<div />
			)}
		</div>
	);
}

export default StudentExamStatus;
