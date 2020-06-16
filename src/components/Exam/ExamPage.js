import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './style.css';
import qBank from './quizService.js';
import QuestionBox from './QuestionBox';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase';
import { useBeforeunload } from 'react-beforeunload';
import Timer from 'react-compound-timer';
import PropagateLoader from 'react-spinners/PropagateLoader';

function ExamPage(props) {
	const [ loading, setloading ] = useState(false);
	const [ currentExam, setcurrentExam ] = useState({});
	const [ questions, setQuestions ] = useState([]);
	const [ responses, setResponses ] = useState(0);
	const [ toResult, setToResult ] = useState(false);
	const correctAnswers = useRef({});
	const userAnswers = useRef({});
	const score = useRef(0);
	const [ examDurationMins, setexamDurationMins ] = useState(0);
	const [ examover, setexamover ] = useState(false);
	const [ userObj, setuserObj ] = useState({});
	useBeforeunload(() => console.log('Warning'));

	useEffect(
		() => {
			document.addEventListener('contextmenu', (event) => event.preventDefault());
			var elem = document.documentElement;
			if (elem.mozRequestFullScreen) {
				/* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				/* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				/* IE/Edge */
				elem.msRequestFullscreen();
			}
			if (Object.keys(currentExam).length !== 0) {
				setexamDurationMins(currentExam.exam_duration);
			}
			setcurrentExam(props.location.state.currentExam);
			setuserObj(props.location.state.userObj);
			async function fetchqBank() {
				console.log('Current Exam', currentExam);
				if (Object.keys(currentExam).length > 0) {
					await qBank(currentExam.exam_total_questions, currentExam.exam_id).then((data) => {
						data.map((item) => setQuestions((questions) => [ ...questions, data ]));
					});
				}
			}
			fetchqBank();
			return () => {
				setQuestions([]);
			};
		},
		[ props.location.state.currentExam, currentExam, examover, props.location.state.userObj ]
	);
	const computeAnswer = (choosenAnswer, correctAnswer, question) => {
		userAnswers.current[question] = choosenAnswer;
		console.log('User Answers:', userAnswers.current);
		// console.log('Correct Answers:', correctAnswers);
		console.log('User Chosen Answer', choosenAnswer);
		setResponses(responses < currentExam.exam_total_questions ? responses + 1 : currentExam.exam_total_questions);
	};
	const handleSubmit = async () => {
		setloading(true);
		console.log('User Answers:', userAnswers.current);
		Object.entries(userAnswers.current).forEach((entry) => {
			const userEntry = entry;
			console.log(userEntry);
			Object.entries(correctAnswers.current).forEach((entry1) => {
				const correctEntry = entry1;
				if (userEntry[0] === correctEntry[0]) {
					console.log('Questions Matched');
					if (userEntry[1] === correctEntry[1]) {
						console.log('Answers Matched');
						score.current++;
					}
				}
			});
		});
		setTimeout(async () => {
			console.log(score.current);
			var ref = await firebase
				.firestore()
				.collection('tests')
				.doc(currentExam.exam_id)
				.collection('participants')
				.doc(props.location.state.username);
			await ref
				.set({
					isSubmitted: true,
					isAttempted: true,
					name: userObj.name,
					regd_no: userObj.regd_no,
					branch: userObj.branch,
					marks_gained: score.current,
					submit_time: firebase.firestore.FieldValue.serverTimestamp()
				})
				.then(() => {
					setloading(false);
					setToResult(true);
					console.log('Score:', score.current);
				});
		}, 100);
	};
	const examOver = () => {
		console.log('Exam Over');
		setexamover(true);
	};

	if (toResult) {
		return (
			<Redirect
				to={{
					pathname: '/resultPage',
					state: {
						score: score.current,
						responses: responses,
						exam_total_questions: currentExam.exam_total_questions,
						examId: currentExam.exam_id,
						examName: currentExam.exam_name,
						userObj: userObj
					}
				}}
			/>
		);
	}
	return examover === false ? (
		<div>
			<div className="custom">
				<div />
				<div className="exam-timer-box">
					<h3>
						🕐
						<b style={{ float: 'right' }}>
							{examDurationMins !== 0 ? (
								<Timer
									initialTime={1000 * 60 * examDurationMins}
									direction="backward"
									checkpoints={[
										{
											time: 0,
											callback: () => examOver()
										}
									]}
								>
									{() => (
										<React.Fragment>
											Ends in:
											{/*<Timer.Hours /> hours:*/}
											<Timer.Minutes /> minutes:
											<Timer.Seconds /> seconds
										</React.Fragment>
									)}
								</Timer>
							) : (
								<div>Loading ...</div>
							)}
						</b>
					</h3>
				</div>

				<div className="exam-title-box">
					(Exam ID: {currentExam.exam_id})
					<div style={{ float: 'right' }}>
						<h6>REGD NO: {props.location.state.username}</h6>
						<h6>Duration : {currentExam.exam_duration} Minutes</h6>
						<h6>Questions: {currentExam.exam_total_questions}</h6>
						<h6>Marks: {currentExam.exam_marks}</h6>
					</div>
					<div style={{ verticalAlign: 'middle', textTransform:"uppercase" }}>{currentExam.exam_name}</div>
				</div>
				<div style={{ color: 'white' }} />
				<div>
					{questions.map((item, idx) => {
						return item.map((ques, idx) => {
							return ques.map((obj, i) => {
								correctAnswers.current[obj.question] = obj.correct_answer;
								// console.log(correctAnswers);
								return (
									<QuestionBox
										key={i}
										question={obj.question}
										options={obj.options}
										selected={(answer) => {
											computeAnswer(answer, obj.correct_answer, obj.question);
										}}
									/>
								);
							});
						});
					})}
				</div>
				<div style={{ marginLeft: '50%', padding: '20px' }}>
					<PropagateLoader size={20} loading={loading} color="white" />
				</div>
				<div style={{ float: 'right', padding: '20px' }} className="mb-2">
					<Button
						style={{
							float: 'right',
							width: '100%',
							color: 'white',
							backgroundColor: '#0A79DF'
						}}
						type="submit"
						variant="outline"
						size="lg"
						onClick={handleSubmit}
					>
						SUBMIT
					</Button>
				</div>
			</div>
		</div>
	) : (
		<div
			style={{
				marginTop: '3%',
				marginLeft: '20%',
				marginRight: '20%',
				textAlign: 'center'
			}}
		>
			<h3>
				<b>Time is up!</b>
			</h3>
			<br />
			<div className="timeup-image">
				<img
					style={{ width: '45rem', height: '30rem', marginTop: '1%' }}
					src={require('../../assets/clip-log-out.png')}
					alt=""
				/>
			</div>

			<h3>Click on Submit to view your result!</h3>
			<br />
			<h6>⚠ If you don't click on 'Submit' your exam and score will not be recorded!</h6>
			<br />
			<Button
				style={{
					width: '60%',
					color: 'white',
					backgroundColor: '#0A79DF'
				}}
				type="submit"
				variant="outline"
				size="lg"
				onClick={handleSubmit}
			>
				SUBMIT
			</Button>
		</div>
	);
}

export default ExamPage;
