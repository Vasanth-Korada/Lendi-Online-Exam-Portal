import React from 'react';
import { Card } from 'react-bootstrap';

function ExamCard({ exam }) {
	return (
		<Card
			style={{
				display: 'flex',
				minHeight: '40vh',
				maxHeight: '40vh'
			}}
		>
			<Card.Header as="h5">Exam ID: {exam.exam_id}</Card.Header>
			<div className="text-center">
				<Card.Body>
					<Card.Title>
						<h3>
							<strong>{exam.exam_name}</strong>
						</h3>
					</Card.Title>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th scope="col">Duration</th>
								<th scope="col">Total Questions</th>
								<th scope="col">Total Marks</th>
								<th scope="col">Branch</th>
								<th scope="col">Batch</th>
								<th scope="col">Faculty Name</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{exam.exam_duration} Mins</td>
								<td>{exam.exam_total_questions}</td>
								<td>{exam.exam_marks}</td>
								<td>
									{exam.dept} 
								</td>
								<td>
									{exam.batch} 
								</td>
								<td> {exam.faculty_name}</td>
							</tr>
						</tbody>
					</table>
				</Card.Body>
			</div>
		</Card>
	);
}

export default ExamCard;
