import React, { createContext } from 'react';

const CalendarContext = createContext(null);

function CalendarProvider(props) {
	return (
		<CalendarContext.Provider value={props}>
			{props.children}
		</CalendarContext.Provider>
	);
}

export { CalendarContext, CalendarProvider };
