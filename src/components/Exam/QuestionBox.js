import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Radio, RadioGroup } from 'react-radio-group';

const QuestionBox = ({ question, options, selected }) => {
	const [ answer, setAnswer ] = useState(options);
	const [ color, setColor ] = useState([ 'tomato', 'tomato', 'tomato', 'tomato' ]);
	return (
		<div className="questionBox">
			<div className="question">{question}</div>
			<RadioGroup key={question}>
				{answer !== undefined ? (
					answer.map((text, index) => (
						<div key={index}>
							<input 
							type="radio" 
							id={text} 
							name={question} 
							value={text}
							onChange={(e)=>selected(e.target.value)} 							
							/>
							<label htmlFor={text}>{text}</label>
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
