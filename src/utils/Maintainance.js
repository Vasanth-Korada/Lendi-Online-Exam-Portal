import React from 'react';
import './utilStyles.css';

function Maintainance() {
	return (
        
		<div className="maintain-flex">
			<p className="maintain-text">We are now serving angels. We will be back to serve humans shortly.</p>
			<img className="maintain-img" src={require('../assets/clip-come-back-later.png')} alt="Come Back Later" />
		</div>
	);
}

export default Maintainance;
