import React, { useState } from 'react';
import { useFormik } from 'formik';
import firebase from '../../../firebase';
import { Form, Button, Table, Col, Row } from 'react-bootstrap';
import '../AdminDashboard.css';
import { HashLoader } from 'react-spinners';
import { AdminLoginBranchContext } from '../AdminLoginBranchContext';
var Results = [];
const ResultDashboard = () => {
	const [ examName, setexamName ] = useState('');
	const [ loading, setloading ] = useState(false);
	const resultFormik = useFormik({
		initialValues: {
			exam_id: '',
			branch: ''
		},
		onSubmit: async (values) => {
			setloading(true);
			Results = [];
			var ref = await firebase.firestore().collection('tests').doc(values.exam_id);
			await ref.get().then((doc) => {
				const data = doc.data();
				setexamName(data.exam_name);
			});
			if (resultFormik.values.branch === 'ALL') {
				ref
					.collection('participants')
					.orderBy('marks_gained', 'desc')
					.orderBy('submit_time')
					.get()
					.then(async (snap) => {
						snap.docs.forEach(async (doc) => {
							const data = doc.data();
							Results.push({
								id: doc.id,
								name: data.name,
								attempted: data.isAttempted,
								submitted: data.isSubmitted,
								marks: data.marks_gained,
								submit_time: data.submit_time,
								branch: data.branch
							});
						});
						setloading(false);
					})
					.catch((e) => {
						console.log(e);
						window.alert('Invalid Test ID!');
					});
			} else {
				ref
					.collection('participants')
					.where('branch', '==', resultFormik.values.branch)
					.orderBy('marks_gained', 'desc')
					.orderBy('submit_time')
					.get()
					.then(async (snap) => {
						snap.docs.forEach(async (doc) => {
							const data = doc.data();
							console.log(data);
							Results.push({
								id: doc.id,
								name: doc.name,
								attempted: data.isAttempted,
								submitted: data.isSubmitted,
								marks: data.marks_gained,
								submit_time: data.submit_time,
								branch: data.branch
							});
						});
						setloading(false);
					})
					.catch((e) => {
						console.log(e);
						window.alert('Invalid Test ID!');
					});
			}
			console.log(Results);
		}
	});
	return (
		<AdminLoginBranchContext.Consumer>
			{(branch) => (
				<div className="admin">
					<Form className="get-result-form" onSubmit={resultFormik.handleSubmit}>
						<Col className="form-col">
							<Row>
								<Form.Group>
									<Form.Label>Enter Exam ID</Form.Label>
									<Form.Control
										name="exam_id"
										id="exam_id"
										className="exam-id-text-field"
										value={resultFormik.values.exam_id}
										onChange={resultFormik.handleChange}
										type="text"
										required
									/>
								</Form.Group>
								<div style={{ marginLeft: '1%' }} />
								<Col>
									<Row>
										<Form.Label>Choose Branch:</Form.Label>
									</Row>
									<Row>
										<Form.Group>
											<select
												id="branch"
												name="branch"
												size="lg"
												className="btn btn-primary dropdown-toggle choose-branch-btn"
												value={resultFormik.values.branch}
												onChange={resultFormik.handleChange}
												required
											>
												<option value="">Select Branch</option>
												<option disabled={branch !== 'superAdmin'} value="ALL">
													All Branches
												</option>
												<option
													disabled={branch === 'superAdmin' ? false : branch !== 'cse'}
													value="CSE"
												>
													CSE
												</option>
												<option
													disabled={branch === 'superAdmin' ? false : branch !== 'ece'}
													value="ECE"
												>
													ECE
												</option>
												<option
													disabled={branch === 'superAdmin' ? false : branch !== 'mech'}
													value="MECH"
												>
													MECH
												</option>
												<option
													disabled={branch === 'superAdmin' ? false : branch !== 'eee'}
													value="EEE"
												>
													EEE
												</option>
											</select>
										</Form.Group>
										<Row>
											<Form.Group>
												<Button
													size="lg"
													className="fetch-result-btn"
													variant="success"
													type="submit"
												>
													Fetch Result
												</Button>
											</Form.Group>
										</Row>
									</Row>
								</Col>
							</Row>
						</Col>
					</Form>
					{loading ? (
						<div className="hash-loader">
							<HashLoader size={50} color="#0A79DF" />
						</div>
					) : (
						<div />
					)}
					{Results.length ? (
						<div>
							<div className="result-dashboard-exam-name">
								<p>Exam Name: {examName}</p>
							</div>
							<Table striped bordered hover size="sm">
								<thead>
									<tr>
										<th>#</th>
										<th>Roll Number</th>
										<th>Name</th>
										<th>Branch</th>
										<th>Marks</th>
										<th>Attempted</th>
										<th>Submitted</th>
										<th>Submitted Time</th>
									</tr>
								</thead>
								<tbody>
									{Results.map((obj, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{obj.id}</td>
											<td>{obj.name}</td>
											<td>{obj.branch}</td>
											{obj.marks === null || undefined ? (
												<td>Submission Pending</td>
											) : (
												<td>{obj.marks}</td>
											)}
											{obj.attempted ? <td>Yes</td> : <td>No</td>}
											{obj.submitted ? <td>Yes</td> : <td>No</td>}
											{obj.submit_time === undefined || null ? (
												<td>Submission Pending</td>
											) : (
												<td>{obj.submit_time.toDate().toString().slice(0, 25)}</td>
											)}
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					) : null}
				</div>
			)}
		</AdminLoginBranchContext.Consumer>
	);
};

export default ResultDashboard;
