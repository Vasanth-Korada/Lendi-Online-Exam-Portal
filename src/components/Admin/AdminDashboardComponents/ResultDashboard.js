import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import firebase from '../../../firebase';
import { Redirect } from 'react-router-dom';
import { Card, Form, Button, Tabs, Tab, Table, Col, Row } from 'react-bootstrap';
import '../AdminDashboard.css';
var Results = [];
const ResultDashboard = () => {
    const [recheck, setRecheck] = useState(false);

    const resultFormik = useFormik({
		initialValues: {
			exam_id: ''
		},
		onSubmit: async (values) => {
			Results = [];
			setRecheck(true);
			await firebase
				.firestore()
				.collection('tests')
				.doc(values.exam_id)
				.collection('participants')
				.orderBy('marks', 'desc')
				.orderBy('submit_time')
				.get()
				.then(async (snap) => {
					snap.docs.forEach(async (doc) => {
						const data = doc.data();
						Results.push({
							id: doc.id,
							attempted: data.isAttempted,
							submitted: data.isSubmitted,
							marks: data.marks,
							submit_time: data.submit_time
						});
					});
				})
				.catch((e) => {
					console.log(e);
					window.alert('Invalid Test ID!');
				});
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
                                    {obj.marks === null ? (
                                        <td>Submission Pending</td>
                                    ) : (
                                            <td>{obj.marks}</td>
                                        )}
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