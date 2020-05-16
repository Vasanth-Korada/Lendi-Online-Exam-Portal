import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SessionExpired from './utils/SessionExpired.js';
import Dashboard from './pages/Dashboard';
import ExamPage from './components/Exam/ExamPage';
import Result from './components/Exam/Result';
import AdminLogin from './components/Admin/AdminLogin';
import Questions from './components/Admin/Question';
import QuestionXLS from './components/Admin/QuestionXLS';
import AdminDashboard from './components/Admin/AdminDashboard';
ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={App} />
			<Route exact path="/sessionexpired" component={SessionExpired} />
			<Route exact path="/dashboard" render={(props) => <Dashboard {...props} />} />
			<Route exact path="/examPage" render={(props) => <ExamPage {...props} />} />
			<Route exact path="/resultPage" render={(props) => <Result {...props} />} />
			<Route exact path="/" component={App} />
			<Route exact path="/logout" component={App} />

			<Route exact path="/adminLogin" component={AdminLogin} />
			<Route exact path="/question" component={Questions} />
			<Route exact path="/csv-upload" component={QuestionXLS} />
			<Route exact path="/adminDashboard" component={AdminDashboard}/>

			<Route exact path="*" component={SessionExpired} />
		</Switch>
	</Router>,
	document.getElementById('root')
);
