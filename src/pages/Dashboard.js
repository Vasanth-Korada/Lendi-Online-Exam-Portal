import React, { useState, useEffect, useContext } from 'react';
import { Accordion, Container, Button, Card, Row, Col } from 'react-bootstrap';
import firebase from '../firebase.js';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './Dashboard.css';
import { UserContext } from '../context/userContext';
import RingLoader from 'react-spinners/RingLoader';
function Dashboard(props) {
	const [ toExam, setToExam ] = useState(false);
	const userContext = useContext(UserContext);
	const [ toHome, setToHome ] = useState(false);
	const [ tests, setTests ] = useState([]);
	const [ archTests, setarchTests ] = useState([]);
	const [ username, setUsername ] = useState('');
	const [ testid, setTestID ] = useState(0);
	const [ currentExam, setCurrentExam ] = useState({});
	const [ examStarted, setExamStarted ] = useState(false);
	const [ loading, setloading ] = useState(false);
	const [ isAttempted, setisAttempted ] = useState(false);
	useEffect(() => {
		if (examStarted === false) {
			setTimeout(async () => {
				setUsername(props.location.state.username);
				var USERNAME = props.location.state.username;
				// var ref = await firebase.firestore().collection('loginData').doc(USERNAME);
				// ref.collection("tests").doc(currentExam.exam_id).get().then((doc)=>{
				// 	const data = doc.data();
				// 	console.log(doc.isAttempted);
				// })

				await firebase.firestore().collection('tests').get().then((snapshot) => {
					snapshot.docs.forEach(async (doc) => {
						const data = doc.data();
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
				setloading(false);
			};
		}
	}, []);
	const handleChange = async (obj) => {
		setloading(true);
		setExamStarted(true);
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
		<UserContext.Consumer>
			{(context) => {
				return (
					<div>
						<NavBar title={`Welcome ${username}`} />
						<div>
							<h2 style={{ float: 'left', marginTop: '2%', marginLeft: '2%' }}>
								{' '}
								<b>Ongoing Tests</b>{' '}
							</h2>
						</div>

						<div style={{ marginTop: '100px' }} />
						{tests.map((obj, idx) => {
							return (
								<div key={idx}>
									<Card style={{ marginLeft: '5%', marginRight: '5%' }}>
										<Card.Header as="h5">Test ID: {obj.exam_id}</Card.Header>
										<Card.Body>
											<Card.Title>{obj.exam_name}</Card.Title>
											<Card.Text>Total Question: {obj.exam_total_questions}</Card.Text>
											<Card.Text>Duration: {obj.exam_duration}</Card.Text>
											<Card.Text>Marks: {obj.exam_marks}</Card.Text>
											{isAttempted ? (
												<div>Already Attempted</div>
											) : (
												<Button
													style={{
														float: 'right',
														width: '15%',
														color: 'white',
														backgroundColor: '#732BCA'
													}}
													type="submit"
													variant="outline"
													size="lg"
													onClick={() => {
														handleChange(obj);
													}}
												>
													START TEST
												</Button>
											)}
										</Card.Body>
									</Card>
									<br />
								</div>
							);
						})}
						<div style={{ marginLeft: '50%' }}>
							{loading ? <RingLoader size={100} color={'#732BCA'} loading={loading} /> : <div />}
						</div>
						{/* <div>
							<h2 style={{ color: 'black', float: 'left', marginTop: '2%', marginLeft: '2%' }}>
								{' '}
								Archived Tests{' '}
							</h2>
						</div>*/}
						<Row>
							<Col xl={6}>
								<Accordion
									defaultActiveKey="0"
									style={{
										color: 'black',
										float: 'left',
										marginTop: '2%',
										marginLeft: '10%',
										width: '65%'
									}}
								>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="0">
											<h5>
												<b>Archived Tests</b>
											</h5>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="0">
											<Card className="accordion-content">
												{archTests.map((obj, idx) => (
													<div key={idx}>
														<Card style={{ marginLeft: '5%', marginRight: '5%',marginTop: '5%'  }}>
															<Card.Header as="h5">TEST ID: {obj.exam_id}</Card.Header>
															<Card.Body>
																<Card.Title>{obj.exam_name}</Card.Title>
																<Card.Text>
																	Total Questions: {obj.exam_total_questions}
																</Card.Text>
																<Card.Text>Duration: {obj.exam_duration}</Card.Text>
																<Card.Text>Marks: {obj.exam_marks}</Card.Text>
															</Card.Body>
														</Card>
														<br />
													</div>
												))}
											</Card>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							</Col>
							<Col xl={6}>
								<div style={{ marginTop: '100px' }} />

								<div style={{ marginLeft: '-25%' }}>
									<img
										className="login-image-signin"
										style={{ width: '35rem', height: '25rem', marginTop: '1%', opacity: '0.8' }}
										src={require('../assets/clip-programming.png')}
										alt=""
									/>
								</div>
							</Col>
						</Row>
					</div>
				);
			}}
		</UserContext.Consumer>
	);
}

export default Dashboard;
