import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Menu } from 'app/modules/menu';

import { Calendar } from 'app/modules/calendar';
import { Comments } from 'app/modules/comments';
import { Contacts } from 'app/modules/contacts';
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
				<Route path='/contacts' component={Contacts} />
				<Route path='/reset' exact component={Reset} />
				<Route component={NotFound} />
			</Switch>
			<Menu />	
		</Router>
	);
};

export default Routes;