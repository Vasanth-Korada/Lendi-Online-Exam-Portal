import React from 'react';

const Result = (props) => (
	<div className="score-board">
		<div style={{color:"white"}} className="score">
			You scored {props.location.state.score} / {props.location.state.exam_total_questions} correct answers!
		</div>
	</div>
);

export default Result;
