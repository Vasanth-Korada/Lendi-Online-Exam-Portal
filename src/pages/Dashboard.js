import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Card } from 'react-bootstrap';
import firebase from '../firebase.js';
import { Redirect } from 'react-router-dom';

function Dashboard(props) {
	const [ toExam, setToExam ] = useState(false);
	const [ toHome, setToHome ] = useState(false);
	const [ tests, setTests ] = useState([]);
	const [ archTests, setarchTests ] = useState([]);
	const [ username, setUsername ] = useState('');
	const [ testid, setTestID ] = useState(0);
	const [ currentExam, setCurrentExam ] = useState({});
	const [ loading, setLoading ] = useState(false);
	const [ examStarted, setExamStarted ] = useState(false);
	useEffect(
		() => {
			if (examStarted === false) {
				setTimeout(async () => {
					setUsername(props.location.state.username);
					await firebase.firestore().collection('tests').get().then((snapshot) => {
						snapshot.docs.forEach(async (doc) => {
							const data = doc.data();
							var userAttempted = false;
							if (testid !== 0) {
								var ref = await firebase
									.firestore()
									.collection('loginData')
									.doc(username)
									.collection('tests')
									.doc(testid);
								ref.get().then((doc) => {
									const userdata = doc.data();
									console.log(userdata.isAttempted);
									userAttempted = userdata.isAttempted;
								});
							}
							console.log('DB Exam Objects:', data);
							if (data.isActive) {
								setTests((tests) => [ ...tests, data ]);
							} else {
								setarchTests((archTests) => [ ...archTests, data ]);
							}
						});
					});
				}, 5);
				return () => {
					setTests([]);
					setarchTests([]);
					setCurrentExam({});
					setLoading(false);
				};
			}
		},
		[ testid, props.location.state.username ]
	);
	const handleChange = async (obj) => {
		setExamStarted(true);
		setLoading(true);
		console.log(obj);
		console.log(username);
		var ref = await firebase.firestore().collection('loginData').doc(username).collection('tests').doc(obj.exam_id);
		setTestID(obj.exam_id);
		await ref.set({
			isAttempted: true,
			isSubmitted: false,
			marks: 0
		});
		setCurrentExam(obj);
		setToExam(true);
	};

	if (toHome) {
		return <Redirect to="/" />;
	}
	if (toExam) {
		return (
			<Redirect
				to={{
					pathname: '/examPage',
					state: {
						currentExam: currentExam,
						username: username
					}
				}}
			/>
		);
	}
	return (
		<div>
			<Navbar expand="lg" variant="dark" bg="success">
				<Container>
					<Navbar.Brand href="#" className="navbar-logo">
						<h2>Dashboard</h2>
					</Navbar.Brand>
					<h4 style={{ color: 'white', float: 'right', padding: '15px' }}>Welcome {username}</h4>
					<Button onClick={() => setToHome(true)} style={{ float: 'right' }} type="submit" variant="light">
						LOGOUT
					</Button>
				</Container>
			</Navbar>
			<div>
				<h2 style={{ color: 'white', float: 'left', marginTop: '2%', marginLeft: '2%' }}> Ongoing Tests </h2>
			</div>
			<div style={{ marginTop: '100px' }} />
			{tests.map((obj, idx) => {
				return (
					<div key={idx}>
						<Card style={{ marginLeft: '5%', marginRight: '5%' }}>
							<Card.Header as="h5">TEST ID: {obj.exam_id}</Card.Header>
							<Card.Body>
								<Card.Title>{obj.exam_name}</Card.Title>
								<Card.Text>Total Question: {obj.exam_total_questions}</Card.Text>
								<Card.Text>Duration: {obj.exam_duration}</Card.Text>
								<Card.Text>Marks: {obj.exam_marks}</Card.Text>
								<Button
									data-id={obj}
									variant="outline-success"
									style={{ float: 'right' }}
									onClick={() => handleChange(obj)}
								>
									START TEST
								</Button>
							</Card.Body>
						</Card>
						<br />
					</div>
				);
			})}
			{/* 
			<div>
				<h2 style={{ color: 'white', float: 'left', marginTop: '2%', marginLeft: '2%' }}> Archived Tests </h2>
			</div>
			<div style={{ marginTop: '100px' }} />
			{archTests.map((obj, idx) => (
				<div key={idx}>
					<Card style={{ marginLeft: '5%', marginRight: '5%' }}>
						<Card.Header as="h5">TEST ID: {obj.exam_id}</Card.Header>
						<Card.Body>
							<Card.Title>{obj.exam_name}</Card.Title>
							<Card.Text>Total Questions: {obj.exam_total_questions}</Card.Text>
							<Card.Text>Duration: {obj.exam_duration}</Card.Text>
							<Card.Text>Marks: {obj.exam_marks}</Card.Text>
						</Card.Body>
					</Card>
					<br />
				</div>
			))}
				*/}
		</div>
	);
}

export default Dashboard;
