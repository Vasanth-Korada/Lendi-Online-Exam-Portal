import React, { useState } from 'react';
import './../AdminDashboard.css';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import firebase from './../../../firebase';
import { Form } from 'react-bootstrap';

const StudentDetailsUpload = () => {
	const [ branch, setBranch ] = useState('CSE');
	const [ batch, setBatch ] = useState('');
	const onDrop = (files) => {
		var file = files[0];
		const reader = new FileReader();
		console.log('hello');
		console.log(branch);
		console.log(batch);
		reader.onload = async () => {
			var dRef = await firebase.firestore().collection(branch).doc(batch);
			csv.parse(reader.result, async (err, data) => {
				for (var i = 1; i < data.length; i++) {
					var cRef = await dRef.collection('data').doc(data[i][0]);
					cRef.set({
						regd_no: data[i][0],
						name: data[i][1],
						phno: data[i][2],
						email: data[i][3],
						tenth_percentage: data[i][4],
						inter_percentage: data[i][5],
						btech_avg: data[i][6],
						branch: data[i][7],
						password: '1234'
					});
				}
			});
		};
		reader.readAsBinaryString(file);
	};
	return (
		<div className="admin">
			<div className="std-data-upload-form">
				<Form.Group>
					<Form.Label>Enter Exam ID</Form.Label>
					<Form.Control
						className="exam-id-text-field"
						placeholder="EG: 2021"
						name="batch"
						id="batch"
						type="text"
						value={batch}
						onChange={(e) => {
							setBatch(e.target.value);
						}}
						required
					/>
				</Form.Group>
				<div className="dropdown" style={{ marginLeft: '5%', marginTop: '1%' }}>
					<select
						className="btn btn-primary dropdown-toggle"
						value={branch}
						onChange={(e) => setBranch(e.target.value)}
						required
					>
						<option>Select Branch</option>
						<option value="CSE">CSE</option>
						<option value="ECE">ECE</option>
						<option value="MECH">MECH</option>
						<option value="EEE">EEE</option>
					</select>
				</div>
			</div>

			<div className="DropZone">
				<Dropzone unselectable="on" accept=".csv" className="DropZone" onDrop={onDrop}>
					{({ getRootProps, getInputProps, isDragActive }) => (
						<div className="Drop" {...getRootProps()}>
							<input {...getInputProps()} />
							{isDragActive ? 'Drop it here Carefully!' : 'Click me or Drag a CSV file to upload!'}
						</div>
					)}
				</Dropzone>
			</div>
		</div>
	);
};

export default StudentDetailsUpload;
