import React from 'react';
import Day from './day.jsx';

import './week.scss';

export default function Week({ week }) {
	return (
		<ul className='calendar-week clearfix'>
			{week.map((day, index) => <Day key={`${day.date}-${day.day || index}`} day={day} />)}
		</ul>
	);
}
