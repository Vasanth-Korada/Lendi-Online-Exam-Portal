import React from 'react';
import { Card } from 'react-bootstrap';

function ExamCard({ exam }) {
	return (
		<Card
			style={{
				display: 'flex',
				minHeight: '40vh',
				maxHeight: '40vh',
			}}
		>
			<Card.Header as="h5">Exam ID: {exam.exam_id}</Card.Header>
			<Card.Body>
				<Card.Title>
					<b>{exam.exam_name}</b>
				</Card.Title>
				<Card.Text>Total Questions: {exam.exam_total_questions}</Card.Text>
				<Card.Text>Duration: {exam.exam_duration} Mins</Card.Text>
				<Card.Text>Marks: {exam.exam_marks}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default ExamCard;
