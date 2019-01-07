import 'typeface-comfortaa';
import React from 'react';
import viewportBuggyfill from 'viewport-units-buggyfill';
import Introduction from './modules/introduction/index.jsx';

import '../css/site.scss';

viewportBuggyfill.init();

export default class App extends React.Component {

	render() {
		return (
			<Introduction />
		);
	}

}