import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaHome,FaUserCircle, FaSignOutAlt } from "react-icons/fa";
function CustomSideNav({ ...props }) {
	return (
		<SideNav
			style={{ backgroundColor: '#0A79DF' }}
			onSelect={(selected) => {
				alert(selected);
			}}
		>
			<SideNav.Toggle />
			<br />
			<br />
			<br />
			<br />
			<br />
			<SideNav.Nav defaultSelected="dashboard">
				<NavItem eventKey="dashboard">
					<NavIcon>
						<FaHome />
					</NavIcon>
					<NavText>Dashboard</NavText>
				</NavItem>
				<NavItem eventKey="myprofile">
					<NavIcon>
						<FaUserCircle />
					</NavIcon>
					<NavText>My Profile</NavText>
				</NavItem>
				<NavItem eventKey="logout">
					<NavIcon>
						<FaSignOutAlt />
					</NavIcon>
					<NavText>Logout</NavText>
				</NavItem>

				{/* 
				<NavItem eventKey="charts">
					<NavIcon>
						<i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
					</NavIcon>
					<NavText>Charts</NavText>
					<NavItem eventKey="charts/linechart">
						<NavText>Line Chart</NavText>
					</NavItem>
					<NavItem eventKey="charts/barchart">
						<NavText>Bar Chart</NavText>
					</NavItem>
				</NavItem>
				*/}
			</SideNav.Nav>
		</SideNav>
	);
}

export default CustomSideNav;
