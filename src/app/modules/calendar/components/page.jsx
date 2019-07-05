import React, { useState } from 'react';
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

	const currentMonth = calendar.getMonth();
	const [month, setCurrentMonth] = useState(currentMonth);

	const setNextMonth = () => setCurrentMonth(month.getNextMonth());
	const setPreviousMonth = () => setCurrentMonth(month.getPreviousMonth());

	return (
		<div className='page full-height padding-vertical-3 justify-centre font-family-raleway'>
			<Menu />
			<CalendarProvider calendar={calendar} month={month} setPreviousMonth={setPreviousMonth} setNextMonth={setNextMonth} state={state} dispatch={dispatch}>
				<CalendarComponent />
			</CalendarProvider>
		</div>
	);
}