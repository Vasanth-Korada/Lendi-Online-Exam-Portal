import React, { useState, useEffect, useContext } from 'react';
import { Accordion, Container, Button, Card, Row, Col } from 'react-bootstrap';
import firebase from '../firebase.js';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './Dashboard.css';
import { UserContext } from '../context/userContext';
import PropagateLoader from 'react-spinners/PropagateLoader';
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

				await firebase.firestore().collection('tests').get().then((snapshot) => {
					snapshot.docs.forEach(async (doc) => {
						const data = doc.data();
						if (data.isActive) {
							var ref1 = await firebase
								.firestore()
								.collection('tests')
								.doc(data.exam_id)
								.collection('participants')
								.doc(props.location.state.username);
							ref1
								.get()
								.then((doc) => {
									const data = doc.data();
									setisAttempted(data.isAttempted);
									console.log('User Attempted Active Test', data.isAttempted);
								})
								.catch((e) => {
									console.log(e);
								});
							setisAttempted(data.isAttempted);
							console.log(data);
							setTests((tests) => [ ...tests, data ]);
							setTestID(data.exam_id);
						} else {
							var scored = 0;
							var ref2 = await firebase
								.firestore()
								.collection('tests')
								.doc(data.exam_id)
								.collection('participants')
								.doc(props.location.state.username);
							ref2
								.get()
								.then((doc) => {
									const data1 = doc.data();
									console.log(data1.marks);
									const scored = data1.marks;
									data['scored'] = scored;
									console.log(data);
									setarchTests((archTests) => [ ...archTests, data ]);
								})
								.catch((e) => {
									console.log(e);
								});
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
		var ref = await firebase
			.firestore()
			.collection('tests')
			.doc(obj.exam_id)
			.collection('participants')
			.doc(username);
		setTestID(obj.exam_id);
		await ref.set({
			isAttempted: true,
			isSubmitted: false,
			marks: null
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
						<NavBar title={`Welcome ${username}`} resetPasswordbtn={true} username={username} />
						<div className="container-fluid">
							<div>
								<h2 style={{ float: 'left', marginTop: '-5%', marginLeft: '3%' }}>
									<b>Ongoing Tests</b>
								</h2>
							</div>
							<div style={{ marginTop: '100px' }} />
							{tests.map((obj, idx) => {
								return (
									<div className="col" key={idx}>
										<Card style={{ marginLeft: '4%', marginRight: '5%' }}>
											<Card.Header as="h5">Test ID: {obj.exam_id}</Card.Header>
											<Card.Body>
												<Card.Title>{obj.exam_name}</Card.Title>
												<Card.Text>Total Question: {obj.exam_total_questions}</Card.Text>
												<Card.Text>Duration: {obj.exam_duration}</Card.Text>
												<Card.Text>Marks: {obj.exam_marks}</Card.Text>
												{isAttempted ? (
													<Button
														style={{
															fontSize: '14px',
															float: 'right',
															width: '15%',
															color: 'white',
															backgroundColor: 'grey'
														}}
														type="submit"
														variant="outline"
														size="lg"
														disabled
													>
														ALREADY ATTEMPTED
													</Button>
												) : (
													<Button
														style={{
															float: 'right',
															width: '15%',
															color: 'white',
															backgroundColor: '#0A79DF'
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
								{loading ? <PropagateLoader size={20} color={'#0A79DF'} loading={loading} /> : <div />}
							</div>
							<Row>
								<Col xs={12} xl={6}>
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
													<b>My Previous Activity</b>
												</h5>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="0">
												<Card className="accordion-content">
													{archTests.map((obj, idx) => (
														<div key={idx}>
															<Card
																style={{
																	marginLeft: '5%',
																	marginRight: '5%',
																	marginTop: '5%'
																}}
															>
																<Card.Header as="h5">
																	TEST ID: {obj.exam_id}
																</Card.Header>
																<Card.Body>
																	<Card.Title>{obj.exam_name}</Card.Title>
																	<Card.Text>Total Marks: {obj.exam_marks}</Card.Text>
																	<Card.Text>
																		{obj.scored === null ? (
																			<b>Marks Scored: Not Attempted</b>
																		) : (
																			<b>Marks Scored: {obj.scored}</b>
																		)}
																	</Card.Text>
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
								<Col xs={12} xl={6}>
									<div style={{ marginLeft: '-15%' }}>
										<img
											className="login-image-signin"
											style={{ width: '35rem', height: '35rem', marginTop: '1%', opacity: '1.0' }}
											src={require('../assets/clip-programming.png')}
											alt=""
										/>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				);
			}}
		</UserContext.Consumer>
	);
}

export default Dashboard;
