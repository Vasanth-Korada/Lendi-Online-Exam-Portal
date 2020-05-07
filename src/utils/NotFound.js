import React from 'react';
import {Route} from 'react-router-dom';

const NotFound = () => {
    return (
        <Route path="/notfound">
        <div>
            <h1>PageNotFound</h1>
        </div>
        </Route>
        
    );
};

export default NotFound;