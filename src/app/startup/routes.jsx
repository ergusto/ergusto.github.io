import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Calendar } from 'app/modules/calendar';
import { Comments } from 'app/modules/comments';
import { Introduction } from 'app/modules/introduction';
import NotFound from '../not-found.jsx';
import Reset from '../reset.jsx';

const Routes = () => {

	useEffect(() => {
		document.body.classList.add('background-color-light-grey');
	}, []);

	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Introduction} />
				<Route path='/calendar' exact component={Calendar} />
				<Route path='/comments' exact component={Comments} />
				<Route path='/reset' exact component={Reset} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
};

export default Routes;