import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Result = (props) => {
	useEffect(() => {
		// var elem = document.documentElement;

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
		<div className="col">
			<div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="score">
					<h6>
						<i>We are as fast as you and so here is your result </i>
					</h6>
					<b>Your Result!</b>
					<br />
					<b>
						Marks: {props.location.state.score} / {props.location.state.exam_total_questions}
					</b>
				</div>
			</div>
			<br />
			<div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 result-stats">
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
			<div className="text-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<img style={{ width: '30%' }} src={require('../../assets/done-5.png')} alt="result-img" />
			</div>
			<div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 alert alert-primary text-center credits-box">
				Developed with ❤ by Vasanth Korada
			</div>
			<Link className="home-link" to="/">
				Go to Home
			</Link>
		</div>
	);
};

export default Result;
