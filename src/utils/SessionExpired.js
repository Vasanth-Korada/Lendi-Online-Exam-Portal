import React from 'react';
import { Link } from 'react-router-dom';

class SessionExpired extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<h1 style={{ color: 'white' }}>Session Expired, Please Login Again</h1>
				<Link to="/">Login Again</Link>
			</div>
		);
	}
}

export default SessionExpired;
