import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import './style.css';
import qBank from './quizService.js';
import QuestionBox from './QuestionBox';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase';
import { useBeforeunload } from 'react-beforeunload';
import { UserContext } from '../../context/userContext';
function ExamPage(props) {
	const [ currentExam, setcurrentExam ] = useState({});
	const [ questions, setQuestions ] = useState([]);
	const [ responses, setResponses ] = useState(0);
	const [ toResult, setToResult ] = useState(false);
	const providerUsername = useContext(UserContext)
	const correctAnswers = {};
	const userAnswers = useRef({});
	const score = useRef(0);
	useBeforeunload(() => console.log('Warning'));
	useEffect(
		() => {
			setcurrentExam(props.location.state.currentExam);
			async function fetchqBank() {
				console.log('Current Exam', currentExam);
				if (Object.keys(currentExam).length > 0) {
					await qBank(currentExam.exam_total_questions, currentExam.exam_id).then((data) => {
						data.map((item) => setQuestions((questions) => [ ...questions, data ]));
					});
				}
			}
			fetchqBank();
		},
		[ props.location.state.currentExam, currentExam ]
	);
	const computeAnswer = (choosenAnswer, correctAnswer, question) => {
		userAnswers.current[question] = choosenAnswer;
		console.log('User Answers:', userAnswers.current);
		// console.log('Correct Answers:', correctAnswers);
		console.log('User Chosen Answer', choosenAnswer);
		setResponses(responses < currentExam.exam_total_questions ? responses + 1 : currentExam.exam_total_questions);
	};
	const handleSubmit = async () => {
		await Object.entries(userAnswers.current).forEach((entry) => {
			const userEntry = entry;
			console.log(userEntry);
			Object.entries(correctAnswers).forEach((entry1) => {
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
		console.log(score.current);
		var ref = await firebase
			.firestore()
			.collection('loginData')
			.doc(props.location.state.username)
			.collection('tests')
			.doc(currentExam.exam_id);
		await ref.set({
			isSubmitted: true,
			isAttempted: true,
			marks: score.current
		});

		// setToResult(true);
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
						cuurentExam: currentExam
					}
				}}
			/>
		);
	}
	return (
					<div>
						currentExam === undefined ?<div />:<div className="custom">
							<div className="title">
								(Exam ID: {currentExam.exam_id})
								<div style={{ float: 'right' }}>
									<h6>REGD NO: {props.location.state.username}</h6>
									<h6>Duration : {currentExam.exam_duration}</h6>
									<h6>Questions: {currentExam.exam_total_questions}</h6>
									<h6>Marks: {currentExam.exam_marks}</h6>
								</div>
								<div style={{ verticalAlign: 'middle' }}>{currentExam.exam_name}</div>
							</div>
							<div style={{ color: 'white' }} />
							<div>
								{questions.map((item, idx) => {
									return item.map((ques, idx) => {
										return ques.map((obj, i) => {
											correctAnswers[obj.question] = obj.correct_answer;
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
							<div style={{ float: 'right', padding: '20px' }} className="mb-2">
								<Button onClick={handleSubmit} variant="primary" size="lg">
									Submit
								</Button>
							</div>
						</div>
					</div>
				);
}

export default ExamPage;
