import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Radio, RadioGroup } from 'react-radio-group';

const QuestionBox = ({ question, options, selected }) => {
	const [ answer, setAnswer ] = useState(options);
	const [ color, setColor ] = useState([ 'tomato', 'tomato', 'tomato', 'tomato' ]);
	return (
		<div className="questionBox">
			<div className="exam-question">{question}</div>

			<RadioGroup key={question}>
				{answer !== undefined ? (
					answer.map((text, index) => (
						<div key={index}>
							<Form.Check
								custom
								type="radio"
								name={question}
								value={text}
								id={text+question}
								label={text}
								onChange={(e) => selected(e.target.value)}
							/>
						</div>
					))
				) : (
					<h2>Loading...</h2>
				)}
			</RadioGroup>
		</div>
	);
};

export default QuestionBox;
