import React, { useState, useEffect } from 'react';

const QuestionBox = ({ question, options }) => {
  const [ answer, setAnswer ] = useState(options);
	return (
    
		<div className="questionBox">
			<div className="question">{question}</div>
			{answer !== undefined ? (
				answer.map((text, index) => (
					<button
						key={index}
						className="answerBtn"
						onClick={() => {
							setAnswer([ text ]);
							// selected(text);
						}}
					>
						{text}
					</button>
				))
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	);
};

export default QuestionBox;
