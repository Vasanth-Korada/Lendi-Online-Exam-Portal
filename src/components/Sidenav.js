import React from 'react';
import { Sidenav, Nav, Icon } from 'rsuite';

const styles = {
	width: 250,
	display: 'inline-table',
	marginRight: 10
};

function SideNav({ ...props }) {
	return (
		<div style={styles}>
			<Sidenav {...props} defaultOpenKeys={[ '3', '4' ]}>
				<Sidenav.Body>
					<Nav>
						<Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>
							Dashboard
						</Nav.Item>
						<Nav.Item eventKey="2" icon={<Icon icon="group" />}>
							User Group
						</Nav.Item>
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</div>
	);
}

export default SideNav;
