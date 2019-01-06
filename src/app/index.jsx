import 'typeface-comfortaa';
import React from 'react';
import viewportBuggyfill from 'viewport-units-buggyfill';

import '../css/site.scss';

viewportBuggyfill.init();

export default class App extends React.Component {

	render() {
		return (
			<div className="full-height background-color-dark-blue justify-centre comfortaa color-white">
				<div className="align-center">
					<h1 className="margin-bottom-medium">ergusto</h1>
					<p>New project coming soon</p>
				</div>
			</div>
		);
	}

}