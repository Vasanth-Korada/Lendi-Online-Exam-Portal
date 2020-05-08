import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SessionExpired from './utils/SessionExpired.js';
import Dashboard from './components/pages/Dashboard';
ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={App} />
			<Route exact path="/sessionexpired" component={SessionExpired} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="*" component={SessionExpired}/>
		</Switch>
	</Router>,
	document.getElementById('root')
);
