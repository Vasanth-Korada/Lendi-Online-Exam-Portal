import React from 'react';

const Result = (props) => (
	<div className="score-board">
		<div style={{ marginTop: '-10%' }} className="score">
			<h1>Whola!</h1>
			<b>Your Result!</b>
			<br />
			<b>
				Marks: {props.location.state.score} / {props.location.state.exam_total_questions}
			</b>
		</div>

		<div className="result-image">
			<img
				style={{ width: '45rem', height: '30rem', marginTop: '1%' }}
				src={require('../../assets/clip-1.png')}
				alt=""
			/>
		</div>
		<div className="credits-box">
			<h6>Developed with ❤ by Vasanth Korada | Srikanth Mudili</h6>
		</div>
	</div>
);

export default Result;
