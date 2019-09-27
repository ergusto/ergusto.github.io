import React from 'react';
import { Route, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { useLocalStorageReducer } from 'app/lib';

import MainPanel from './main-panel/main-panel.jsx';

import Create from './create/create.jsx';
import Detail from './detail/detail.jsx';

import reducer from '../state/reducer.js';
import getInitialState from '../state/state.js';
import { ContactsProvider } from '../state/context.jsx';

const RouteContainer = posed.div({
	enter: { opacity: 1, delay: 300, beforeChildren: true },
	exit: { opacity: 0 }
});

export default function Contacts() {
	const [state, dispatch] = useLocalStorageReducer('ergusto:contacts', reducer, getInitialState());

	return (
		<ContactsProvider state={state} dispatch={dispatch}>
			<div className='page font-family-raleway'>
				<MainPanel />			

				<div className='panel-body padding-horizontal'>
					<PoseGroup>
						<RouteContainer key='contact-route-container'>
							<Switch>
								<Route exact path='/contacts/create' component={Create} />
								<Route exact path='/contacts/:slug' component={Detail} />
							</Switch>
						</RouteContainer>
					</PoseGroup>
				</div>
			</div>
		</ContactsProvider>
	);
}