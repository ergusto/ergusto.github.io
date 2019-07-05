import React from 'react';

import './day.scss';

export default function Day({ day }) {
	let className = 'calendar-day border-radius-large';

	if(day.empty) {
		className = `${className} calendar-day--empty`;

		return <div className={className}></div>;
	}
	
	if(day.isToday) {
		className = `${className} calendar-day--is-today`;
	}

	className = `${className} calendar-day--date background-color-white`;

	return (
		<div className={className}>
			<p className='font-size-small font-weight-semi-bold'>{day.date}</p>	
		</div>
	);

}
