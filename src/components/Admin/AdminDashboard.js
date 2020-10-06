import React from 'react';
import { AdminLoginBranchContext } from './AdminLoginBranchContext';
import NavBar from '../NavBar';
import { Tabs, Tab } from 'react-bootstrap';
import './AdminDashboard.css';
import ResultDashboard from './AdminDashboardComponents/ResultDashboard';
import ExamDashboard from './AdminDashboardComponents/ExamDashboard';
import StudentDetailsUpload from './AdminDashboardComponents/StudentDetailsUpload';
import StudentExamStatus from './AdminDashboardComponents/StudentExamStatus';
import ExamStatus from './AdminDashboardComponents/ExamStatus';

const AdminDashboard = (props) => {
	return (
		<AdminLoginBranchContext.Provider value={props.location.state.branch}>
			<div>
				<NavBar title="Welcome Admin" />
				<br />
				<Tabs defaultActiveKey="createExam" id="uncontrolled-tab-example">
					<Tab eventKey="createExam" title="Exam Dashboard">
						<ExamDashboard />
					</Tab>
					<Tab eventKey="Results" title="Result Dashboard">
						<ResultDashboard />
					</Tab>
					<Tab eventKey="examStatus" title="Exam Status">
						<ExamStatus />
					</Tab>
					<Tab eventKey="studentExamStatus" title="Student's Exam Status">
						<StudentExamStatus />
					</Tab>
					{props.location.state.branch === 'superAdmin' && (
						<Tab eventKey="StudentDataUpload" title="Student Data Upload">
							<StudentDetailsUpload />
						</Tab>
					)}
				</Tabs>
			</div>
		</AdminLoginBranchContext.Provider>
	);
};

export default AdminDashboard;
