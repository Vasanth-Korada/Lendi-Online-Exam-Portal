import React from 'react';
import { Form } from 'react-bootstrap';
import { RadioGroup } from 'react-radio-group';

const QuestionBox = ({ question, options, selected }) => {
	const answer = options;
	return (
		<div className="questionBox">
			<div className="exam-question">{question}</div>

			<RadioGroup key={question}>
				{answer !== undefined ? (
					answer.map(
						(text, index) =>
						
							text !== '' && (
								<div key={index}>
									<Form.Check
										custom
										type="radio"
										name={question}
										value={text}
										id={text + question}
										label={text}
										onChange={(e) => selected(e.target.value)}
									/>
								</div>
							)
					)
				) : (
					<h2>Loading...</h2>
				)}
			</RadioGroup>
		</div>
	);
};

export default QuestionBox;
