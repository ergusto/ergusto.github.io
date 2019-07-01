import React, { createContext } from 'react';

const CalendarContext = createContext(null);

function CalendarProvider(props) {
	const { calendar, state, dispatch } = props;

	return (
		<CalendarContext.Provider value={{ calendar, state, dispatch }}>
			{props.children}
		</CalendarContext.Provider>
	);
}

export { CalendarContext, CalendarProvider };
