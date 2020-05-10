import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
	return (
		<div style={{ textAlign: 'center' }}>
			<Spinner animation="grow" role="status" variant="success">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
}

export default Loader;
