import React, { useState, useEffect } from 'react';
import firebase from '../firebase.js';
import NavBar from '../components/NavBar';
import './Dashboard.css';
import CustomSideNav from '../components/CustomSideNav';
import CustomModal from '../utils/Modals/CustomModal';
import { getAllExams, isAttempted } from '../helpers/userDashoardHelper';
import { Card } from 'react-bootstrap';
import ExamCard from '../helpers/ExamCard.js';
import { Tabs, Tab } from 'react-bootstrap';
import Loader from '../utils/Loader';

function Dashboard(props) {
	const [ userInfo, setuserInfo ] = useState({});
	const [ allExams, setallExams ] = useState([]);
	const [ loading, setloading ] = useState(false);
	const [ customModal, setcustomModal ] = useState(false);
	const [ archivedObj, setarchivedObj ] = useState({});
	const [ previousExams, setpreviousExams ] = useState([]);
	let examCounter = 0;
	const handlecustomModalClose = () => {
		setcustomModal(false);
	};

	useEffect(() => {
		setuserInfo(props.location.state.userObj);
		getAllExams().then((allExams) => {
			setallExams(allExams);
		});
		getAllExams().then(async (allExams) => {
			allExams.map(async (exam) => {
				var ref2 = await firebase
					.firestore()
					.collection('tests')
					.doc(exam.exam_id)
					.collection('participants')
					.doc(props.location.state.userObj.regd_no);
				ref2
					.get()
					.then((doc) => {
						const data1 = doc.data();
						if (data1.isSubmitted) {
							let temp = Object.assign(exam, data1);
							setpreviousExams((exams) => [ ...exams, temp ]);
						}
					})
					.catch((e) => {
						console.log(e);
					});
			});
		});
	}, []);

	const handleStartTest = async (exam, username) => {
		isAttempted(exam.exam_id, username).then(async (data) => {
			console.log(data);
			if (data === false) {
				var pin = prompt('Enter Exam PIN:');
				if (pin === exam.exam_pin) {
					setloading(true);
					console.log(exam);
					console.log(userInfo.regd_no);
					var ref = await firebase
						.firestore()
						.collection('tests')
						.doc(exam.exam_id)
						.collection('participants')
						.doc(userInfo.regd_no);
					await ref
						.set({
							isAttempted: true,
							isSubmitted: false,
							name: userInfo.name,
							regd_no: userInfo.regd_no,
							branch: userInfo.branch
						})
						.then((_) => {
							redirectToExamPage(exam);
							setloading(false);
						});
				} else {
					window.alert('Invalid Exam PIN, Please try again!');
				}
			} else {
				window.alert('Hey, You have already taken this exam');
			}
		});
	};

	const redirectToExamPage = (currentExam) => {
		console.log('Function Called');
		return props.history.push({
			pathname: '/examPage',
			state: {
				currentExam: currentExam,
				username: userInfo.regd_no,
				userObj: userInfo
			}
		});
	};

	return (
		<div className="col">
			<CustomSideNav className="custom-sidenav" username={userInfo.regd_no} userObj={userInfo} />
			<NavBar emoji={true} title={`WELCOME ${userInfo.name}`} username={userInfo.regd_no} />

			<div className="dashboard-tabs">
				<Tabs defaultActiveKey="ongoingExams" id="uncontrolled-tab-example">
					<Tab eventKey="ongoingExams" title="Ongoing Exams">
						{loading ? <Loader /> : <div />}
						<div className="row align-items-center justify-content-center">
							{allExams.map((exam, index) => {
								return (
									exam.isActive && (
										<div
											key={index}
											className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-4 mb-4 exam-cards-col"
										>
											<ExamCard exam={exam} />
											<br />
											<div
												className="btn btn-primary btn-block start-test-btn"
												onClick={() => handleStartTest(exam, userInfo.regd_no)}
											>
												START TEST
											</div>
											<div style={{ visibility: 'hidden' }}>{++examCounter}</div>
										</div>
									)
								);
							})}
							{examCounter === 0 && (
								<div className="no-ongoing-exams">
									<div className="col-md-1">
										<img
											className="img-responsive"
											width="700"
											height="500"
											src={require('../assets/clip-log-out.png')}
											alt="No Ongoing Exams"
										/>
									</div>

									<div className="alert alert-info no-ongoing-exams w-25">No Ongoing Exams</div>
								</div>
							)}
						</div>
					</Tab>

					<Tab eventKey="myPreviousExams" title="My Previous Exams">
						<br />
						{previousExams.length !== 0 ? (
							<Card className="archived-test-card">
								{previousExams.map((obj, idx) => (
									<div key={idx}>
										{Object.keys(previousExams).length !== 0 ? (
											customModal && (
												<CustomModal
													show={customModal}
													onHide={() => handlecustomModalClose(false)}
													archivedtestobj={archivedObj}
												/>
											)
										) : (
											<div />
										)}
										<Card
											onClick={() => {
												setcustomModal(true);
												setarchivedObj(obj);
											}}
											style={{
												marginLeft: '5%',
												marginRight: '5%'
											}}
										>
											<Card.Header as="h5">TEST ID: {obj.exam_id}</Card.Header>
											<Card.Body>
												<Card.Title>{obj.exam_name}</Card.Title>
												<p style={{ color: '#0A79DF' }}>
													Click here to view more (includes key & your score)
												</p>
											</Card.Body>
										</Card>
										<br />
									</div>
								))}
							</Card>
						) : (
							<div className="text-center">
								<img
									className="img-responsive"
									width="700"
									height="500"
									src={require('../assets/clip-log-out.png')}
									alt=""
								/>

								<div className="alert alert-info no-ongoing-exams w-25">
									You haven't taken any exams yet
								</div>
							</div>
						)}
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}

export default Dashboard;
