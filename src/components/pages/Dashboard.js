import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import firebase from '../../firebase.js';
class Dashboard extends React.Component {
	username = '';
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			tests: {}
		};
	}

	componentDidMount = async () => {
		this.setState({
			username: this.props.location.username
		});

		await firebase.firestore().collection('tests').get().then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				const data = doc.data();
				console.log(data.questions);
				this.setState({
					tests: data
				});
			});
		});
		console.log(this.state.tests);
	};

	render() {
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
