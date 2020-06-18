import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import firebase from '../../../firebase';
import { Redirect } from 'react-router-dom';
import { Card, Form, Button, Tabs, Tab, Table, Col, Row, Dropdown } from 'react-bootstrap';
import '../AdminDashboard.css';
var Results = [];
const ResultDashboard = () => {
	const resultFormik = useFormik({
		initialValues: {
			exam_id: '',
			branch: 'ALL'
		},
		onSubmit: async (values) => {
			Results = [];
			if (resultFormik.values.branch === 'ALL') {
				await firebase
					.firestore()
					.collection('tests')
					.doc(values.exam_id)
					.collection('participants')
					.orderBy('marks_gained', 'desc')
					.orderBy('submit_time')
					.get()
					.then(async (snap) => {
						snap.docs.forEach(async (doc) => {
							const data = doc.data();
							Results.push({
								id: doc.id,
								attempted: data.isAttempted,
								submitted: data.isSubmitted,
								marks: data.marks_gained,
								submit_time: data.submit_time,
								branch: data.branch
							});
						});
					})
					.catch((e) => {
						console.log(e);
						window.alert('Invalid Test ID!');
					});
			} else {
				await firebase
					.firestore()
					.collection('tests')
					.doc(values.exam_id)
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
								attempted: data.isAttempted,
								submitted: data.isSubmitted,
								marks: data.marks_gained,
								submit_time: data.submit_time,
								branch: data.branch
							});
						});
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
		<div className="admin">
			<Form className="get-result-form" onSubmit={resultFormik.handleSubmit}>
				<Col className="form-col">
					<Row>
						<Form.Group>
							<Form.Label>Enter Test ID</Form.Label>
							<Form.Control
								size="lg"
								className="exam-id-text-field"
								name="exam_id"
								id="exam_id"
								value={resultFormik.values.exam_id}
								onChange={resultFormik.handleChange}
								type="text"
								placeholder="Enter Exam Id"
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
										size="lg"
										className="btn btn-primary dropdown-toggle"
										value={resultFormik.values.branch}
										onChange={resultFormik.handleChange}
										required
									>
										<option value="ALL">All Branches</option>
										<option value="CSE">CSE</option>
										<option value="ECE">ECE</option>
										<option value="MECH">MECH</option>
										<option value="EEE">EEE</option>
									</select>
								</Form.Group>
							</Row>
						</Col>
					</Row>

					<Row>
						<Form.Group>
							<Button className="get-result-btn" variant="success" type="submit">
								Get Result
							</Button>
						</Form.Group>
					</Row>
				</Col>
			</Form>

			{Results.length ? (
				<div>
					<Table striped bordered hover size="sm">
						<thead>
							<tr>
								<th>#</th>
								<th>Roll Number</th>
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
									<td>{obj.branch}</td>
									{obj.marks === null ? <td>Submission Pending</td> : <td>{obj.marks}</td>}
									{obj.attempted ? <td>Yes</td> : <td>No</td>}

									{obj.submitted ? <td>Yes</td> : <td>No</td>}
									{<td>{obj.submit_time.toDate().toString().slice(0, 25)}</td>}
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			) : null}
		</div>
	);
};

export default ResultDashboard;
