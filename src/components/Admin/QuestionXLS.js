import React, { Component, useState, useEffect, useRef } from 'react';
import csv from 'csv';
import Dropzone from 'react-dropzone';
import firebase from '../../firebase';
import NavBar from '../NavBar';
import { Table, Button, Row, Col } from 'react-bootstrap'
import './QuestionXLS.css'
import HashLoader from 'react-spinners/HashLoader';
import { Form } from 'formik';


const QuestionXLS = (props) => {
	const [loading, setLoading] = useState(false);
	const [flag, setFlag] = useState(false);
	const questions_xls = useRef([]);
	console.log(questions_xls.current);

	const onDrop = (files) => {
		questions_xls.current = []
		setLoading(true)
		var file = files[0];
		const reader = new FileReader();
		reader.onload = () => {
			csv.parse(reader.result, (err, data) => {
				for (var i = 1; i < data.length; i++) {
					const question = data[i][0];
					const option1 = data[i][1];
					const option2 = data[i][2];
					const option3 = data[i][3];
					const option4 = data[i][4];
					const correct_answer = data[i][5];
					const allocated_marks = data[i][6];
					const newQuestion = {
						question: question,
						options: [option1, option2, option3, option4],
						correct_answer: correct_answer,
						allocated_marks: allocated_marks
					};
					questions_xls.current.push(newQuestion);
				}
			});

		};
		setTimeout(async () => {
			console.log(questions_xls.current);
			setLoading(false)
			setFlag(true)
		}, 3000);

		reader.readAsBinaryString(file);



	};
	const postData = async () => {
		setLoading(true)
		var ref = await firebase.firestore().collection('tests').doc(props.location.state.examDetails.exam_id);
		ref
			.update({
				questions: questions_xls.current
			})
			.then(() => {
				setLoading(false)
				alert('Questions Uploaded Successfully!');
			});

	}
	if (loading) {
		return (
			<div style={{ marginLeft: '45%', marginTop: '20%' }}>
				<HashLoader size={50} color="#0A79DF" />
			</div>
		);
	}

	return (
		<div>
			<NavBar title="Admin Area" />
			{
				flag ? (
					<div class="Table">
						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>#</th>
									<th>Question</th>
									<th>Option1</th>
									<th>Option2</th>
									<th>Option3</th>
									<th>Option4</th>
									<th>Correct Answer</th>
									<th>Allocated Marks</th>
								</tr>
							</thead>
							<tbody>
								{
									questions_xls.current.map(
										(obj, index) =>
											<tr>
												<td>{index + 1}</td>
												<td>{obj.question}</td>
												<td>{obj.options[0]}</td>
												<td>{obj.options[1]}</td>
												<td>{obj.options[2]}</td>
												<td>{obj.options[3]}</td>
												<td>{obj.correct_answer}</td>
												<td>{obj.allocated_marks}</td>
											</tr>,
										console.log(questions_xls.current)

									)
								}
							</tbody>
						</Table>
						<br />
						
						<Button onClick={postData}>Post Questions</Button>
						
						<Button onClick={() => setFlag(false)}>RE-Upload</Button>

					</div>
				) : (
						<div className="DropZone">
							<Dropzone unselectable="on" className="DropZone" onDrop={onDrop}>
								{({ getRootProps, getInputProps, isDragActive }) => (
									<div className="Drop" {...getRootProps()}>
										<input {...getInputProps()} />
										{isDragActive ? "Drop it here Carefully!" : 'Click me or Drag a CSV file to upload!'}
									</div>
								)}
							</Dropzone>
						</div>
					)
			}
		</div>
	);
};

export default QuestionXLS;
