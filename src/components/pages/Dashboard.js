import React from 'react';
import { withRouter } from 'react-router-dom';
class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return <h1 style={{ color: 'white' }}>Welcome {this.props.location.username}</h1>;
	}
}

export default withRouter(Dashboard);
