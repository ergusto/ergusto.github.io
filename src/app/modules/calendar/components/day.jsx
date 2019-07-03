import React, { useState, useContext } from 'react';

import './day.scss';

export default function Day({ day }) {

	let className = 'calendar-day';

	if(day.empty) {
		className = `${className} calendar-day--empty`;

		return <div className={className}></div>;
	}
	
	className = `${className} calendar-day--date`;

	return (
		<div className={className}>
			<p className='font-size-small font-weight-semi-bold'>{day.day} {day.date}</p>	
		</div>
	);

}
