import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Menu } from 'modules/menu';
import { Comments } from 'modules/comments';
import { Calendar } from 'modules/calendar';
import { Introduction } from 'modules/introduction';
import NotFound from 'not-found.jsx';

const Routes = () => (
	<Router>
		<Menu />
		<Switch>
			<Route path='/' exact component={Introduction} />
			<Route path='/calendar' exact component={Calendar} />
			<Route path='/comments' exact component={Comments} />
			<Route component={NotFound} />
		</Switch>
	</Router>
);

export default Routes;