import React, { useState } from 'react';
import { useLocalStorageReducer } from 'app/lib';

import CalendarComponent from '../calendar/calendar.jsx';
import { CalendarProvider } from '../../state/context.jsx';
import reducer from '../../state/reducer.js';
import getInitialState from '../../state/state.js';
import getCalendar from '../../lib/calendar.js';

export default function CalendarPage() {
	const [state, dispatch] = useLocalStorageReducer('ergusto:calendar', reducer, getInitialState());
	const calendar = getCalendar();

	const currentMonth = calendar.getMonth();
	const [month, setCurrentMonth] = useState(currentMonth);

	const setNextMonth = () => setCurrentMonth(month.getNextMonth());
	const setPreviousMonth = () => setCurrentMonth(month.getPreviousMonth());

	return (
		<div className='page full-height padding-top-4 padding-bottom-3 padding-horizontal justify-centre font-family-raleway'>
			<CalendarProvider calendar={calendar} month={month} setPreviousMonth={setPreviousMonth} setNextMonth={setNextMonth} state={state} dispatch={dispatch}>
				<CalendarComponent />
			</CalendarProvider>
		</div>
	);
}