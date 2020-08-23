import React from 'react';
import './App.css';
import Login from './components/Auth/Login';
import { Link } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';

const App = () => {
	return (
		<div className="container">
			<div className="text-white header">
				<div className="brand-logo">
					<a className="navbar-brand" href="/">
						<img
							src={require('./assets/lendi_logo_p.png')}
							width="85"
							height="75"
							className="d-inline-block align-top"
							alt=""
						/>
					</a>
					<div className="text-white">Lendi Online Exam Portal</div>
				</div>
				<Link to="/adminLogin">
						<RiAdminLine color="white" title="ADMIN" size={40} />
					</Link>
			</div>
			<div className="row student-login-card">
				<div className="col-12 card">
					<div className="card-body">
						<h5 className="card-title text-center student-login">STUDENT LOGIN</h5>
						<br />
						<div>
							<Login />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default App;
