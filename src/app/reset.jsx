import React from 'react';
import { Redirect } from 'react-router';

const reset = () => {
	localStorage.clear();
	return <Redirect to='/' />;
};

export default reset;
