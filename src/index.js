import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './utils/NotFound';
import Dashboard from './components/pages/Dashboard';
ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={App} />
			<Route exact path="/notfound" component={NotFound} />
			<Route exact path="/dashboard" component={Dashboard} />
		</Switch>
	</Router>,
	document.getElementById('root')
);
