import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NotFound from './NotFound';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <Router>
    <Route exact path="/" component={App}/>
    <Route exact path="/error" component={NotFound}/>
  </Router>,
  document.getElementById('root')
);

