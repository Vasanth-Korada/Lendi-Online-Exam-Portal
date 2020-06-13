import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { Card, Form, Button, Tabs, Tab, Table, Col, Row } from 'react-bootstrap';
import './AdminDashboard.css';
import ResultDashboard from './AdminDashboardComponents/ResultDashboard'
import ExamDashboard from './AdminDashboardComponents/ExamDashboard'
import StudentDetailsUpload from './AdminDashboardComponents/StudentDetailsUpload';

const AdminDashboard = () => {
	
	return (
		<div>
			<NavBar title="Welcome Admin" />
			<br />
			<Tabs defaultActiveKey="createExam" id="uncontrolled-tab-example">
				<Tab eventKey="createExam" title="Exam Dashboard">
					<ExamDashboard/>
				</Tab>
				<Tab eventKey="Results" title="Result Dashboard">
					<ResultDashboard />
				</Tab>
				<Tab eventKey="StudentDataUpload" title="Student Details Upload">
					<StudentDetailsUpload/>
				</Tab>
			</Tabs>
		</div>
	);
};

export default AdminDashboard;
