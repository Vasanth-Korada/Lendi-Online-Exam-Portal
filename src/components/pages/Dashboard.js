import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Card } from 'react-bootstrap';
import firebase from '../../firebase.js';

function Dashboard(props) {
	const [ tests, setTests ] = useState([]);
	useEffect(() => {
		setTimeout(async () => {
			await firebase.firestore().collection('tests').get().then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					const data = doc.data();
					setTests((tests) => [ ...tests, data ]);
				});
			});
		}, 1000);
	}, []);
	return (
		<div>
			<Navbar expand="lg" variant="dark" bg="success">
				<Container>
					<Navbar.Brand href="#" className="navbar-logo">
						<h2>Dashboard</h2>
					</Navbar.Brand>
					<h4 style={{ color: 'white', float: 'right', padding: '15px' }}>Welcome Mr. Vasanth</h4>
					<Button style={{ float: 'right' }} type="submit" variant="light">
						LOGOUT
					</Button>
				</Container>
			</Navbar>
			<h2 style={{ color: 'white', float: 'left', marginTop: '2%', marginLeft: '2%' }}> Ongoing Tests </h2>
			{tests.map((obj, idx) => (
				<Container key={idx}>
					<div>
						<Card bg={'success'} key={idx} text={obj.test_id} style={{ width: '18rem' }}>
							<Card.Header>Header</Card.Header>
							<Card.Body>
								<Card.Title>{obj.test_name} Card Title </Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of the
									card's content.
								</Card.Text>
							</Card.Body>
						</Card>
					</div>
				</Container>
			))}
		</div>
	);
}

export default Dashboard;
