import React, { useState } from 'react';
import './../AdminDashboard.css';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import firebase from './../../../firebase';

const StudentDetailsUpload = () => {
	const [ branch, setBranch ] = useState('CSE');
	const onDrop = (files) => {
		var file = files[0];
		const reader = new FileReader();
		console.log('hello');
		reader.onload = () => {
			csv.parse(reader.result, async (err, data) => {
				for (var i = 1; i < data.length; i++) {
					var ref = await firebase.firestore().collection(branch).doc(data[i][0]);
					ref.set({
						section: data[i][1],
						name: data[i][2],
						password: data[i][3],
						phno: data[i][4],
						email: data[i][5]
					});
				}
			});
		};
		reader.readAsBinaryString(file);
	};
	return (
		<div className="admin">
			<div className="dropdown" style={{ marginLeft: '5%' }}>
				<select
					className="btn btn-primary dropdown-toggle"
					value={branch}
					onChange={(e) => setBranch(e.target.value)}
					required
				>
					<option>Select Branch</option>
					<option value="CSE">CSE</option>
					<option value="ECE">ECE</option>
					<option value="ME">ME</option>
					<option value="EEE">EEE</option>
				</select>
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
