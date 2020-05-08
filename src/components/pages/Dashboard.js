import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
class Dashboard extends React.Component {
	username = '';
	constructor(props) {
		super(props);

		this.state = {
			username: ''
		};
	}

	componentDidMount() {
		this.setState({
			username: this.props.location.username
		});
	}

	render() {
		// if (this.state.username === undefined) {
		// 	this.props.history.push('/sessionexpired');
		// }
		return (
			<div>
				<Navbar expand="lg" variant="dark" bg="success">
					<Container>
						<Navbar.Brand href="#" className="navbar-logo">
							<h2>Dashboard</h2>
						</Navbar.Brand>
						<h4 style={{ color: 'white', float: 'right', padding: '15px' }}>
							Welcome Mr. {this.state.username}
						</h4>
						<Button style={{ float: 'right' }} type="submit" variant="light">
							LOGOUT
						</Button>
					</Container>
				</Navbar>
				<h2 style={{ color: 'white', float: 'left', marginTop: '2%', marginLeft: '2%' }}> Ongoing Tests </h2>
			</div>
		);
	}
}

export default withRouter(Dashboard);
