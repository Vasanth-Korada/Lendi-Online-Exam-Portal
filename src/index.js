import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Router, browserHistory } from '@version/react-router-v3';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './utils/NotFound';
ReactDOM.render(
	<Router history={browserHistory}>
		<Route exact path="/" component={App} />
		<Route exact path="/notfound" component={NotFound} />
	</Router>,
	document.getElementById('root')
);
