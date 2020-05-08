import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Card } from 'react-bootstrap';
import firebase from '../../firebase.js';
import { Redirect } from 'react-router-dom';

function Dashboard(props) {
	const [ toExam, setToExam ] = useState(false);
	const [ toHome, setToHome ] = useState(false);
	const [ tests, setTests ] = useState([]);
	const [ archTests, setarchTests ] = useState([]);
	const [ username, setUsername ] = useState('');
	useEffect(
		() => {
			setTimeout(async () => {
				setUsername(props.location.state.username);
				await firebase.firestore().collection('tests').get().then((snapshot) => {
					snapshot.docs.forEach((doc) => {
						const data = doc.data();
						if (data.isActive) {
							setTests((tests) => [ ...tests, data ]);
						} else {
							setarchTests((archTests) => [ ...archTests, data ]);
						}
					});
				});
			}, 5);
		},
		[ props.location.state.username ]
	);
	if (toHome) {
		return <Redirect to="/" />;
	}
	if (toExam) {
		return <Redirect to="/examPage" />;
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
			{tests.map((obj, idx) => (
				<div key={idx}>
					<Card style={{ marginLeft: '5%', marginRight: '5%' }}>
						<Card.Header as="h5">TEST ID: {obj.test_id}</Card.Header>
						<Card.Body>
							<Card.Title>{obj.test_name}</Card.Title>
							<Card.Text>Total Question: {obj.total_questions}</Card.Text>
							<Card.Text>Duration: {obj.test_duration}</Card.Text>
							<Card.Text>Marks: {obj.total_marks}</Card.Text>
							<Button
								variant="outline-success"
								style={{ float: 'right' }}
								onClick={() => setToExam(true)}
							>
								START TEST
							</Button>
						</Card.Body>
					</Card>
					<br />
				</div>
			))}
			<div>
				<h2 style={{ color: 'white', float: 'left', marginTop: '2%', marginLeft: '2%' }}> Archived Tests </h2>
			</div>
			<div style={{ marginTop: '100px' }} />
			{archTests.map((obj, idx) => (
				<div key={idx}>
					<Card style={{ marginLeft: '5%', marginRight: '5%' }}>
						<Card.Header as="h5">TEST ID: {obj.test_id}</Card.Header>
						<Card.Body>
							<Card.Title>{obj.test_name}</Card.Title>
							<Card.Text>Total Question: {obj.total_questions}</Card.Text>
							<Card.Text>Duration: {obj.test_duration}</Card.Text>
							<Card.Text>Marks: {obj.total_marks}</Card.Text>
						</Card.Body>
					</Card>
					<br />
				</div>
			))}
		</div>
	);
}

export default Dashboard;
