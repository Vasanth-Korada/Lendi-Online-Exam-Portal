import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

const Result = (props) => {
	useEffect(() => {
		var elem = document.documentElement;

		if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		}
	});
	return (
		<div>
			<div style={{ marginTop: '-10%' }} className="score">
				<h6>
					<i>We are as fast as you and so here is your result </i>
				</h6>
				<b>Your Result!</b>
				<br />
				<b>
					Marks: {props.location.state.score} / {props.location.state.exam_total_questions}
				</b>
			</div>

			<div className="result-image">
				<img style={{ width: '35rem', height: '40rem' }} src={require('../../assets/clip-1.png')} alt="" />
			</div>
			<div className="result-stats">
				<Table striped bordered hover size="sm" responsive>
					<thead>
						<tr>
							<th>EXAM ID</th>
							<th>EXAM NAME</th>
							<th>REGD NO</th>
							<th>MARKS SCORED</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{props.location.state.examId}</td>
							<td>{props.location.state.examName}</td>
							<td>{props.location.state.userObj.regd_no}</td>
							<td>{props.location.state.score}</td>
						</tr>
					</tbody>
				</Table>
			</div>
			<div className="credits-box">
				<h6>Developed with ❤ by Vasanth Korada | Srikanth Mudili</h6>
			</div>
		</div>
	);
};

export default Result;
