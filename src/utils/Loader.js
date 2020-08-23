import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

function Loader() {
	return (
		<div style={{ textAlign: 'center', marginLeft: '50%', marginTop: '100px' }}>
			<HashLoader size={50} color="#0A79DF" />
		</div>
	);
}

export default Loader;
