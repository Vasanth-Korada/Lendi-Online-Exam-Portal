import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={App}/>
  </BrowserRouter>,
  document.getElementById('root')
);

