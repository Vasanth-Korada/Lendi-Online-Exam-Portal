import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import qBank from './quizService.js';
import QuestionBox from './QuestionBox';

function ExamPage(props) {
	const [ questions, setQuestions ] = useState([]);
	useEffect(
		() => {
			setTimeout(async () => {
				await qBank(
					props.location.state.currentExam.exam_total_questions,
					props.location.state.currentExam.exam_id
				).then((data) => {
					data.map((item) => setQuestions((questions) => [ ...questions, data ]));
				});
			}, 5);
		},
		[]
	);
	return (
		<div>
			<div className="custom">
				<div className="title">
					(Exam ID: {props.location.state.currentExam.exam_id})
					<div style={{ float: 'right' }}>
						<h5>Duration:{props.location.state.currentExam.exam_duration}</h5>
						<h5>Questions:{props.location.state.currentExam.exam_total_questions}</h5>
						<h5>Marks:{props.location.state.currentExam.exam_marks}</h5>
					</div>
					<div style={{ verticalAlign: 'middle' }}>{props.location.state.currentExam.exam_name}</div>
				</div>
				<div>
					{questions.map((item, idx) => {
						return item.map((ques, idx) => {
							return ques.map((obj, i) => {
								console.log(obj);
								return (
									<QuestionBox key={obj.question_id} question={obj.question} options={obj.options} />
								);
							});
						});
					})}
				</div>
			</div>
		</div>
	);
}

export default ExamPage;
