import React, { useState } from 'react';
import { useFormik } from 'formik';
import firebase from '../../../firebase';
import { Redirect } from 'react-router-dom';
import { Card, Form, Button, Col } from 'react-bootstrap';
import '../AdminDashboard.css';

var examInfo;
const ExamDashboard = () => {
	const [ toQuestion, setToQuestion ] = useState(false);

	const formik = useFormik({
		initialValues: {
			exam_id: '',
			exam_name: '',
			duration: undefined,
			exam_date: '',
			exam_time: '',
			total_marks: undefined,
			total_questions: undefined,
			faculty_name: '',
			exam_pin: '',
			dept: 'CSE',
			batch: '2021',
			Path: ''
		},
		onSubmit: async (values) => {
			examInfo = { ...values };
			const unixTime = new Date(values.exam_date + ',' + values.exam_time).getTime() / 1000;

			var ref = await firebase.firestore().collection('tests').doc(values.exam_id);
			await ref.set({
				isActive: false,
				exam_duration: values.duration,
				exam_time_unix: unixTime,
				exam_id: values.exam_id,
				exam_name: values.exam_name,
				exam_marks: values.total_marks,
				exam_date: values.exam_date,
				exam_time: values.exam_time,
				exam_total_questions: values.total_questions,
				exam_pin: values.exam_pin,
				dept: values.dept,
				batch: values.batch,
				faculty_name: values.faculty_name
			});
			console.log(values);
			setToQuestion(true);
		}
	});
	if (toQuestion) {
		console.log(examInfo);
		return (
			<Redirect
				to={{
					pathname: examInfo.Path,
					state: {
						examDetails: examInfo
					}
				}}
			/>
		);
	}

	return (
		<div>
			<div className="admin">
				<Card>
					<Card.Header as="h5">CREATE EXAM HERE</Card.Header>
					<Card.Header>
						<Form onSubmit={formik.handleSubmit}>
							<Form.Group>
								<Form.Label>Exam Id: </Form.Label>
								<Form.Control
									name="exam_id"
									id="exam_id"
									value={formik.values.exam_id}
									onChange={formik.handleChange}
									type="text"
									placeholder="Enter Exam Id"
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Exam Name: </Form.Label>
								<Form.Control
									type="text"
									id="exam_name"
									name="exam_name"
									placeholder="Enter Exam Name"
									value={formik.values.exam_name}
									onChange={formik.handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label> Exam Duration: </Form.Label>
								<Form.Control
									type="number"
									id="duration"
									name="duration"
									placeholder="Enter Exam Duration in Minutes only"
									value={formik.values.duration}
									onChange={formik.handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Exam Date: </Form.Label>
								<Form.Control
									type="date"
									id="exam_date"
									placeholder="Enter Exam Id"
									name="exam_date"
									value={formik.values.exam_date}
									onChange={formik.handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Exam Start Time (24 Hrs format only): </Form.Label>
								<Form.Control
									name="exam_time"
									id="exam_time"
									value={formik.values.exam_time}
									onChange={formik.handleChange}
									type="time"
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Total Marks: </Form.Label>
								<Form.Control
									type="text"
									name="total_marks"
									id="total_marks"
									placeholder="Enter Total Marks"
									value={formik.values.total_marks}
									onChange={formik.handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Total Questions: </Form.Label>
								<Form.Control
									type="text"
									name="total_questions"
									id="total_questions"
									placeholder="Enter Total Questions"
									value={formik.values.total_questions}
									onChange={formik.handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Faculty Name: </Form.Label>
								<Form.Control
									type="text"
									name="faculty_name"
									id="faculty_name"
									placeholder="Enter Faculty Name"
									value={formik.values.faculty_name}
									onChange={formik.handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Choose Department:</Form.Label>
								<br />
								<select
									id="dept"
									name="dept"
									value={formik.values.dept}
									onChange={formik.handleChange}
									className="btn btn-primary dropdown-toggle "
									required
								>
									<option value={'CSE'}>CSE</option>
									<option value={'ECE'}>ECE</option>
									<option value={'EEE'}>EEE</option>
									<option value={'MECH'}>MECH</option>
									<option value={'CSSE'}>CSSE</option>
								</select>
							</Form.Group>
							<Form.Group>
								<Form.Label>Choose Batch:</Form.Label>
								<br />
								<select
									id="batch"
									name="batch"
									value={formik.values.batch}
									onChange={formik.handleChange}
									className="btn btn-primary dropdown-toggle "
									required
								>
									<option value={'2021'}>2021</option>
									<option value={'2022'}>2022</option>
									<option value={'2023'}>2023</option>
								</select>
							</Form.Group>
							<Form.Group>
								<Form.Label>Create Exam PIN: </Form.Label>
								<Form.Control
									type="text"
									name="exam_pin"
									id="exam_pin"
									placeholder="EG: 8457"
									value={formik.values.exam_pin}
									onChange={formik.handleChange}
									minLength="4"
									maxLength="4"
									required
								/>
							</Form.Group>
							<hr />
							<Col sm={10}>
								<Form.Check
									type="radio"
									label="Manual Upload"
									name="Path"
									value="/question"
									id="/question"
									onChange={formik.handleChange}
								/>
								<Form.Check
									type="radio"
									label="Bulk Upload (CSV Format)"
									name="Path"
									id="/csv-upload"
									value="/csv-upload"
									onChange={formik.handleChange}
								/>
							</Col>
							<br />
							<Form.Group>
								<Button type="submit">Create Exam</Button>
							</Form.Group>
						</Form>
					</Card.Header>
				</Card>
			</div>
		</div>
	);
};

export default ExamDashboard;
