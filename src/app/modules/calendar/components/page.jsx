import React from 'react';
import { useLocalStorageReducer } from 'lib';
import { Menu } from 'modules/menu';

import CalendarComponent from './calendar.jsx';
import { CalendarProvider } from '../context.jsx';
import reducer from '../reducer.js';
import getInitialState from '../state.js';
import getCalendar from '../calendar.js';


export default function CalendarPage() {
	const [state, dispatch] = useLocalStorageReducer('ergusto:calendar', reducer, getInitialState());
	const calendar = getCalendar();

	return (
		<div className='page full-height padding-vertical-4 font-family-raleway'>
			<Menu />
			<CalendarProvider calendar={calendar} state={state} dispatch={dispatch}>
				<CalendarComponent />
			</CalendarProvider>
		</div>
	);
}